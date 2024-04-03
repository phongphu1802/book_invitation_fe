import { memo, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import AlertIcon from "./AlertIcon";
import { AlertProps } from "./interface";
import { ComponentStatusType } from "../interface";

const Alert = ({ title, message, type = "normal", className, children }: AlertProps) => {
  const generalColors = useMemo<Partial<Record<ComponentStatusType, string>>>(
    () => ({
      normal: "bg-blue-50 text-blue-600",
      success: "bg-green-50 text-green-700",
      danger: "bg-red-50 text-red-600",
      warning: "bg-yellow-50 text-yellow-700",
    }),
    [],
  );

  return (
    <div className={twMerge("rounded-md px-5 pb-3 pt-4 font-semibold", generalColors[type], className)}>
      <div className="flex">
        <div className="flex-shrink-0 mt-1 mr-4 text-lg">
          <AlertIcon type={type} />
        </div>
        <div>
          <div className={twMerge("my-1", !message && "mb-2 font-normal")}>{title}</div>
          {Boolean(message) && (
            <div className={twMerge("mt-1.5 font-normal", !children && "mb-2")}>{message}</div>
          )}
          {children && <div className="mb-1.5 mt-3">{children}</div>}
        </div>
      </div>
    </div>
  );
};

export default memo(Alert);
