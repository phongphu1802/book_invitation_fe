import { HTMLAttributes, ReactFragment, ReactNode } from "react";

import { DashboardTypeEnum } from "../../../App/Enums";

type ContainerAsType = "div" | "fragment" | "tr";

interface BaseContainerProps {
  as?: ContainerAsType;
  children: ReactNode;
}

export interface ContainerDivProps extends HTMLAttributes<HTMLDivElement> {
  as?: "div";
}
interface ContainerFragmentProps extends HTMLAttributes<ReactFragment> {
  as?: "fragment";
  children: ReactFragment;
}
export interface ContainerTrProps extends HTMLAttributes<HTMLTableRowElement> {
  as?: "tr";
}

export type ContainerProps = BaseContainerProps &
  (ContainerDivProps | ContainerFragmentProps | ContainerTrProps);

export interface ContainerChartProps {
  title?: ReactNode;
  children: ReactNode;
  classNameContainer?: string;
  classNameTitle?: string;
  valueRange?: string[];
  valueType?: DashboardTypeEnum;
  onChangeRange?: (selectedItems: string[]) => void;
  onChangeType?: (data: DashboardTypeEnum) => void;
}

export interface ChartContainerSelectTypeProps {
  valueType?: DashboardTypeEnum;
  onChangeType: (data: DashboardTypeEnum) => void;
}
