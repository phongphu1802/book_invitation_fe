import { ReactNode, memo } from "react";

interface TableContentBodyColumnContentProps {
  content: ReactNode;
  className?: string;
}

const TableContentBodyColumnContent = ({ content, className }: TableContentBodyColumnContentProps) => {
  return <div className={className}>{content}</div>;
};

export default memo(TableContentBodyColumnContent);
