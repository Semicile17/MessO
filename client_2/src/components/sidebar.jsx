import { useState } from "react";
import avatar from "../assets/icons/svg/people.png";
import edit from "../assets/icons/pencil.png";
import menuIcon from "../assets/icons/svg/menu.svg";
import close from "../assets/icons/svg/close.svg"; // Your menu icon here

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Menu Icon */}
      <div
        className={`${
          isOpen ? "hidden" : "block"
        } md:hidden fixed top-4 left-4 z-50`}
      >
        <button onClick={toggleSidebar}>
          <img src={menuIcon} alt="menu_icon" className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed md:translate-x-0 md:block flex-col top-0 p-8 space-y-10 text-white bg-[#095D7E] h-screen w-64 transition-transform duration-300 ease-in-out z-40`}
      >
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:hidden fixed top-4 right-5 z-50`}
        >
          <button onClick={toggleSidebar}>
            <img src={close} alt="close" className="h-4 w-4" />
          </button>
        </div>
        <h2 className="text-xl font-semibold text-center">Profile</h2>
        <ul className="space-y-4">
          <li className="text-lg w-full flex justify-center">
            <img
              src={avatar}
              alt="profile_avatar"
              className="h-24 w-24 p-2 border rounded-full"
            />
            <div className="z-10 h-full">
              <button>
                <img src={edit} alt="edit" className="h-4 w-4 p-rounded-full" />
              </button>
            </div>
          </li>
          <li className="text-lg text-center">
            <h1>Rohit Mahant</h1>
          </li>
          <li className="text-lg text-center">
            <h1>Id : 2300245</h1>
          </li>
          <li className="text-lg text-center">
            <h1>Branch : CSE</h1>
          </li>
          <li className="text-lg text-center">
            <h1>Hostel : Rudra</h1>
          </li>
          <li className="text-lg text-center">
            <h1>Room no : 312</h1>
          </li>
          <li className="text-sm text-center">
            <h1>rohitsinghmahant707@gmail.com</h1>
          </li>
        </ul>
        <div className="flex flex-col space-y-5">
          <button className="border py-1 rounded hover:bg-white hover:text-black">Settings</button>
          <button className="border py-1 rounded hover:bg-white hover:text-black">Logout</button>
        </div>
      </div>

      {/* Overlay for mobile view when the sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

    </>
  );
}
