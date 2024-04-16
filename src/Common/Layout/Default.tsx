import { ReactNode, memo } from "react";

// import LayoutFooter from "./Components/Footer/Footer";
// import LayoutHeader from "./Components/Header/Header";

interface DefaultLayoutProps {
  children: ReactNode | ReactNode[];
  // headerPrefix?: ReactNode;
}

const LayoutDefault = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      {/* <LayoutHeader /> */}
      {children}
      {/* <LayoutFooter /> */}
    </>
  );
};

export default memo(LayoutDefault);
