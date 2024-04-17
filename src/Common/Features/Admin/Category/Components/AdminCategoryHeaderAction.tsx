import { memo } from "react";
import { useTranslation } from "react-i18next";
import { BiPlus } from "react-icons/bi";

import { Button } from "../../../../Components";

interface AdminCategoryHeaderActionsProps {
  onClickAdd?: () => void;
}

const AdminCategoryHeaderAction = ({ onClickAdd }: AdminCategoryHeaderActionsProps) => {
  const { t } = useTranslation("admin");

  return (
    <Button className="rounded-md shadow-none" size="sm" onClick={onClickAdd}>
      <BiPlus size={24} className="mr-2" />
      {t("addCategory")}
    </Button>
  );
};

export default memo(AdminCategoryHeaderAction);
