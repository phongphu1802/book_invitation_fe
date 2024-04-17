import { MutableRefObject, ReactElement } from "react";

import { ContainerProps } from "../Container";

export interface EndScrollDetectorProps extends Omit<ContainerProps, "children"> {
  children?: ReactElement | ReactElement[];
  contentContainerRef?: MutableRefObject<HTMLDivElement | HTMLTableRowElement | null>;
  isShown: boolean;
  isTriggerEarly?: boolean;
  onReach: VoidFunction;
}

export interface EndScrollDetectorRefType {
  calculatePosition: VoidFunction;
}
