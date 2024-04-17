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
      <div className={twMerge("inline-flex text-3xl font-semibold  text-black", imageClassName)}>
        {isCollapsed ? (
          <div className="h-full text-center w-7">
            <img className="w-full h-full" src={process.env.REACT_APP_API_BASE_LOGO_2} alt="logo 2" />
          </div>
        ) : (
          <div className="w-40 h-full p-2 text-center">
            <img className="w-full h-full" src={process.env.REACT_APP_API_BASE_LOGO_1} alt="logo 1" />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Logo);
