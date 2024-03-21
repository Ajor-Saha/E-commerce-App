import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className="flex ml-2">
        {/* Hamburger Icon */}
        <button
          onClick={toggleMenu}
          className="text-gray-500 focus:outline-none focus:text-gray-900 lg:hidden"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
  
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-72 lg:w-80 bg-gray-100 transition-transform duration-300 transform lg:translate-x-0 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Sidebar Content */}
          <div className="p-4">
            <Link to="/admin" className="text-xl font-semibold text-gray-800">Sidebar</Link>
            <ul className="mt-4">
              <li className="mb-2">
                <Link
                  to="/admin/products"
                  className="block p-2 text-gray-700 rounded hover:bg-gray-200"
                >
                  Link 1
                </Link>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="block p-2 text-gray-700 rounded hover:bg-gray-200"
                >
                  Link 2
                </a>
              </li>
              {/* Add more links as needed */}
            </ul>
          </div>
        </div>
  
        {/* Overlay */}
        {isOpen && (
          <div
            onClick={toggleMenu}
            className="fixed inset-0 z-40 bg-black opacity-50 lg:hidden"
          ></div>
        )}
      </div>
    );
}

export default Sidebar;
