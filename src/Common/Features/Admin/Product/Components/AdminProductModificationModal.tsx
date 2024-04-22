import { AxiosError } from "axios";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ProductDataType, ProductFormDataType } from "../../../../../App/Types/Common/productType";
import { Input, Modal, ModalProps, Select } from "../../../../Components";
import { CategoryDataType } from "../../../../../App/Types/Common/categoryType";
import useToast from "../../../../Hooks/useToast";
import UploadInput from "../../../../Components/Form/UploadInput/UploadInput";
import { getCaterories } from "../../../../../App/Services/App/categoryService";
import { setFormError } from "../../../../Utils/Helpers/errorHelper";

interface AdminProductModificationModalProps extends ModalProps {
  product: ProductDataType | null;
  onCreate: (product: ProductFormDataType) => Promise<void>;
  onCreated: () => void;
  onEdit: (id: number, product: ProductFormDataType) => Promise<void>;
  onEdited: () => void;
}

const DEFAULT_VALUE: ProductFormDataType = {
  category_uuid: null,
  name: "",
  price: "",
  description: "",
  image: "",
};

const AdminProductModificationModal = ({
  isOpen,
  product,
  onClose,
  onCreate,
  onCreated,
  onEdit,
  onEdited,
  ...props
}: AdminProductModificationModalProps) => {
  const { t } = useTranslation("admin");
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryData, setCategoryData] = useState<CategoryDataType[]>([]);

  const handleUnknownError = useCallback(() => {
    toast.error(t("unknown"));
  }, [t, toast]);

  const {
    control,
    reset,
    handleSubmit: useFormSubmit,
    ...methods
  } = useForm<ProductFormDataType>({
    // resolver: yupResolver(adminProductModificationFormSchema(t)),
    defaultValues: DEFAULT_VALUE,
  });

  const handleCreateProduct = useCallback(
    async (formData: ProductFormDataType) => {
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

  const handleEditProduct = useCallback(
    async (formData: ProductFormDataType) => {
      if (!product) return;
      try {
        await onEdit(product.uuid as number, formData);
        toast.success(t("editProductSuccessfully"));
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
    [handleUnknownError, methods.setError, onClose, onEdit, onEdited, t, toast, product],
  );

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    if (!product) {
      handleCreateProduct(formData);

      return;
    }

    handleEditProduct(formData);
  });

  const fetchData = useCallback(async () => {
    try {
      const { data } = await getCaterories();
      setCategoryData(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setIsSubmitting(false);

    if (product) {
      reset(product);
      return;
    }

    reset(DEFAULT_VALUE);
  }, [isOpen, reset, product]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const categoryOption = useMemo(
    () => categoryData.map((item) => ({ value: item.uuid, label: item.name })),
    [categoryData],
  );

  return (
    <Modal
      isLoading={isSubmitting}
      isOpen={isOpen}
      isFormModal
      title={product ? t("editProduct") : t("addProduct")}
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
      <Input
        className="block w-96"
        control={control}
        disabled={isSubmitting}
        label={t("price")}
        name="price"
        type="number"
      />
      <Select
        isDisabled={isLoading}
        placeholder={t("category")}
        name="category_uuid"
        className="w-96"
        control={control}
        options={categoryOption}
      />
      <UploadInput
        containerClassName="w-full"
        name="image"
        control={control}
        disabled={isSubmitting}
        multiple={false}
        label={t("image")}
        placeholder={t("chooseImage")}
      />
    </Modal>
  );
};

export default memo(AdminProductModificationModal);
