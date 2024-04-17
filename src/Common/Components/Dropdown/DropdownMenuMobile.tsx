import { Dialog, Transition } from "@headlessui/react";
import { debounce } from "lodash";
import { Fragment, MouseEvent, TouchEvent, cloneElement, memo, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { BaseDropdownMenuProps } from "./interface";

const DropdownMenuMobile = ({
  className,
  isHideOnClick,
  isShow = false,
  menu,
  onHide,
}: BaseDropdownMenuProps) => {
  const { t } = useTranslation();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const touchStartYRef = useRef(0);

  const handleHideDebounced = useCallback(() => debounce(onHide, 0)(), [onHide]);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (isHideOnClick !== false) {
        handleHideDebounced();
      }
    },
    [isHideOnClick, handleHideDebounced],
  );

  const handleTouchStart = useCallback((e: TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();

    touchStartYRef.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const dropdownElement = dropdownRef.current;

    if (!dropdownElement) return;

    const touchMoveY = e.touches[0].clientY;
    const moveDistance = touchMoveY - touchStartYRef.current;

    if (moveDistance < 0) return;

    dropdownElement.style.transform = `translateY(${moveDistance}px)`;
  }, []);

  // On touch end, if user scroll down, hide dropdown menu.
  const handleTouchEnd = useCallback(
    (e: TouchEvent<HTMLDivElement>) => {
      e.stopPropagation();

      const touchEndY = e.changedTouches[0].clientY;
      const moveDistance = touchEndY - touchStartYRef.current;

      if (moveDistance <= 12) return;

      onHide();
    },
    [onHide],
  );

  // useOnClickOutside(dropdownRef, onHide);

  return (
    <Transition show={isShow} as={Fragment}>
      <Dialog className="z-100 fixed" onClose={onHide}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
        </Transition.Child>
        <Transition.Child
          className={twMerge(
            "z-100 fixed inset-x-0 bottom-0 rounded-t-xl bg-gray-100 p-4 md:rounded-t-lg md:bg-white lg:rounded-b-lg",
            className,
          )}
          enter="ease-out duration-100"
          enterFrom="opacity-0 translate-y-full"
          enterTo="opacity-100 translate-y-0"
          leave="ease-in duration-100"
          leaveTo="opacity-0 translate-y-full"
          ref={dropdownRef}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Dialog.Panel>
            <div className="mt-2 flex flex-col items-center justify-center">
              <div className="h-1 w-10 rounded-full bg-gray-200" />
              <button className="h-3 opacity-0" type="button">
                {t("scrollDownToHide")}
              </button>
            </div>
            <div
              role="button"
              tabIndex={-1}
              className="no-click-flicking mt-1"
              ref={menuRef}
              onClick={handleClick}
            >
              {cloneElement(menu, { onHide: handleHideDebounced })}
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default memo(DropdownMenuMobile);
