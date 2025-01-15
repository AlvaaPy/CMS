import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { UserContext } from '../context/UserContext'; // Import UserContext

function UserNavbar() {
  const [userOpen, setUserOpen] = useState(false);
  const { pengguna } = useContext(UserContext); // Access regular user data

  const toggleUserDropdown = () => {
    setUserOpen(!userOpen);
  };

  return (
    <div className="bg-gray-800 text-white flex items-center justify-between p-4">
      <div className="text-xl font-bold">User Dashboard</div>
      <div className="relative">
        <div
          className="flex items-center cursor-pointer"
          onClick={toggleUserDropdown}
        >
          <FaUserCircle className="w-6 h-6" />
          <span className="ml-2">{pengguna ? pengguna.name : "Tamu"}</span> {/* Display regular user's name */}
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

export default UserNavbar;
