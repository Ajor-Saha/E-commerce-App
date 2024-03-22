import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/user/userSlice";
import MainLayout from "../components/utils/MainLayout";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/admin/DashSidebar";
import DashProfile from "../components/admin/DashProfile";
import DashProducts from "../components/admin/DashProducts";
import DashAddProduct from "../components/admin/DashAddProduct";
import DashUsers from "../components/admin/DashUsers";
import DashboardComp from "../components/admin/DashboardComp";
import DashTransaction from "../components/admin/DashTransaction";
import DashComments from "../components/admin/DashComments";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { currentUser, loading, error, accessToken } = useSelector(
    (state) => state.user
  ); // Access accessToken from the Redux store
  

  const handleSignOut = async () => {
    try {
      const response = await fetch(
        "https://e-commerce-app-pearl-six.vercel.app/api/users/logout",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include the access token in the request headers
          }, // Adjust the method as needed
          // Add any required headers or options
        }
      );

      if (response.ok) {
        dispatch(signOut());
      } else {
        throw new Error("Failed to sign out");
      }
    } catch (error) {
      console.log(error);
      // Optionally display an error message to the user
    }
  };

  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

 

  return (
    
      <div className="min-h-screen mt-16 dark:bg-gray-900 flex flex-col md:flex-row">
      <div className='md:w-56 mt-2'>
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile... */}
      {tab === 'profile' && <DashProfile />}
      {/* products */}
      {tab === 'products' && <DashProducts />}
      {/*Add product*/}
      {tab === 'addproduct' && <DashAddProduct />}
      {/*All users */}
      {tab === 'users' && <DashUsers />}
      {/* dashboard comp */}
      {tab === 'dash' && <DashboardComp />}
      {/* Transaction  */}
      {tab === 'transaction' && <DashTransaction /> }
      {/* comments */}
      {tab === 'comments' && <DashComments />}
    </div>
    
  );
};

export default Dashboard;
