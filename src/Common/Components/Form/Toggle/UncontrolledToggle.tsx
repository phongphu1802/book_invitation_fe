import { motion } from "framer-motion";
import { memo, useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

import { UncontrolledToggleProps } from "../interface";

const UncontrolledToggle = ({
  isOn = false,
  isSelfControlled = false,
  size = "normal",
  label,
  disabled = false,
  error,
  onChange,
}: UncontrolledToggleProps) => {
  const [value, setValue] = useState(false);

  const isOnToggle = useMemo(() => (isSelfControlled ? isOn : value), [isSelfControlled, isOn, value]);

  const handleChangeToggle = () => {
    if (disabled) {
      return;
    }
    setValue(!value);
    onChange?.(!value);
  };

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 70,
  };

  const divSizeClassName = {
    xs: "p-1 w-9",
    sm: "p-1 w-9",
    normal: "p-1 w-10",
    xl: "p-1 w-14",
  };

  const motionSizeClassName = {
    xs: "w-2.5 h-2.5",
    sm: "w-2.5 h-2.5",
    normal: "w-3 h-3",
    xl: "h-4 w-4",
  };

  useEffect(() => {
    if (isOn) setValue(isOn);
  }, [isOn]);

  return (
    <div>
      <div
        className="group flex items-center justify-start space-x-4"
        role="button"
        tabIndex={0}
        onClick={handleChangeToggle}
      >
        <div
          className={twMerge(
            "flex overflow-hidden rounded-full transition-colors",
            divSizeClassName[size],
            isOnToggle ? "justify-end" : "justify-start",
            isOnToggle ? "bg-primary-700 group-hover:bg-primary-800" : "bg-gray-100 group-hover:bg-gray-200",
            error && "ring-1 ring-red-500",
          )}
        >
          <motion.div
            className={twMerge("rounded-full bg-white", motionSizeClassName[size])}
            layout
            transition={spring}
          />
        </div>
        {label && <div>{label}</div>}
      </div>
      {error && <div className="mt-1 text-sm text-red-500">{error}</div>}
    </div>
  );
};

export default memo(UncontrolledToggle);
