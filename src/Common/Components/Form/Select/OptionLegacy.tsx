import { HTMLAttributes, memo } from "react";
import { twMerge } from "tailwind-merge";

export interface OptionLegacyProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  value: string;
}

const OptionLegacy = ({ children, className, ...props }: OptionLegacyProps) => {
  return (
    <div
      className={twMerge(
        "min-w-full whitespace-nowrap px-4 py-1.5 duration-100 hover:bg-gray-100",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default memo(OptionLegacy);
