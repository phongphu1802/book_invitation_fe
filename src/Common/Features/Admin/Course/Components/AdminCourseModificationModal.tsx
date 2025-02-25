import { AxiosError } from "axios";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Input, Modal, ModalProps, Select } from "../../../../Components";
import useToast from "../../../../Hooks/useToast";
import { setFormError } from "../../../../Utils/Helpers/errorHelper";
import { CourseDataType, CourseFormDataType } from "../../../../../App/Types/Common/courseType";
import { TeacherDataType } from "../../../../../App/Types/Common/teacherType";
import { getTeachers } from "../../../../../App/Services/App/teacherService";

interface AdminCourseModificationModalProps extends ModalProps {
  course: CourseDataType | null;
  onCreate: (course: CourseFormDataType) => Promise<void>;
  onCreated: () => void;
  onEdit: (id: number, course: CourseFormDataType) => Promise<void>;
  onEdited: () => void;
}

const DEFAULT_VALUE: CourseFormDataType = {
  name: "",
  teacher_uuid: null,
};

const AdminCourseModificationModal = ({
  isOpen,
  course,
  onClose,
  onCreate,
  onCreated,
  onEdit,
  onEdited,
  ...props
}: AdminCourseModificationModalProps) => {
  const { t } = useTranslation("admin");
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [teacherData, setTeacherData] = useState<TeacherDataType[]>([]);

  const handleUnknownError = useCallback(() => {
    toast.error(t("unknown"));
  }, [t, toast]);

  const {
    control,
    reset,
    handleSubmit: useFormSubmit,
    ...methods
  } = useForm<CourseFormDataType>({
    // resolver: yupResolver(AdminCourseModificationFormSchema(t)),
    defaultValues: DEFAULT_VALUE,
  });

  const handleCreateCourse = useCallback(
    async (formData: CourseFormDataType) => {
      try {
        await onCreate(formData);
        toast.success(t("addCourseSuccessfully"));
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

  const handleEditCourse = useCallback(
    async (formData: CourseFormDataType) => {
      if (!course) return;
      try {
        await onEdit(course.uuid as number, formData);
        toast.success(t("editCourseSuccessfully"));
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
    [handleUnknownError, methods.setError, onClose, onEdit, onEdited, t, toast, course],
  );

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    if (!course) {
      handleCreateCourse(formData);

      return;
    }

    handleEditCourse(formData);
  });

  const fetchData = useCallback(async () => {
    try {
      const { data } = await getTeachers();
      setTeacherData(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setIsSubmitting(false);

    if (course) {
      reset(course);
      return;
    }

    reset(DEFAULT_VALUE);
  }, [isOpen, reset, course]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const teacherOption = useMemo(
    () => teacherData.map((item) => ({ value: item.uuid, label: item.name })),
    [teacherData],
  );

  return (
    <Modal
      isLoading={isSubmitting}
      isOpen={isOpen}
      isFormModal
      title={course ? t("editCourse") : t("addCourse")}
      onClose={onClose}
      onConfirm={handleSubmit}
      {...props}
    >
      <Input className="block w-96" control={control} disabled={isSubmitting} label={t("name")} name="name" />
      <Select
        isDisabled={isLoading}
        placeholder={t("teacher")}
        name="category_uuid"
        className="w-96"
        control={control}
        options={teacherOption}
      />
    </Modal>
  );
};

export default memo(AdminCourseModificationModal);
