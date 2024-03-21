import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import { RiSearchLine } from "react-icons/ri";
import AdminCard from "../../components/card/adminCard";

const Admin = () => {
  return (
    <div className="flex">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Middle Content */}
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="mb-4 mt-2">
          <div className="relative">
            {/* Search icon */}
            <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500" />

            {/* Search input */}
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 w-72 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Your middle content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-end lg:ml-56">
          <AdminCard />
          <AdminCard />
          <AdminCard />
        </div>
      </div>

      
    </div>
  );
};

export default Admin;
