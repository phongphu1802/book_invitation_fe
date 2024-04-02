import { ReactNode, useEffect } from "react";

import useSelector from "./useSelector";
import { appNameConfigSelector } from "../../App/Selectors/commonSelector";

const useDocumentTitle = (title: ReactNode, isScrollToTop = true) => {
  const appName = useSelector(appNameConfigSelector);

  useEffect(() => {
    if (typeof title !== "string" || !isScrollToTop) {
      return;
    }

    window.document.title = `${title} | ${appName}`;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [appName, title, isScrollToTop]);
};

export default useDocumentTitle;
