import { AxiosError } from "axios";
import { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Input, Modal, ModalProps, Select } from "../../../../Components";
import useToast from "../../../../Hooks/useToast";
import { setFormError } from "../../../../Utils/Helpers/errorHelper";
import { TeacherDataType, TeacherFormDataType } from "../../../../../App/Types/Common/teacherType";
import { SexTypeEnum } from "../../../../../App/Enums";

interface AdminTeacherModificationModalProps extends ModalProps {
  teacher: TeacherDataType | null;
  onCreate: (teacher: TeacherFormDataType) => Promise<void>;
  onCreated: () => void;
  onEdit: (id: number, teacher: TeacherFormDataType) => Promise<void>;
  onEdited: () => void;
}

const DEFAULT_VALUE: TeacherFormDataType = {
  name: "",
  birthday: "",
  proper: "",
  sex: SexTypeEnum.OTHER,
};

const AdminTeacherModificationModal = ({
  isOpen,
  teacher,
  onClose,
  onCreate,
  onCreated,
  onEdit,
  onEdited,
  ...props
}: AdminTeacherModificationModalProps) => {
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
  } = useForm<TeacherFormDataType>({
    // resolver: yupResolver(adminProductModificationFormSchema(t)),
    defaultValues: DEFAULT_VALUE,
  });

  const handleCreateTeacher = useCallback(
    async (formData: TeacherFormDataType) => {
      try {
        await onCreate(formData);
        toast.success(t("addProductSuccessfully"));
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

  const handleEditTeacher = useCallback(
    async (formData: TeacherFormDataType) => {
      if (!teacher) return;
      try {
        await onEdit(teacher.uuid as number, formData);
        toast.success(t("editTeacherSuccessfully"));
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
    [handleUnknownError, methods.setError, onClose, onEdit, onEdited, t, toast, teacher],
  );

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    if (!teacher) {
      handleCreateTeacher(formData);

      return;
    }

    handleEditTeacher(formData);
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setIsSubmitting(false);

    if (teacher) {
      reset(teacher);
      return;
    }

    reset(DEFAULT_VALUE);
  }, [isOpen, reset, teacher]);

  const sexOption = [
    { value: SexTypeEnum.MEN, label: SexTypeEnum.MEN },
    { value: SexTypeEnum.WOMEN, label: SexTypeEnum.WOMEN },
    { value: SexTypeEnum.OTHER, label: SexTypeEnum.OTHER },
  ];

  return (
    <Modal
      isLoading={isSubmitting}
      isOpen={isOpen}
      isFormModal
      title={teacher ? t("editTeacher") : t("addTeacher")}
      onClose={onClose}
      onConfirm={handleSubmit}
      {...props}
    >
      <Input className="block w-96" control={control} disabled={isSubmitting} label={t("name")} name="name" />
      <Input
        className="block w-96"
        control={control}
        disabled={isSubmitting}
        label={t("proper")}
        name="proper"
      />
      <Select
        name="sex"
        className="w-96"
        placeholder={t("sex")}
        control={control}
        isDisabled={isSubmitting}
        options={sexOption}
      />
      <Input
        className="block w-96"
        control={control}
        disabled={isSubmitting}
        label={t("birthday")}
        name="birthday"
        type="date"
      />
    </Modal>
  );
};

export default memo(AdminTeacherModificationModal);
