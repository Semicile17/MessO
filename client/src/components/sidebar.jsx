import React, { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='mt-20'>
      {/* Menu Icon for Mobile View */}
      <div className="md:hidden p-4 mt-16">
        <button onClick={toggleSidebar}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed mt-16 inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out bg-blue-500 md:w-64 w-64 h-full z-50 flex flex-col`}
      >
        <div className="p-4">
          <h2 className="text-white text-2xl font-bold">Sidebar</h2>
        </div>
        <ul className="flex flex-col p-4 space-y-2">
          <li className="text-white">Dashboard</li>
          <li className="text-white">Profile</li>
          <li className="text-white">Settings</li>
          <li className="text-white">Logout</li>
        </ul>
      </div>

      {/* Overlay for Mobile View */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
