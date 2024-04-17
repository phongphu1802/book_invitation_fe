import { memo } from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineCategory, MdOutlineLocalOffer, MdOutlineShoppingCart } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";

import LayoutSidebarItem from "../../Layout/Components/Sidebar/Item";
import { ADMIN_PATH } from "../../../App/Constants";
import { LayoutSidebar } from "../../Layout";

const AdminSidebar = () => {
  const { t } = useTranslation("admin");
  return (
    <LayoutSidebar id="adminSidebar">
      <LayoutSidebarItem
        id="dashboard"
        icon={<MdOutlineShoppingCart />}
        text={t("dashboard")}
        to={ADMIN_PATH.DASHBOARD}
      />
      <LayoutSidebarItem
        id="order"
        icon={<MdOutlineShoppingCart />}
        text={t("order")}
        to={ADMIN_PATH.ORDER}
      />
      <LayoutSidebarItem
        id="product"
        icon={<MdOutlineLocalOffer />}
        text={t("product")}
        to={ADMIN_PATH.PRODUCT}
      />
      <LayoutSidebarItem id="user" icon={<AiOutlineUser />} text={t("user")} to={ADMIN_PATH.USER} />
      <LayoutSidebarItem
        id="category"
        icon={<MdOutlineCategory />}
        text={t("category")}
        to={ADMIN_PATH.CATEGORY}
      />
    </LayoutSidebar>
  );
};
export default memo(AdminSidebar);
