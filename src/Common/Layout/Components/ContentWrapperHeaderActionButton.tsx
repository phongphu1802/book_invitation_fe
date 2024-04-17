import { ReactElement, memo } from "react";
import { MdAdd } from "react-icons/md";

import { Button, ButtonProps } from "../../Components";

interface LayoutContentWrapperHeaderActionButtonProps
  extends Omit<ButtonProps, "children" | "onClick" | "size" | "className"> {
  icon?: ReactElement;
  label: string;
  disabled?: boolean;
  onClick?: VoidFunction;
}

const LayoutContentWrapperHeaderActionButton = ({
  icon,
  label,
  disabled = false,
  onClick,
  ...props
}: LayoutContentWrapperHeaderActionButtonProps) => {
  return (
    <Button size="sm" className="flex px-6 space-x-3" disabled={disabled} onClick={onClick} {...props}>
      {icon ?? <MdAdd size={20} />}
      <span className="hidden md:block">{label}</span>
    </Button>
  );
};

export default memo(LayoutContentWrapperHeaderActionButton);
