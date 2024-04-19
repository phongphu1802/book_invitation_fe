import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiHelpCircle, FiLogOut, FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";

import { authService } from "../../../../App/Services";
import { useSelector } from "../../../Hooks";

interface HeaderUserDropdownItemProps {
  onClick?: () => void;
}

const HeaderUserDropdownItem = ({ onClick }: HeaderUserDropdownItemProps) => {
  const { t } = useTranslation("auth");

  const user = useSelector((state) => state.common.user);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClickLogout = useCallback(() => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    authService
      .logOut()
      .then(() => {
        return authService.removeAuthToken();
      })
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        setIsSubmitting(false);
      });
  }, [isSubmitting]);

  return (
    <>
      <div className="flex w-full cursor-pointer group" role="button" tabIndex={0} onClick={onClick}>
        <div className="w-full h-full pb-4 mb-3 text-sm border-b-2 border-gray-100">
          <Link to="profile" className="font-semibold group-hover:text-primary-500">
            {user?.name}
          </Link>
          <Link to="profile" className="mt-1 text-sm break-all line-clamp-1 group-hover:text-primary-500">
            {user?.email}
          </Link>
        </div>
      </div>
      <div
        className="flex items-center w-full mt-1 hover:text-primary-600"
        role="button"
        tabIndex={0}
        onClick={onClick}
      >
        <FiSettings />
        <p className="ml-3 text-sm">
          <Link to="/admin/dashboard">{t("dashboard")}</Link>
        </p>
      </div>
      <div
        className="flex items-center w-full mt-2 hover:text-primary-600"
        role="button"
        tabIndex={0}
        onClick={onClick}
      >
        <FiHelpCircle />
        <Link to="help">
          <p className="ml-3 text-sm">{t("helpAndContact")}</p>
        </Link>
      </div>
      <div
        className="flex items-center w-full pt-3 mt-4 border-t-2 border-gray-100 hover:text-primary-600"
        role="button"
        tabIndex={0}
        onClick={handleClickLogout}
      >
        {isSubmitting ? (
          <div className="w-4 h-4 border rounded-full animate-spin border-slate-700 border-t-transparent" />
        ) : (
          <FiLogOut />
        )}
        <div className="ml-3 text-sm">{t("logOut")}</div>
      </div>
    </>
  );
};
export default memo(HeaderUserDropdownItem);
