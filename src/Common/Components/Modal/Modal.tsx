/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, ForwardedRef, forwardRef, memo, useCallback } from "react";
import { twMerge } from "tailwind-merge";

import { ModalProps } from "./interface";
import ModalContent from "./ModalContent";

const Modal = (
  {
    isOpen,
    isShowHeader = true,
    isShowFooter,
    isAllowSubmit,
    isFormModal,
    isLoading,
    title,
    children,
    className,
    childrenClassName,
    onClose,
    onConfirm,
  }: ModalProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const handleConfirm = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      onConfirm?.();
    },
    [onConfirm],
  );

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <Dialog
          as={motion.div}
          className="fixed inset-0 z-50 flex overflow-hidden"
          open={isOpen}
          ref={ref}
          static
          onClose={onClose}
        >
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-70 duration-75"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          />
          <Dialog.Panel
            animate={{ scale: 1, opacity: 1 }}
            as={motion.div}
            className="relative w-fit rounded-lg bg-white duration-75 sm:m-auto sm:w-auto sm:max-w-none"
            exit={{ scale: 0.9, opacity: 0 }}
            initial={{ scale: 0.9, opacity: 0 }}
          >
            <Dialog.Description
              as="form"
              className={twMerge(isShowHeader && "pt-4 sm:pt-7")}
              onSubmit={handleConfirm}
            >
              <ModalContent
                className={className}
                childrenClassName={childrenClassName}
                isShowHeader={isShowHeader}
                isShowFooter={isShowFooter}
                isFormModal={isFormModal}
                isAllowSubmit={isAllowSubmit}
                isLoading={isLoading}
                title={title}
                onClose={onClose}
              >
                {children}
              </ModalContent>
            </Dialog.Description>
          </Dialog.Panel>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default memo(forwardRef(Modal));
