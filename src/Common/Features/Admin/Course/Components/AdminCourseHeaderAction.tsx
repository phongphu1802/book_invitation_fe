import { memo } from "react";
import { useTranslation } from "react-i18next";
import { BiPlus } from "react-icons/bi";

import { Button } from "../../../../Components";

interface AdminCourseHeaderActionsProps {
  onClickAdd?: () => void;
}

const AdminCourseHeaderAction = ({ onClickAdd }: AdminCourseHeaderActionsProps) => {
  const { t } = useTranslation("admin");

  return (
    <Button className="rounded-md shadow-none" size="sm" onClick={onClickAdd}>
      <BiPlus size={24} className="mr-2" />
      {t("addProduct")}
    </Button>
  );
};

export default memo(AdminCourseHeaderAction);
