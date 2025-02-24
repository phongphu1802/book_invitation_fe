import { AxiosError } from "axios";
import { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Input, Modal, ModalProps } from "../../../../Components";
import useToast from "../../../../Hooks/useToast";
import { setFormError } from "../../../../Utils/Helpers/errorHelper";
import { RoomFormDataType, RoomDataType } from "../../../../../App/Types/Common/roomType";

interface AdminRoomModificationModalProps extends ModalProps {
  room: RoomDataType | null;
  onCreate: (product: RoomFormDataType) => Promise<void>;
  onCreated: () => void;
  onEdit: (id: number, product: RoomFormDataType) => Promise<void>;
  onEdited: () => void;
}

const DEFAULT_VALUE: RoomFormDataType = {
  name: "",
};

const AdminRoomModificationModal = ({
  isOpen,
  room,
  onClose,
  onCreate,
  onCreated,
  onEdit,
  onEdited,
  ...props
}: AdminRoomModificationModalProps) => {
  const { t } = useTranslation("admin");
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUnknownError = useCallback(() => {
    toast.error(t("unknown"));
  }, [t, toast]);

  const {
    control,
    reset,
    handleSubmit: useFormSubmit,
    ...methods
  } = useForm<RoomFormDataType>({
    // resolver: yupResolver(adminProductModificationFormSchema(t)),
    defaultValues: DEFAULT_VALUE,
  });

  const handleCreateRoom = useCallback(
    async (formData: RoomFormDataType) => {
      try {
        await onCreate(formData);
        toast.success(t("addRoomSuccessfully"));
        onCreated();
        onClose();
      } catch (error) {
        if (error instanceof AxiosError) {
          setFormError(error, methods.setError, null, handleUnknownError);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [handleUnknownError, methods.setError, onClose, onCreate, onCreated, t, toast],
  );

  const handleEditRoom = useCallback(
    async (formData: RoomFormDataType) => {
      if (!room) return;
      try {
        await onEdit(room?.uuid as number, formData);
        toast.success(t("editRoomSuccessfully"));
        onEdited();
        onClose();
      } catch (error) {
        if (error instanceof AxiosError) {
          setFormError(error, methods.setError, null, handleUnknownError);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [handleUnknownError, methods.setError, onClose, onEdit, onEdited, t, toast, room],
  );

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    if (!room) {
      handleCreateRoom(formData);

      return;
    }

    handleEditRoom(formData);
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setIsSubmitting(false);

    if (room) {
      reset(room);
      return;
    }

    reset(DEFAULT_VALUE);
  }, [isOpen, reset, room]);

  return (
    <Modal
      isLoading={isSubmitting}
      isOpen={isOpen}
      isFormModal
      title={room ? t("editRoom") : t("addRoom")}
      onClose={onClose}
      onConfirm={handleSubmit}
      {...props}
    >
      <Input className="block w-96" control={control} disabled={isSubmitting} label={t("name")} name="name" />
    </Modal>
  );
};

export default memo(AdminRoomModificationModal);
