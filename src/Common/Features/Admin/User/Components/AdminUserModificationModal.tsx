import { AxiosError } from "axios";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Input, Modal, ModalProps, Select } from "../../../../Components";
import { UserDataType, UserFormDataType, UserRoleDataType } from "../../../../../App/Types/Common";
import { setFormError } from "../../../../Utils/Helpers/errorHelper";
import useToast from "../../../../Hooks/useToast";
import UploadInput from "../../../../Components/Form/UploadInput/UploadInput";
import { getRoles } from "../../../../../App/Services/Common/roleService";

interface AdminUserModificationModalProps extends ModalProps {
  user: UserDataType | null;
  onCreate: (user: UserFormDataType) => Promise<void>;
  onCreated: () => void;
  onEdit: (id: number, user: UserFormDataType) => Promise<void>;
  onEdited: () => void;
}

const DEFAULT_VALUE: UserFormDataType = {
  email: "",
  name: "",
  password: "",
  username: "",
  role_uuid: null,
};

const AdminUserModificationModal = ({
  isOpen,
  user,
  onClose,
  onCreate,
  onCreated,
  onEdit,
  onEdited,
  ...props
}: AdminUserModificationModalProps) => {
  const { t } = useTranslation("admin");
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roles, setRoles] = useState<UserRoleDataType[]>([]);

  const handleUnknownError = useCallback(() => {
    toast.error(t("unknown"));
  }, [t, toast]);

  const {
    control,
    reset,
    handleSubmit: useFormSubmit,
    ...methods
  } = useForm<UserFormDataType>({
    // resolver: yupResolver(adminUserModificationFormSchema(t)),
    defaultValues: DEFAULT_VALUE,
  });

  const roleOption = useMemo(() => roles.map((item) => ({ value: item.uuid, label: item.name })), [roles]);

  const fetchDataRole = useCallback(async () => {
    try {
      const { data } = await getRoles();
      setRoles(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        setFormError(error, methods.setError, null, handleUnknownError);
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [handleUnknownError, methods.setError]);

  const handleCreateUser = useCallback(
    async (formData: UserFormDataType) => {
      try {
        await onCreate(formData);
        toast.success(t("addUserSuccessfully"));
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

  const handleEditUser = useCallback(
    async (formData: UserFormDataType) => {
      if (!user) return;
      try {
        await onEdit(user.uuid as number, formData);
        toast.success(t("editUserSuccessfully"));
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
    [handleUnknownError, methods.setError, onClose, onEdit, onEdited, t, toast, user],
  );

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    if (!user) {
      handleCreateUser(formData);

      return;
    }

    handleEditUser(formData);
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    fetchDataRole();
    setIsSubmitting(false);

    if (user) {
      reset(user);
      return;
    }

    reset(DEFAULT_VALUE);
  }, [fetchDataRole, isOpen, reset, user]);

  return (
    <Modal
      isLoading={isSubmitting}
      isOpen={isOpen}
      isFormModal
      title={user ? t("editUser") : t("addUser")}
      onClose={onClose}
      onConfirm={handleSubmit}
      {...props}
    >
      <Input
        className="block w-96"
        control={control}
        disabled={isSubmitting}
        label={t("username")}
        name="username"
      />
      <Input
        className="block w-96"
        control={control}
        disabled={isSubmitting}
        label={t("password")}
        name="password"
        type="password"
        autoSave="off"
      />
      <Input
        className="block w-96"
        control={control}
        disabled={isSubmitting}
        label={t("email")}
        name="email"
      />
      <Input className="block w-96" control={control} disabled={isSubmitting} label={t("name")} name="name" />

      <Select
        name="role_uuid"
        className="w-96"
        placeholder={t("role")}
        control={control}
        isDisabled={isSubmitting}
        options={roleOption}
      />

      <UploadInput
        containerClassName="w-full"
        name="avatar"
        control={control}
        disabled={isSubmitting}
        multiple={false}
        label={t("avatar")}
        placeholder={t("chooseAvatar")}
      />
    </Modal>
  );
};

export default memo(AdminUserModificationModal);
