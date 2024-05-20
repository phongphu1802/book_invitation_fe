import { HTMLAttributes, memo } from "react";
import { twMerge } from "tailwind-merge";

import { layoutSidebarIsCollapsedSelector } from "../../../App/Selectors/commonSelector";
import { useSelector } from "../../Hooks";

export interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  imageClassName?: string;
  id: string;
}

const Logo = ({ className, imageClassName, id: sidebarId }: LogoProps) => {
  const isCollapsed = useSelector(layoutSidebarIsCollapsedSelector(sidebarId));
  return (
    <div className={twMerge("flex items-center justify-center pt-4 ", className)}>
      <div className={twMerge("inline-flex text-3xl font-semibold  text-black")}>
        {isCollapsed ? (
          <div className={twMerge("h-full text-center w-7", imageClassName)}>
            <img className="w-full h-full" src={process.env.REACT_APP_LOGO_ICON} alt="logo 2" />
          </div>
        ) : (
          <div className={twMerge("w-40 h-full p-2 text-center", imageClassName)}>
            <img className="w-full h-full" src={process.env.REACT_APP_LOGO} alt="logo 1" />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Logo);
