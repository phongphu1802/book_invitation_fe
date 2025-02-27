import { AxiosError } from "axios";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Input, Modal, ModalProps, Select } from "../../../../Components";
import useToast from "../../../../Hooks/useToast";
import { setFormError } from "../../../../Utils/Helpers/errorHelper";
import { StudentDataType, StudentFormDataType } from "../../../../../App/Types/Common/studentType";
import { CourseDataType } from "../../../../../App/Types/Common/courseType";
import { getCourses } from "../../../../../App/Services/App/courseService";
import { SexTypeEnum } from "../../../../../App/Enums";

interface AdminStudentModificationModalProps extends ModalProps {
  student: StudentDataType | null;
  onCreate: (student: StudentFormDataType) => Promise<void>;
  onCreated: () => void;
  onEdit: (id: number, student: StudentFormDataType) => Promise<void>;
  onEdited: () => void;
}

const DEFAULT_VALUE: StudentFormDataType = {
  name: "",
  status: null,
  course_uuid: null,
  sex: null,
};

const AdminStudentModificationModal = ({
  isOpen,
  student,
  onClose,
  onCreate,
  onCreated,
  onEdit,
  onEdited,
  ...props
}: AdminStudentModificationModalProps) => {
  const { t } = useTranslation("admin");
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [courseData, setCourseData] = useState<CourseDataType[]>([]);

  const handleUnknownError = useCallback(() => {
    toast.error(t("unknown"));
  }, [t, toast]);

  const {
    control,
    reset,
    handleSubmit: useFormSubmit,
    ...methods
  } = useForm<StudentFormDataType>({
    // resolver: yupResolver(adminProductModificationFormSchema(t)),
    defaultValues: DEFAULT_VALUE,
  });

  const handleCreateStudent = useCallback(
    async (formData: StudentFormDataType) => {
      try {
        await onCreate(formData);
        toast.success(t("addStudentSuccessfully"));
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

  const handleEditStudent = useCallback(
    async (formData: StudentFormDataType) => {
      if (!student) return;
      try {
        await onEdit(student.uuid as number, formData);
        toast.success(t("editStudentSuccessfully"));
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
    [handleUnknownError, methods.setError, onClose, onEdit, onEdited, t, toast, student],
  );

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    if (!student) {
      handleCreateStudent(formData);

      return;
    }

    handleEditStudent(formData);
  });

  const fetchData = useCallback(async () => {
    try {
      const { data } = await getCourses();
      setCourseData(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setIsSubmitting(false);

    if (student) {
      reset(student);
      return;
    }

    reset(DEFAULT_VALUE);
  }, [isOpen, reset, student]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const courseOption = useMemo(
    () => courseData.map((item) => ({ value: item.uuid, label: item.name })),
    [courseData],
  );

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
      title={student ? t("editStudent") : t("addStudent")}
      onClose={onClose}
      onConfirm={handleSubmit}
      {...props}
    >
      <Input className="block w-96" control={control} disabled={isSubmitting} label={t("name")} name="name" />
      <Select
        name="sex"
        className="w-96"
        placeholder={t("sex")}
        control={control}
        isDisabled={isSubmitting}
        options={sexOption}
      />
      <Select
        isDisabled={isLoading}
        placeholder={t("course")}
        name="course_uuid"
        className="w-96"
        control={control}
        options={courseOption}
      />
    </Modal>
  );
};

export default memo(AdminStudentModificationModal);
