import logo from "../assets/logos/logo.png";
const TopBar = () => {
  return (
    <div className="w-full md:h-16 fixed top-0 flex bg-blue-800 items-center ">
      <img src={logo} alt="logo" className="h-12 p-1 ml-4"/>
      <h1 className="font-serif text-white md:text-3xl p-2 font-semibold text-center w-full ">MESS OFF PORTAL</h1>
    </div>
  );
};

export default TopBar;
