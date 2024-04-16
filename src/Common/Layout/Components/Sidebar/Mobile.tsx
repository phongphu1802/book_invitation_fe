import { cloneElement, memo, ReactElement, useCallback, useRef, useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { twMerge } from "tailwind-merge";
import { useOnClickOutside } from "usehooks-ts";

interface LayoutSidebarMobileProps {
  sidebar: ReactElement;
}

const LayoutSidebarMobile = ({ sidebar }: LayoutSidebarMobileProps) => {
  const [isShowOverlay, setIsShowOverlay] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = useCallback(() => {
    setIsShowOverlay((prev) => !prev);
  }, []);

  const handleClickOutside = useCallback(() => {
    setIsShowOverlay(false);
  }, []);

  useOnClickOutside(containerRef, handleClickOutside);

  return (
    <div className="relative mr-3.5 block md:hidden" ref={containerRef}>
      <button
        type="button"
        className={twMerge(
          "flex h-10 w-10 items-center justify-center rounded-lg border-2 border-gray-100",
          isShowOverlay && "border-primary-700 text-primary-700",
        )}
        onClick={handleToggle}
      >
        {!isShowOverlay && <HiMenuAlt1 size={24} />}
        {isShowOverlay && <IoMdClose size={24} />}
      </button>
      <div
        className={twMerge(
          "fixed inset-x-0 left-0 top-20 z-50 h-fit-layout -translate-x-full transform bg-black bg-opacity-50 duration-100",
          isShowOverlay && "translate-x-0",
        )}
        role="button"
        tabIndex={0}
        onClick={handleClickOutside}
      >
        {cloneElement(sidebar, {
          className: "relative pt-0 md:pt-20",
          containerClassName: "w-screen",
        })}
      </div>
    </div>
  );
};

export default memo(LayoutSidebarMobile);
