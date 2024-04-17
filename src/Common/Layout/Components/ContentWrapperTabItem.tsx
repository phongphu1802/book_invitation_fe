import { cloneElement, useCallback, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

import { ContentWrapperTabItemProps } from "../interface";

const ContentWrapperTabItem = ({
  activeClassName,
  className,
  id,
  isActive,
  style,
  title,
  onChange,
  onActive,
}: ContentWrapperTabItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback(() => {
    onChange(id);
  }, [id, onChange]);

  // Scroll to the center of the container when the tab is active.
  const scrollToCenter = useCallback(() => {
    if (!isActive || !ref.current) {
      return;
    }

    const element = ref.current;
    const containerElement = element.parentElement;

    if (!containerElement) {
      return;
    }

    const { width } = element.getBoundingClientRect();
    const { offsetLeft: left } = element;
    const { offsetLeft: containerLeft, offsetWidth: containerWidth } = containerElement;

    containerElement.scrollTo({
      left: left - containerLeft - (containerWidth - width) / 2,
      behavior: "smooth",
    });
  }, [isActive]);

  useEffect(() => {
    scrollToCenter();
  }, [scrollToCenter]);

  useEffect(() => {
    if (!isActive || !ref.current) {
      return;
    }

    onActive(ref.current);
  }, [isActive, onActive]);

  return (
    <div
      className={twMerge(
        "relative flex-shrink-0 cursor-pointer rounded-t-lg border-2 border-transparent border-b-gray-100 px-6 py-3 duration-100 hover:text-primary-700",
        isActive && "active border-gray-100 border-b-transparent bg-white text-primary-700",
        style === "line" && "rounded-none border-0 border-b-2 border-b-gray-100 px-3 py-3.5 first:ml-3",
        className,
        isActive && activeClassName,
      )}
      role="button"
      ref={ref}
      tabIndex={0}
      onClick={handleSelect}
    >
      {title && typeof title === "object" && "props" in title ? cloneElement(title, { isActive }) : title}
      {isActive && <span className="absolute inset-x-6 -bottom-0.5 border-t-2 border-transparent" />}
    </div>
  );
};

export default ContentWrapperTabItem;
