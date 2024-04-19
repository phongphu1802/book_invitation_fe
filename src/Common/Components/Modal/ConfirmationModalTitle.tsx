import { memo, useMemo } from "react";

import { ConfirmationModalTitleProps } from "./interface";

const ConfirmationModalTitle = ({ title, status }: ConfirmationModalTitleProps) => {
  const transformedTitle = useMemo(() => {
    if (status === "normal") {
      return title.replace("<span>", '<span class="font-semibold ml-0.5 text-blue-500">');
    }
    if (status === "success") {
      return title.replace("<span>", '<span class="font-semibold ml-0.5 text-green-500">');
    }
    if (status === "warning") {
      return title.replace("<span>", '<span class="font-semibold ml-0.5 text-orange-500">');
    }
    return title.replace("<span>", '<span class="font-semibold ml-0.5 text-red-500">');
  }, [title, status]);

  return (
    <h3
      className="mt-2 text-lg font-semibold leading-6 text-gray-900"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: transformedTitle }}
    />
  );
};

export default memo(ConfirmationModalTitle);
