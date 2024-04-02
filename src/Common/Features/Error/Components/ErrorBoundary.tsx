import { memo } from "react";
import { FallbackProps } from "react-error-boundary";

import ErrorUnknown from "./ErrorUnknown";

const ErrorBoundary = ({ error }: FallbackProps) => {
  return <ErrorUnknown error={error} />;
};

export default memo(ErrorBoundary);
