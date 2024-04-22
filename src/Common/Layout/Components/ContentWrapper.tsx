import { Children, memo, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import { LayoutContentWrapperProps } from "../interface";
import LayoutContentWrapperHeader from "./ContentWrapperHeader";
import { useDocumentTitle, useSelector } from "../../Hooks";
import LayoutContentWrapperBody from "./ContentWarpperBody";
import LayoutContentWrapperTab from "./ContentWrapperTab";
import { layoutSidebarIsCollapsedSelector } from "../../../App/Selectors/commonSelector";
import Header from "./Header/Header";

const LayoutContentWrapper = ({
  action,
  activatedTab,
  activeTabItemClassName,
  className,
  bodyClassName,
  children,
  isBlank,
  isBorder,
  isShowHeader = true,
  tabClassName,
  tabItemClassName,
  tabHeader,
  tabs,
  tabStyle,
  title,
  tabAction,
  onChangeTab,
  id: sidebarId,
}: LayoutContentWrapperProps) => {
  const activatedTabIndex = useMemo(
    () => tabs?.findIndex((tab) => tab.id === activatedTab) ?? 0,
    [tabs, activatedTab],
  );

  const childTabElement = useMemo(
    () => Children.toArray(children)[activatedTabIndex] ?? null,
    [children, activatedTabIndex],
  );

  const isCollapsed = useSelector(layoutSidebarIsCollapsedSelector(sidebarId));

  useDocumentTitle(title, isShowHeader);

  return (
    <div
      className={twMerge(
        "px-4 pb-4 w-full h-screen",
        isCollapsed ? "ml-14 w-min-layout" : "ml-72 w-max-layout",
        className,
      )}
    >
      <Header />
      <div className={twMerge("mb-4 w-full h-fit-layout bg-white/80 rounded-xl", className)}>
        {(title || action) && isShowHeader && <LayoutContentWrapperHeader title={title} action={action} />}
        <div className="relative">
          {tabs && (
            <LayoutContentWrapperTab
              activatedTab={activatedTab}
              activeTabItemClassName={activeTabItemClassName}
              className={tabClassName}
              itemClassName={tabItemClassName}
              tabStyle={tabStyle}
              tabs={tabs}
              onChange={onChangeTab}
            />
          )}
          {tabAction}
        </div>
        <LayoutContentWrapperBody
          className={bodyClassName}
          isBlank={isBlank}
          isBorder={isBorder}
          isTab={Boolean(tabs?.length)}
        >
          <div>
            {tabHeader}
            {!tabs?.length || !childTabElement ? children : childTabElement}
          </div>
        </LayoutContentWrapperBody>
      </div>
    </div>
  );
};

export default memo(LayoutContentWrapper);
