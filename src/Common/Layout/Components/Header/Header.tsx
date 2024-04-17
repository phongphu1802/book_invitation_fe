const Header = () => {
  return (
    <div className="grid justify-center w-full grid-cols-2 h-14">
      <div className="col-span-1"> </div>
      <div className="flex items-center justify-end col-span-1">
        <div className="w-10 h-10 col-span-1 bg-red-500 border-2 border-transparent rounded-full hover:border-white/50">
          {" "}
        </div>
      </div>
    </div>
  );
};

export default Header;
