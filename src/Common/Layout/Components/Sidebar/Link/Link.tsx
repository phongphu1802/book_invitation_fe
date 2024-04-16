import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import FooterLinkItem from "../../Footer/LinkItem";
import LinkGroup from "./LinkGroup";
import { SidebarLinkGroupEnum } from "./constant";
import { HOME_PATH } from "../../../../../App/Constants";

interface SidebarLinkProps {
  className?: string;
}

const SidebarLink = ({ className }: SidebarLinkProps) => {
  const { t } = useTranslation();
  const [selectedGroupId, setSelectedGroupId] = useState(SidebarLinkGroupEnum.COMPANY);

  const handlePreventEvent = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  const handleSelectGroup = useCallback((id: SidebarLinkGroupEnum) => setSelectedGroupId(id), []);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handlePreventEvent}
      className={twMerge("mt-4 h-fit w-full border-t px-7 pt-4 xs:block md:hidden", className)}
    >
      <LinkGroup
        name={t("company")}
        selectedGroupId={selectedGroupId}
        id={SidebarLinkGroupEnum.COMPANY}
        onClickShowChildren={handleSelectGroup}
      >
        <FooterLinkItem
          to={HOME_PATH.COMPANY}
          className="mb-0.5 rounded-md p-2 hover:bg-gray-200 hover:text-primary-600"
        >
          {t("aboutUs")}
        </FooterLinkItem>
        <FooterLinkItem
          to={HOME_PATH.BLOGS}
          className="mb-0.5 rounded-md p-2 hover:bg-gray-200 hover:text-primary-600"
        >
          {t("blog")}
        </FooterLinkItem>
        <FooterLinkItem
          to={HOME_PATH.PARTNERS}
          className="mb-0.5 rounded-md p-2 hover:bg-gray-200 hover:text-primary-600"
        >
          {t("partner")}
        </FooterLinkItem>
        <FooterLinkItem
          to={HOME_PATH.CONTACT}
          className="mb-0.5 rounded-md p-2 hover:bg-gray-200 hover:text-primary-600"
        >
          {t("contact")}
        </FooterLinkItem>
      </LinkGroup>
      <LinkGroup
        name={t("support")}
        selectedGroupId={selectedGroupId}
        id={SidebarLinkGroupEnum.SUPPORT}
        onClickShowChildren={handleSelectGroup}
      >
        <FooterLinkItem
          to={HOME_PATH.GETTING_STARTED}
          className="mb-0.5 rounded-md p-2 hover:bg-gray-200 hover:text-primary-600"
        >
          {t("started")}
        </FooterLinkItem>
        <FooterLinkItem
          to={HOME_PATH.DOCUMENTATION}
          className="mb-0.5 rounded-md p-2 hover:bg-gray-200 hover:text-primary-600"
        >
          {t("documentation", { ns: "company" })}
        </FooterLinkItem>
        <FooterLinkItem
          to={HOME_PATH.GUIDE}
          className="mb-0.5 rounded-md p-2 hover:bg-gray-200 hover:text-primary-600"
        >
          {t("guide")}
        </FooterLinkItem>
        <FooterLinkItem
          to={HOME_PATH.FAQ}
          className="mb-0.5 rounded-md p-2 hover:bg-gray-200 hover:text-primary-600"
        >
          {t("faq")}
        </FooterLinkItem>
      </LinkGroup>
      <LinkGroup
        name={t("trustAndLegal")}
        selectedGroupId={selectedGroupId}
        id={SidebarLinkGroupEnum.TRUST_AND_LEGAL}
        onClickShowChildren={handleSelectGroup}
      >
        <FooterLinkItem
          to={HOME_PATH.TERM}
          className="mb-0.5 rounded-md p-2 hover:bg-gray-200 hover:text-primary-600"
        >
          {t("termAndCondition", { ns: "company" })}
        </FooterLinkItem>
        <FooterLinkItem
          to={HOME_PATH.NOTICE}
          className="mb-0.5 rounded-md p-2 hover:bg-gray-200 hover:text-primary-600"
        >
          {t("notice")}
        </FooterLinkItem>
        <FooterLinkItem
          to={HOME_PATH.CLAIM}
          className="mb-0.5 rounded-md p-2 hover:bg-gray-200 hover:text-primary-600"
        >
          {t("claim")}
        </FooterLinkItem>
      </LinkGroup>
    </div>
  );
};
export default memo(SidebarLink);
