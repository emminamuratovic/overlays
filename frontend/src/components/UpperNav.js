import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg'

const UpperNav = () => {
  return (
    <div className="w-full bg-gray-800 text-white px-4 py-2 flex items-center justify-between shadow-lg fixed top-0 left-0 z-20 h-16 flex-row-reverse md:flex-row">
      <Link to="/" className="text-2xl font-bold">
      <img src={Logo} alt="Logo" className="h-12 w-auto" />
      </Link>
    </div>
  );
};

export default UpperNav;