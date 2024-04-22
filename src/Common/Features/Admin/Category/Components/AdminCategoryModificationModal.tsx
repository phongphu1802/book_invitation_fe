import { AxiosError } from "axios";
import { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CategoryDataType, CategoryFormDataType } from "../../../../../App/Types/Common/categoryType";
import useToast from "../../../../Hooks/useToast";
import { setFormError } from "../../../../Utils/Helpers/errorHelper";
import { Input, Modal, ModalProps } from "../../../../Components";

interface AdminCategoryModificationModalProps extends ModalProps {
  category: CategoryDataType | null;
  onCreate: (category: CategoryFormDataType) => Promise<void>;
  onCreated: () => void;
  onEdit: (id: number, category: CategoryFormDataType) => Promise<void>;
  onEdited: () => void;
}

const DEFAULT_VALUE: CategoryFormDataType = {
  name: "",
  description: "",
};

const AdminCategoryModificationModal = ({
  isOpen,
  category,
  onClose,
  onCreate,
  onCreated,
  onEdit,
  onEdited,
  ...props
}: AdminCategoryModificationModalProps) => {
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
  } = useForm<CategoryFormDataType>({
    // resolver: yupResolver(adminUserModificationFormSchema(t)),
    defaultValues: DEFAULT_VALUE,
  });

  const handleCreateCategory = useCallback(
    async (formData: CategoryFormDataType) => {
      try {
        await onCreate(formData);
        toast.success(t("addCategorySuccessfully"));
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

  const handleEditCategory = useCallback(
    async (formData: CategoryFormDataType) => {
      if (!category) return;
      try {
        await onEdit(category.uuid as number, formData);
        toast.success(t("editCategorySuccessfully"));
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
    [handleUnknownError, methods.setError, onClose, onEdit, onEdited, t, toast, category],
  );

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    if (!category) {
      handleCreateCategory(formData);

      return;
    }

    handleEditCategory(formData);
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setIsSubmitting(false);

    if (category) {
      reset(category);
      return;
    }

    reset(DEFAULT_VALUE);
  }, [isOpen, reset, category]);

  return (
    <Modal
      isLoading={isSubmitting}
      isOpen={isOpen}
      isFormModal
      title={category ? t("editCategory") : t("addCategory")}
      onClose={onClose}
      onConfirm={handleSubmit}
      {...props}
    >
      <Input className="block w-96" control={control} disabled={isSubmitting} label={t("name")} name="name" />
      <Input
        className="block w-96"
        control={control}
        disabled={isSubmitting}
        label={t("description")}
        name="description"
      />
    </Modal>
  );
};

export default memo(AdminCategoryModificationModal);
