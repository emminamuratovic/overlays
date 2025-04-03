import React from 'react';
import { Link } from 'react-router-dom';

const UpperNav = () => {
  return (
    <div className="w-full bg-gray-800 text-white p-4 flex items-center justify-between shadow-lg fixed top-0 left-0 z-10">
      {/* Logo Section */}
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-2xl font-bold">
          MyLogo
        </Link>
      </div>

      {/* Navigation Items
      <div className="hidden md:flex space-x-6">
        <Link to="/puppets" className="hover:text-yellow-400">Puppets</Link>
        <Link to="/overlays" className="hover:text-yellow-400">Overlays</Link>
        <Link to="/fx" className="hover:text-yellow-400">FX</Link>
        <Link to="/themes" className="hover:text-yellow-400">Themes</Link>
      </div> */}

      {/* Login Section */}
      <div className="flex items-center space-x-4">
        {/* <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white">
          Login
        </button> */}
      </div>
    </div>
  );
};

export default UpperNav;