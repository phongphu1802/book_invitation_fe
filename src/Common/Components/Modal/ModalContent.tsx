import { memo } from "react";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

import { Button } from "../Button";

export interface ModalContentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  isShowHeader?: boolean;
  isShowFooter?: boolean;
  isAllowSubmit?: boolean;
  isLoading?: boolean;
  title?: string | JSX.Element;
  isFormModal?: boolean;
  childrenClassName?: string;
  onClose: VoidFunction;
}

const ModalContent = ({
  isShowHeader = true,
  isShowFooter = true,
  isAllowSubmit = true,
  isLoading = false,
  isFormModal = false,
  childrenClassName,
  className,
  title,
  children,
  onClose,
}: ModalContentProps) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={twMerge("px-10", !isFormModal && "px-0", className)}>
        {isShowHeader && (
          <div>
            <div className="flex items-center justify-between">
              <div className="pb-2 text-lg font-semibold h-fit w-fit">{title}</div>
              <div
                className="flex items-center justify-center p-1 duration-75 border-2 border-gray-100 rounded-full bg-gray-50 hover:cursor-pointer hover:border-gray-200 hover:bg-gray-100"
                role="button"
                tabIndex={0}
                onClick={onClose}
              >
                <IoClose size={16} />
              </div>
            </div>
            <div className="w-16 h-1 mt-2 bg-gray-100 rounded-md" />
          </div>
        )}
        <div className={twMerge("pb-8 pt-8 w-96 flex gap-6 flex-wrap", childrenClassName)}>{children}</div>
      </div>
      {isShowFooter && (
        <div className="flex items-center justify-end px-10 py-6 space-x-6 rounded-b-lg bg-gray-50">
          <Button
            className="px-6 border-2 border-gray-200 rounded-md shadow-none ring-0"
            color="light"
            disabled={isLoading}
            type="button"
            onClick={onClose}
          >
            {t("close")}
          </Button>
          <Button
            type="submit"
            className="flex-1 px-12 border-2 rounded-md shadow-none border-primary-700 ring-0 disabled:border-gray-300"
            disabled={isLoading || !isAllowSubmit}
            isLoading={isLoading}
          >
            {t("confirm")}
          </Button>
        </div>
      )}
    </>
  );
};

export default memo(ModalContent);
