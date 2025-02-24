import { memo } from "react";
import { useTranslation } from "react-i18next";
import { BiPlus } from "react-icons/bi";

import { Button } from "../../../../Components";

interface AdminRoleHeaderActionsProps {
  onClickAdd?: () => void;
}

const AdminRoleHeaderAction = ({ onClickAdd }: AdminRoleHeaderActionsProps) => {
  const { t } = useTranslation("admin");

  return (
    <Button className="rounded-md shadow-none" size="sm" onClick={onClickAdd}>
      <BiPlus size={24} className="mr-2" />
      {t("addRole")}
    </Button>
  );
};

export default memo(AdminRoleHeaderAction);
