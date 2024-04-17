import { ForwardedRef, MouseEvent, forwardRef, memo, useCallback, useMemo } from "react";
import { Tooltip } from "react-tooltip";
import { twMerge } from "tailwind-merge";

import { TableRowActionProps } from "../interface";
import { checkEmptyObject } from "../../../Utils/Helpers/commonHelper";

const TableRowAction = <T extends unknown>(
  { data, isDisabled, children, status = "normal", title, onClick }: TableRowActionProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const tooltipId = useMemo(() => `table-row-action-tooltip-${Math.random()}`, []);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement> & T) => {
      if (!data && !isDisabled && onClick) {
        onClick(e);
        return;
      }

      if (isDisabled || !data || !onClick || checkEmptyObject(data)) {
        return;
      }

      onClick(data);
    },
    [data, isDisabled, onClick],
  );

  return (
    <div
      className={twMerge(
        "flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 duration-100 hover:bg-gray-200",
        status === "danger" && "bg-red-50 text-red-500 hover:bg-red-100",
        status === "success" && "bg-green-50 text-green-500 hover:bg-green-100",
        isDisabled && "cursor-not-allowed text-gray-400 opacity-50 hover:bg-gray-100",
        isDisabled && status === "danger" && "text-red-300 hover:bg-red-50",
        isDisabled && status === "success" && "text-green-300 hover:bg-green-50",
      )}
      data-tooltip-id={tooltipId}
      role="button"
      ref={ref}
      tabIndex={0}
      onClick={handleClick}
    >
      {children}
      {title && <Tooltip id={tooltipId} content={title} place="top" positionStrategy="absolute" />}
    </div>
  );
};

export default memo(forwardRef(TableRowAction)) as typeof TableRowAction;
