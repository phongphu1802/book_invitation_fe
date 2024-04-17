import { ReactElement, ReactNode, memo, useCallback } from "react";
import { twMerge } from "tailwind-merge";

interface DropdownItemProps {
  className?: string;
  icon?: ReactElement;
  text: ReactNode;
}

interface DropdownItemWithoutValueProps {
  value?: never;
  onClickWithValue?: never;
  onClick: () => void;
}

interface DropdownItemWithValueProps {
  value: unknown;
  onClickWithValue: (value: never) => void;
  onClick?: never;
}

const DropdownItem = ({
  className,
  icon,
  text,
  value,
  onClick,
  onClickWithValue,
}: DropdownItemProps & (DropdownItemWithoutValueProps | DropdownItemWithValueProps)) => {
  const handleClick = useCallback(() => {
    if (onClickWithValue && value) {
      onClickWithValue(value as never);
      return;
    }

    onClick?.();
  }, [onClick, onClickWithValue, value]);

  return (
    <div
      className={twMerge(
        "no-click-flicking mb-2 flex items-center justify-start space-x-3 rounded-lg bg-white px-4 py-3 duration-100 last:mb-0 hover:bg-gray-200 md:mb-0 md:rounded-none md:py-2 md:hover:bg-gray-100",
        className,
        "text-base font-semibold lg:font-normal",
      )}
      role="button"
      tabIndex={0}
      onClick={handleClick}
    >
      {icon && <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center">{icon}</div>}
      <div>{text}</div>
    </div>
  );
};

export default memo(DropdownItem);
