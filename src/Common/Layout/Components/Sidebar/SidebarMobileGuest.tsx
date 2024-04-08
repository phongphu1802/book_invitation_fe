import { memo } from "react";

import LayoutSidebar from "./Sidebar";

const SidebarMobileGuest = () => {
  return (
    <LayoutSidebar
      id="guestSidebar"
      className="w-full pt-0"
      containerClassName="w-screen"
      // sidebarLinkClassName="border-none mt-0"
    />
  );
};

export default memo(SidebarMobileGuest);
