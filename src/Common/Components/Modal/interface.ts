import { HTMLAttributes } from "react";

import { ComponentStatusType } from "../interface";

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  isOpen: boolean;
  isShowHeader?: boolean;
  isShowFooter?: boolean;
  isAllowSubmit?: boolean;
  isFormModal?: boolean;
  isLoading?: boolean;
  contentContainerClassName?: string;
  childrenClassName?: string;
  title?: string | JSX.Element;
  onClose: VoidFunction;
  onConfirm?: VoidFunction;
}

export interface ConfirmationModalTitleProps {
  title: string;
  status?: ComponentStatusType;
}

export interface ConfirmationModalProps extends Omit<ModalProps, "title">, ConfirmationModalTitleProps {
  message: string | JSX.Element;
  status?: ComponentStatusType;
  cancelButtonText?: string;
  confirmButtonText?: string;
  warningMessage?: string;
  isSubmitting?: boolean;
  isShowCancelButton?: boolean;
  isShowConfirmButton?: boolean;
  onConfirm?: () => Promise<void> | void | Promise<unknown>;
}
