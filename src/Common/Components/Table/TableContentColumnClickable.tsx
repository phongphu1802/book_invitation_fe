import { ReactNode, memo, useCallback } from "react";
import { twMerge } from "tailwind-merge";

interface TableContentColumnClickableProps {
  children: ReactNode;
  isClickable?: boolean;
  onClick?: () => void;
}

const TableContentColumnClickable = ({
  children,
  isClickable,
  onClick,
}: TableContentColumnClickableProps) => {
  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  return (
    <div
      className={twMerge(
        "flex cursor-default items-center space-x-3",
        isClickable && "cursor-pointer font-semibold text-primary-700",
      )}
      role="button"
      tabIndex={-1}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default memo(TableContentColumnClickable);
