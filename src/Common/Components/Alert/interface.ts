import { HTMLAttributes, ReactNode } from "react";

import { ComponentStatusType } from "../interface";

export interface AlertProps extends Pick<HTMLAttributes<HTMLDivElement>, "className"> {
  type?: ComponentStatusType;
  title: string;
  message?: string;
  children?: ReactNode;
}
