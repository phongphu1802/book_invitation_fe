import { DefaultTFuncReturn } from "i18next";
import { memo } from "react";

export interface LayoutContentWrapperHeaderProps {
  title?: JSX.Element | DefaultTFuncReturn;
  action?: JSX.Element;
}

const LayoutContentWrapperHeader = ({ title, action }: LayoutContentWrapperHeaderProps) => {
  return (
    <div className="flex min-h-[88px] items-center justify-between py-6">
      <div className="flex-1 text-lg font-semibold">{title}</div>
      {action && <div className="flex justify-end">{action}</div>}
    </div>
  );
};

export default memo(LayoutContentWrapperHeader);
