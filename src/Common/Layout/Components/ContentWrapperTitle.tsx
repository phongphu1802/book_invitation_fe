import { memo } from "react";
import { BsArrowLeft } from "react-icons/bs";

import { LoadingSkeleton } from "../../Components";

interface LayoutContentWrapperTitleProps {
  title?: string;
  subtitle?: string;
  onClickBack?: () => void;
}

const LayoutContentWrapperTitle = ({ title, subtitle, onClickBack }: LayoutContentWrapperTitleProps) => {
  return (
    <div className="group">
      {subtitle && (
        <div
          className="flex items-center mt-1 -ml-1 space-x-1 duration-100 cursor-pointer group-hover:text-primary-700 hover:underline hover:underline-offset-4"
          role="button"
          tabIndex={0}
          onClick={onClickBack}
        >
          <div className="flex items-center justify-center w-6 h-6 duration-100 rounded-full">
            <BsArrowLeft size={14} />
          </div>
          <span className="text-sm font-normal">{subtitle}</span>
        </div>
      )}
      {title && <div className="mt-0.5">{title}</div>}
      {!title && <LoadingSkeleton className="mb-1 mt-2.5 h-4 w-48 rounded" />}
    </div>
  );
};

export default memo(LayoutContentWrapperTitle);
