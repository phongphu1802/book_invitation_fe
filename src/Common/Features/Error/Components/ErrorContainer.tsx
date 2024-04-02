import { HTMLAttributes, ReactNode, memo } from "react";
import { twMerge } from "tailwind-merge";

interface ErrorContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  childrenClassName?: string;
}

const ErrorContainer = ({ children, className, childrenClassName, ...props }: ErrorContainerProps) => {
  return (
    <div className={twMerge("flex h-fit-layout w-full items-center justify-center", className)} {...props}>
      <div className={twMerge("flex items-center justify-center", childrenClassName)}>{children}</div>
    </div>
  );
};

export default memo(ErrorContainer);
