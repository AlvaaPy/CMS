import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { UserContext } from '../../context/UserContext'; // Impor UserContext

function Header() {
  const [topicsOpen, setTopicsOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const { user } = useContext(UserContext); // Akses data pengguna

  const toggleTopicsDropdown = () => {
    setTopicsOpen(!topicsOpen);
  };

  const toggleUserDropdown = () => {
    setUserOpen(!userOpen);
  };

  return (
    <div className="bg-gray-800 text-white flex items-center justify-between p-4">
      <div className="text-xl font-bold">CMS-ADMIN</div>
      <div className="relative">
        <div
          className="flex items-center cursor-pointer"
          onClick={toggleTopicsDropdown}
        >
          <span className="text-lg">Topik Pelatihan</span>
          <span className="ml-2">
            {topicsOpen ? (
              <MdArrowDropUp className="w-6 h-6" />
            ) : (
              <MdOutlineArrowDropDown className="w-6 h-6" />
            )}
          </span>
        </div>
        {topicsOpen && (
          <div className="absolute bg-gray-700 mt-2 rounded-md shadow-lg">
            <Link to="/marketing" className="block px-4 py-2 hover:bg-gray-600">
              Marketing
            </Link>
            <Link to="/it" className="block px-4 py-2 hover:bg-gray-600">
              IT
            </Link>
            <Link to="/human-capital" className="block px-4 py-2 hover:bg-gray-600">
              Human Capital
            </Link>
            <Link to="/product" className="block px-4 py-2 hover:bg-gray-600">
              Product
            </Link>
            <Link to="/redaksi" className="block px-4 py-2 hover:bg-gray-600">
              Redaksi
            </Link>
          </div>
        )}
      </div>
      <div className="relative">
        <div
          className="flex items-center cursor-pointer"
          onClick={toggleUserDropdown}
        >
          <FaUserCircle className="w-6 h-6" />
          <span className="ml-2">{user ? user.name : "Tamu"}</span> {/* Tampilkan nama admin */}
          <span className="ml-2">
            {userOpen ? (
              <MdArrowDropUp className="w-6 h-6" />
            ) : (
              <MdOutlineArrowDropDown className="w-6 h-6" />
            )}
          </span>
        </div>
        {userOpen && (
          <div className="absolute bg-gray-700 mt-2 right-0 rounded-md shadow-lg">
            <Link to="/" className="block px-4 py-2 hover:bg-gray-600">
              Keluar
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
