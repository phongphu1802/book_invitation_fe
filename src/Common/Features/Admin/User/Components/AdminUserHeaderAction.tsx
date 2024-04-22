import { memo } from "react";
import { useTranslation } from "react-i18next";
import { BiUserPlus } from "react-icons/bi";

import { Button } from "../../../../Components";

interface AdminUserHeaderActionsProps {
  onClickAdd?: () => void;
}

const AdminUserHeaderAction = ({ onClickAdd }: AdminUserHeaderActionsProps) => {
  const { t } = useTranslation();

  return (
    <Button className="rounded-md shadow-none" size="sm" onClick={onClickAdd}>
      <BiUserPlus size={24} className="mr-2" />
      {t("addUser")}
    </Button>
  );
};

export default memo(AdminUserHeaderAction);
