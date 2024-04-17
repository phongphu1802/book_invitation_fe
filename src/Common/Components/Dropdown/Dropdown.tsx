import {
  cloneElement,
  memo,
  MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import DropdownMenu from "./DropdownMenu";
import DropdownMenuMobile from "./DropdownMenuMobile";
import { DropdownProps } from "./interface";
import { getTwScreenWidth } from "../../Utils/Helpers/commonHelper";

const Dropdown = ({
  children,
  isForceRender,
  isHideOnClick,
  isShowDropdownMenu: isShowDropdownMenuProps,
  isTransformOnMobile = true,
  isRenderOnParent = false,
  menu,
  menuClassName,
  mobileClassName,
  position,
  onToggle,
  calculatePosition,
}: DropdownProps) => {
  const parentRef = useRef<HTMLDivElement | null>(null);

  const [isShowDropdownMenu, setIsShowDropdownMenu] = useState(false);
  const isMobileDevice = useMemo(
    () => isTransformOnMobile && getTwScreenWidth("md") > window.document.documentElement.clientWidth,
    [isTransformOnMobile],
  );

  const handleOpenDropdownMenu = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsShowDropdownMenu((prev) => !prev);
  }, []);

  const handleCloseDropdownMenu = useCallback(() => {
    setIsShowDropdownMenu(false);
  }, []);

  const handleClickOutside = useCallback((e: MouseEvent | TouchEvent) => {
    const target = e.target as HTMLElement;
    const parentElement = parentRef.current;

    if (!parentElement || !parentElement.contains(target)) {
      setIsShowDropdownMenu(false);
    }
  }, []);

  useEffect(() => {
    onToggle?.(isShowDropdownMenu);
  }, [isShowDropdownMenu, onToggle]);

  return (
    <>
      {cloneElement(children, {
        ...children.props,
        onClick: handleOpenDropdownMenu,
        ref: parentRef,
      })}
      {!isMobileDevice && (isForceRender || isShowDropdownMenuProps || isShowDropdownMenu) && (
        <DropdownMenu
          className={menuClassName}
          isHideOnClick={isHideOnClick}
          isShow={isShowDropdownMenuProps ?? isShowDropdownMenu ?? false}
          isForceRender={isForceRender}
          isRenderOnParent={isRenderOnParent}
          menu={menu}
          position={position}
          parentRef={parentRef}
          onHide={handleCloseDropdownMenu}
          onClickOutside={handleClickOutside}
          calculatePosition={calculatePosition}
        />
      )}
      {isMobileDevice && (
        <DropdownMenuMobile
          className={mobileClassName}
          isHideOnClick={isHideOnClick}
          isShow={isShowDropdownMenuProps ?? isShowDropdownMenu}
          menu={menu}
          onHide={handleCloseDropdownMenu}
        />
      )}
    </>
  );
};

export default memo(Dropdown);
