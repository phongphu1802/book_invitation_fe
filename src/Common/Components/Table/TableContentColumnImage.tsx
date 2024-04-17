import { memo } from "react";

import { Avatar } from "../Avatar";
import TableContentColumnClickable from "./TableContentColumnClickable";

interface TableContentColumnImageProps {
  title: string;
  src?: string;
  isClickable?: boolean;
  onClick?: () => void;
}

const TableContentColumnImage = ({ isClickable, title, src, onClick }: TableContentColumnImageProps) => {
  if (!title) return <div>-</div>;

  return (
    <TableContentColumnClickable isClickable={isClickable} onClick={onClick}>
      <Avatar src={src} alt={title} className="w-8 h-8 text-xs" />
      <span>{title}</span>
    </TableContentColumnClickable>
  );
};

export default memo(TableContentColumnImage);
