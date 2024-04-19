import { memo } from "react";

import HeaderUserDropdownItem from "./HeaderUserDropdownItem";
import { useSelector } from "../../../Hooks";
import { Avatar, Dropdown } from "../../../Components";

const HeaderUserDropdown = () => {
  const user = useSelector((state) => state.common.user);

  return (
    <div className="w-10 h-10 rounded-full shadow-md">
      <Dropdown menu={<HeaderUserDropdownItem />}>
        <Avatar alt={user?.email} className="w-10 h-10" />
      </Dropdown>
    </div>
  );
};
export default memo(HeaderUserDropdown);
