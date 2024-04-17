import { memo } from "react";
import { twMerge } from "tailwind-merge";

import { LoadingSkeleton } from "../Loading";
import { Avatar } from "../Avatar";
import { TableImageColumnTypeEnum } from "../../../App/Enums";

interface TableImageColumnProps {
  alt?: string;
  skeleton?: boolean;
  src?: string | null;
  className?: string;
  type: TableImageColumnTypeEnum;
}

const TableImageColumn = ({ alt, skeleton = false, src, type, className }: TableImageColumnProps) => {
  return (
    <div className={twMerge("h-12 w-12 rounded-full bg-gray-100", className)}>
      {skeleton && <LoadingSkeleton className={twMerge("h-full w-full rounded-full", className)} />}
      {!skeleton && type === TableImageColumnTypeEnum.ROUNDED && (
        <Avatar src={src || ""} alt={alt} className="w-full h-full" />
      )}
      {!skeleton && type === TableImageColumnTypeEnum.BOX && (
        <img src={src || ""} alt={alt} className="w-full h-full rounded-md" />
      )}
    </div>
  );
};

export default memo(TableImageColumn);
