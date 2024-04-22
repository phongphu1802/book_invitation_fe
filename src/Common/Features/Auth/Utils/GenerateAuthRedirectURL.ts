import { ADMIN_PATH, MY_PATH, SYSTEM_PATH } from "../../../../App/Constants";
import { UserRoleEnum } from "../../../../App/Enums";

const generateAuthRedirectURL = (roles: UserRoleEnum, forceRedirectURL?: string | null) => {
  if (forceRedirectURL) {
    return forceRedirectURL;
  }

  if (roles.includes(UserRoleEnum.SYSTEM)) {
    return SYSTEM_PATH.HOME;
  }

  if (roles.includes(UserRoleEnum.ADMIN)) {
    return ADMIN_PATH.HOME;
  }

  return MY_PATH.HOME;
};

export { generateAuthRedirectURL };
