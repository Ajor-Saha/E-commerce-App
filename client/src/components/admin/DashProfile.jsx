import React, { useState } from "react";
import avatar from "../../assets/avatar.jpeg";
import { Alert, Avatar, Button, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const DashProfile = () => {
  const { currentUser, error, loading, accessToken } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // Add 'e' as a parameter here
    e.preventDefault();
    try {
      dispatch(updateStart());
      const res = await fetch("https://e-commerce-app-pearl-six.vercel.app/api/users/update-account", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : '', // Check if accessToken exists
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data.data);
      if (data.success === false) {
        dispatch(updateFailure(data));
        return;
      }
  
      const { user, accessToken: accessToken2 } = data.data; // Use a different variable name to avoid conflict
      dispatch(updateSuccess({ user, accessToken: accessToken2 }));
    } catch (error) {
      dispatch(updateFailure(error));
    }
  };

  const handleAvatarChange = async(e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", file);

    try {

      dispatch(updateStart());

      const response = await fetch("https://e-commerce-app-pearl-six.vercel.app/api/users/avatar", {
        method: "PATCH",
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
        body: formData,
      });

      
      const data = await response.json();
      const { user } = data.data;

      dispatch(updateSuccess({ user, accessToken }));

      // Handle success or failure
    } catch (error) {
      console.error("Error changing profile picture:", error);
      dispatch(updateFailure(error));

    }
  };
  

  return (
    
    <div className="relative py-14  mx-auto flex flex-col text-gray-700 dark:text-gray-200 bg-transparent shadow-none rounded-xl bg-clip-border">
      <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
        Profile
      </h4>
      <p className="block mt-1 pb-2 font-sans text-base antialiased font-normal leading-relaxed text-gray-700 dark:text-gray-200">
        Nice to meet you!
      </p>
      <Avatar
        img={currentUser.avatar}
        bordered
        size="lg"
        onClick={() => document.getElementById("avatarInput").click()} // Trigger click event on hidden input when Avatar is clicked
        style={{ cursor: "pointer" }} // Change cursor to pointer when hovering over Avatar
        />
      <input
        id="avatarInput"
        type="file"
        accept="image/*"
        style={{ display: "none" }} // Hide input element
        onChange={handleAvatarChange}
      />
      <form
        className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-6 mb-1">
          <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
            Your Name
          </h6>
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
              className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              onChange={handleChange}
            />
          </div>
          <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
            Your Email
          </h6>
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              type="email"
              name="email"
              id="email"
              defaultValue={currentUser.email}
              className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          className="mt-6 block w-full select-none rounded-lg bg-gray-900 dark:bg-gray-700 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          disabled={loading}
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex text-red-500">
        <button>Delete</button>
       
      </div>
      <p className="text-red-700">
        {error ? error.message || "Something went wrong!" : ""}
      </p>
    </div>
    
  );
};

export default DashProfile;
