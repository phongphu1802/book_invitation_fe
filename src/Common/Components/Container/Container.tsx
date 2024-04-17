import { ForwardedRef, MutableRefObject, forwardRef, memo } from "react";

import { ContainerDivProps, ContainerProps, ContainerTrProps } from "./interface";

const Container = ({ as, children, ...props }: ContainerProps, ref: ForwardedRef<unknown>) => {
  if (as === "div") {
    return (
      <div ref={ref as MutableRefObject<HTMLDivElement>} {...(props as ContainerDivProps)}>
        {children}
      </div>
    );
  }

  if (as === "tr") {
    return (
      <tr ref={ref as MutableRefObject<HTMLTableRowElement>} {...(props as ContainerTrProps)}>
        {children}
      </tr>
    );
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default memo(forwardRef(Container));
