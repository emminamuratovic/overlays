import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-1/4 bg-gray-800 text-white p-6 flex flex-col justify-center rounded-lg shadow-lg">
      <ul className="space-y-4">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block p-3 rounded-md transition-all duration-300 ${isActive ? 'bg-gray-600 text-yellow-400' : 'hover:bg-gray-700'
              }`
            } 
          >
            Chat
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/puppets"
            className={({ isActive }) =>
              `block p-3 rounded-md transition-all duration-300 ${isActive ? 'bg-gray-600 text-yellow-400' : 'hover:bg-gray-700'
              }`
            } 
          >
            Puppets
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/overlays"
            className={({ isActive }) =>
              `block p-3 rounded-md transition-all duration-300 ${isActive ? 'bg-gray-600 text-yellow-400' : 'hover:bg-gray-700'
              }`
            }
          >
            Overlays
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/fx"
            className={({ isActive }) =>
              `block p-3 rounded-md transition-all duration-300 ${isActive ? 'bg-gray-600 text-yellow-400' : 'hover:bg-gray-700'
              }`
            } 
          >
            FX
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/themes"
            className={({ isActive }) =>
              `block p-3 rounded-md transition-all duration-300 ${isActive ? 'bg-gray-600 text-yellow-400' : 'hover:bg-gray-700'
              }`
            }
          >
            Themes
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;