import { twMerge } from "tailwind-merge";

import { LayoutContentWrapperBodyProps } from "../interface";

const LayoutContentWrapperBody = ({
  isBlank,
  isTab = false,
  isBorder = true,
  children,
  className,
}: LayoutContentWrapperBodyProps) => {
  return (
    <div
      className={twMerge(
        !isBlank && "rounded-lg border-2 border-gray-100 p-6 shadow shadow-gray-50",
        !className && "border-0 p-0 shadow-none lg:border-2 lg:p-6 lg:shadow",
        isBlank && isBorder && "border-t-2 border-gray-100",
        isTab && "rounded-t-none",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default LayoutContentWrapperBody;
