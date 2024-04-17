import { HTMLAttributes, ReactFragment, ReactNode } from "react";

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
