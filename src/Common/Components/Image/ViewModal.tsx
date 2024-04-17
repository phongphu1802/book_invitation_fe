import { Dialog, Transition } from "@headlessui/react";
import { Fragment, memo } from "react";
import { IoIosClose } from "react-icons/io";

import ImageViewModalContent, { ImageViewModalContentProps } from "./ViewModalContent";

interface ImageViewModalProps extends ImageViewModalContentProps {
  isShow: boolean;
  onClose: VoidFunction;
}

const ImageViewModal = ({ children, isShow, imageRect, imageNativeSize, onClose }: ImageViewModalProps) => {
  return (
    <Transition show={isShow} as={Fragment}>
      <Dialog open={isShow} className="fixed z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/90" aria-hidden="true" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0" role="none" tabIndex={-1} onClick={onClose}>
            {isShow && imageRect && (
              <ImageViewModalContent imageRect={imageRect} imageNativeSize={imageNativeSize}>
                {children}
              </ImageViewModalContent>
            )}
            <div className="absolute inset-x-0 bottom-0 flex h-20 items-center justify-center px-6 lg:top-0 lg:justify-end">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-400 text-gray-400 outline-none"
                onClick={onClose}
              >
                <IoIosClose size={24} />
              </button>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default memo(ImageViewModal);
