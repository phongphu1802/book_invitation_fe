import { debounce } from "lodash";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { LayoutContentWrapperTabProps } from "../interface";
import ContentWrapperTabItem from "./ContentWrapperTabItem";

const LayoutContentWrapperTab = ({
  activeBarClassName,
  activatedTab,
  activeTabItemClassName,
  className,
  itemClassName,
  tabs,
  tabStyle,
  onChange,
}: LayoutContentWrapperTabProps) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [mouseStartX, setMouseStartX] = useState(0);
  const [scrollStartX, setScrollStartX] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const activeBarRef = useRef<HTMLSpanElement>(null);
  const scrollMaskRef = useRef<HTMLDivElement>(null);

  const handleActiveTab = useCallback(
    (tabElement: HTMLDivElement) => {
      const activeBarElement = activeBarRef.current;

      if (!tabElement || !activeBarElement) {
        return;
      }

      const { width } = tabElement.getBoundingClientRect();
      const { offsetLeft } = tabElement;

      if (tabStyle === "line") {
        activeBarElement.style.width = `${width - 24}px`;
        activeBarElement.style.left = `${offsetLeft + 12}px`;
      } else {
        activeBarElement.style.width = `${width - 52}px`;
        activeBarElement.style.left = `${offsetLeft + 26}px`;
      }
    },
    [tabStyle],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleActiveTabDebounced = useCallback(debounce(handleActiveTab, 50), [handleActiveTab]);

  const handleOverflowX = useCallback(() => {
    const containerElement = containerRef.current;

    if (!containerElement) {
      return;
    }

    const isOverflowX = containerElement.scrollWidth > containerElement.clientWidth;

    if (isOverflowX) {
      containerElement.classList.remove("justify-center");
      containerElement.classList.add("justify-start");
    }
  }, []);

  // Horizontal click and drag scrolling.
  const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!containerRef.current) {
      return;
    }

    const { scrollLeft, offsetLeft } = containerRef.current;
    const { width } = containerRef.current.getBoundingClientRect();

    setIsMouseDown(true);
    setMouseStartX(event.pageX);
    setScrollStartX(scrollLeft + offsetLeft);

    scrollMaskRef.current?.style.setProperty("width", `${width}px`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsMouseDown(false);
    setIsScrolling(false);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false);
    setIsScrolling(false);
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!isMouseDown || !containerRef.current) {
        return;
      }

      setIsScrolling(true);

      const { pageX } = event;
      const { offsetLeft } = containerRef.current;

      containerRef.current.scrollLeft = scrollStartX - (pageX - mouseStartX) + offsetLeft;
    },
    [isMouseDown, mouseStartX, scrollStartX],
  );

  useEffect(() => {
    handleOverflowX();
  }, [handleOverflowX, tabs]);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={twMerge(
        "relative left-0 z-10 -mb-0.5 flex select-none items-center rounded-t-lg bg-gray-100",
        tabStyle === "line" && "-mb-0.5 bg-transparent",
        className,
      )}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {tabs.map((tab) => (
        <ContentWrapperTabItem
          activeClassName={activeTabItemClassName}
          className={itemClassName}
          id={tab.id}
          isActive={activatedTab === tab.id}
          key={tab.id}
          style={tabStyle}
          title={tab.title}
          onChange={onChange}
          onActive={handleActiveTabDebounced}
        />
      ))}
      <span
        className={twMerge(
          "absolute bottom-px left-6 border-t-2 border-transparent duration-100 lg:border-primary-700",
          activeBarClassName,
        )}
        ref={activeBarRef}
      />
      <div
        className={twMerge("absolute inset-y-0 z-10 cursor-grab bg-transparent", !isScrolling && "hidden")}
        ref={scrollMaskRef}
      />
    </div>
  );
};

export default memo(LayoutContentWrapperTab);
