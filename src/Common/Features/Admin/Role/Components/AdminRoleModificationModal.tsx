import { AxiosError } from "axios";
import { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Input, Modal, ModalProps } from "../../../../Components";
import useToast from "../../../../Hooks/useToast";
import { setFormError } from "../../../../Utils/Helpers/errorHelper";
import { UserRoleDataType, UserRoleFormDataType } from "../../../../../App/Types/Common";

interface AdminRoleModificationModalProps extends ModalProps {
  userRole: UserRoleDataType | null;
  onCreate: (role: UserRoleFormDataType) => Promise<void>;
  onCreated: () => void;
  onEdit: (id: number, role: UserRoleFormDataType) => Promise<void>;
  onEdited: () => void;
}

const DEFAULT_VALUE: UserRoleFormDataType = {
  name: null,
};

const AdminRoleModificationModal = ({
  isOpen,
  userRole,
  onClose,
  onCreate,
  onCreated,
  onEdit,
  onEdited,
  ...props
}: AdminRoleModificationModalProps) => {
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
  } = useForm<UserRoleFormDataType>({
    // resolver: yupResolver(adminProductModificationFormSchema(t)),
    defaultValues: DEFAULT_VALUE,
  });

  const handleCreateRole = useCallback(
    async (formData: UserRoleFormDataType) => {
      try {
        await onCreate(formData);
        toast.success(t("addRoleSuccessfully"));
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

  const handleEditRole = useCallback(
    async (formData: UserRoleFormDataType) => {
      if (!userRole) return;
      try {
        await onEdit(userRole.uuid as number, formData);
        toast.success(t("editRoleSuccessfully"));
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
    [handleUnknownError, methods.setError, onClose, onEdit, onEdited, t, toast, userRole],
  );

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    if (!userRole) {
      handleCreateRole(formData);

      return;
    }

    handleEditRole(formData);
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setIsSubmitting(false);

    if (userRole) {
      reset(userRole);
      return;
    }

    reset(DEFAULT_VALUE);
  }, [isOpen, reset, userRole]);

  return (
    <Modal
      isLoading={isSubmitting}
      isOpen={isOpen}
      isFormModal
      title={userRole ? t("editRole") : t("addRole")}
      onClose={onClose}
      onConfirm={handleSubmit}
      {...props}
    >
      <Input className="block w-96" control={control} disabled={isSubmitting} label={t("name")} name="name" />
    </Modal>
  );
};

export default memo(AdminRoleModificationModal);
