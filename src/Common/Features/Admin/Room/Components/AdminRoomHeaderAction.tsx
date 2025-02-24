import { memo } from "react";
import { useTranslation } from "react-i18next";
import { BiPlus } from "react-icons/bi";

import { Button } from "../../../../Components";

interface AdminRoomHeaderActionsProps {
  onClickAdd?: () => void;
}

const AdminRoomHeaderAction = ({ onClickAdd }: AdminRoomHeaderActionsProps) => {
  const { t } = useTranslation("admin");

  return (
    <Button className="rounded-md shadow-none" size="sm" onClick={onClickAdd}>
      <BiPlus size={24} className="mr-2" />
      {t("addRoom")}
    </Button>
  );
};

export default memo(AdminRoomHeaderAction);
