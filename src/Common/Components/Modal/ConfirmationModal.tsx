import { AxiosError } from "axios";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiAlertTriangle } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

import Button from "../Button/Button";
import ConfirmationModalTitle from "./ConfirmationModalTitle";
import ConfirmationModalWarning from "./ConfirmationModalWarning";
import Modal from "./Modal";
import { ConfirmationModalProps } from "./interface";

const ConfirmationModal = ({
  isOpen,
  status = "success",
  title,
  message,
  warningMessage,
  cancelButtonText,
  confirmButtonText,
  isSubmitting: isSubmittingProp,
  isShowCancelButton = true,
  isShowConfirmButton = true,
  onConfirm,
  onClose,
  ...props
}: ConfirmationModalProps) => {
  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmError, setConfirmError] = useState<string | null>(null);

  const className = useMemo(() => {
    if (status === "success") {
      return "bg-green-100";
    }
    if (status === "danger") {
      return "bg-red-100";
    }
    if (status === "warning") {
      return "bg-orange-100";
    }
    return "bg-blue-100";
  }, [status]);

  const iconClassName = useMemo(() => {
    if (status === "success") {
      return "text-green-500";
    }
    if (status === "danger") {
      return "text-red-500";
    }
    if (status === "warning") {
      return "text-orange-500";
    }
    return "text-blue-500";
  }, [status]);

  const handleClickConfirmButton = useCallback(async () => {
    setIsSubmitting(true);
    setConfirmError(null);

    try {
      await onConfirm?.();
      onClose();
    } catch (error) {
      if (error instanceof AxiosError) {
        setConfirmError(error.response?.data?.error || error.response?.data?.message || error.message);
        return;
      }
      if (error instanceof Error) {
        setConfirmError(error.message);
      }
    } finally {
      if (!isSubmittingProp) {
        setIsSubmitting(false);
      }
    }
  }, [isSubmittingProp, onConfirm, onClose]);

  const handleClickCancelButton = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isSubmittingProp) {
      return;
    }
    if (isOpen) {
      setIsSubmitting(false);
    }
  }, [isOpen, isSubmittingProp]);

  return (
    <Modal
      isOpen={isOpen}
      isShowHeader={false}
      isShowFooter={false}
      childrenClassName="w-128"
      onClose={onClose}
      {...props}
    >
      <div className=" -my-0 pl-8 pr-2 sm:flex sm:items-start">
        <div
          className={twMerge(
            className,
            "mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10",
          )}
        >
          <FiAlertTriangle size={18} className={iconClassName} />
        </div>
        <div className="text-center sm:mx-6 sm:mt-0 sm:text-left">
          <ConfirmationModalTitle title={title} status={status} />
          <div className="mt-6">
            <div className="text-sm text-gray-500">{message}</div>
          </div>
          {(warningMessage || confirmError) && (
            <ConfirmationModalWarning
              message={confirmError || warningMessage}
              status={!confirmError ? "warning" : "danger"}
            />
          )}
        </div>
      </div>
      <div className="-mb-8  w-full mt-9 flex items-center justify-end space-x-4 rounded-b-lg bg-gray-50 px-8 py-6">
        {isShowCancelButton && (
          <Button
            type="button"
            color="light"
            className="rounded-md border-2 border-gray-200 shadow-none ring-0"
            onClick={handleClickCancelButton}
            disabled={isSubmitting}
          >
            {cancelButtonText ?? t("cancel")}
          </Button>
        )}
        {isShowConfirmButton && (
          <Button
            type="button"
            className="rounded-md border-2 border-primary-700 px-12 shadow-none ring-0 disabled:border-gray-300"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            onClick={handleClickConfirmButton}
          >
            {confirmButtonText ?? t("confirm")}
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default memo(ConfirmationModal);
