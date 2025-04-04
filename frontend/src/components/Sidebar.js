import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; 

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Chat", path: "/" },
    { name: "Puppets", path: "/puppets" },
    { name: "Overlays", path: "/overlays" },
    { name: "FX", path: "/fx" },
    { name: "Themes", path: "/themes" }
  ];

  return (
    <>
      {/* Hamburger for mobile */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar for mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-6 z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="space-y-4 mt-12">
          {menuItems.map(({ name, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block p-3 rounded-md transition-all duration-300 ${
                    isActive ? "bg-gray-600 text-yellow-400" : "hover:bg-gray-700"
                  }`
                }
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-1/4 bg-gray-800 text-white p-6 flex-col sticky top-16 h-[calc(100vh-4rem)]">
        <ul className="space-y-4">
          {menuItems.map(({ name, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `block p-3 rounded-md transition-all duration-300 ${
                    isActive ? "bg-gray-600 text-yellow-400" : "hover:bg-gray-700"
                  }`
                }
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;