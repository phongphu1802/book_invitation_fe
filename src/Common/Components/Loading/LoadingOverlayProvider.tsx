import { memo } from "react";
import { twMerge } from "tailwind-merge";

import LoadingSpinnerSVG from "./LoadingSpinnerSVG";
import { ConfigKeyEnum } from "../../../App/Enums";
import { useConfig, useSelector } from "../../Hooks";

const LoadingOverlayProvider = () => {
  const ids = useSelector((state) => state.common.loadingOverlayIds);

  const config = useConfig();
  const logoSrc = config(ConfigKeyEnum.LOGO);
  const loadingText = config(ConfigKeyEnum.APP_DESCRIPTION);

  return (
    <div
      className={twMerge(
        "fixed inset-0 z-50 flex items-center justify-center bg-white",
        !ids?.length && "hidden",
      )}
    >
      <div className="relative flex flex-col items-center justify-center w-screen">
        <div
          className={twMerge(
            "flex w-4/5 -translate-y-16 flex-col items-center justify-center opacity-0 duration-200",
            (logoSrc || loadingText) && "-translate-y-6 opacity-100",
          )}
        >
          <div className="text-6xl font-semibold text-black w-fit h-fit">DEMARIAGE</div>
          <div className="text-center">{loadingText}</div>
        </div>
        <div
          className={twMerge(
            "-translate-y-12 duration-100",
            (logoSrc || loadingText) && "translate-y-2 opacity-100",
          )}
        >
          <LoadingSpinnerSVG />
        </div>
      </div>
    </div>
  );
};

export default memo(LoadingOverlayProvider);
