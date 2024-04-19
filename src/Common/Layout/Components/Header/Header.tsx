import HeaderUserDropdown from "./HeaderUserDropdown";

const Header = () => {
  return (
    <div className="grid justify-center w-full grid-cols-2 h-14">
      <div className="col-span-1"> </div>
      <div className="flex items-center justify-end col-span-1">
        <div className="w-10 h-10 border-transparent rounded-full col-span-1border-2 hover:border-white/50">
          <HeaderUserDropdown />
        </div>
      </div>
    </div>
  );
};

export default Header;
