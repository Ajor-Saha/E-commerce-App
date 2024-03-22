import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../components/utils/MainLayout";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("https://e-commerce-app-pearl-six.vercel.app/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
   
    <div className="font-sans text-gray-800 dark:text-gray-100 bg-white flex items-center mx-aut  px-4 py-32 dark:bg-gray-900 justify-center">
      <div className="max-w-4xl grid md:grid-cols-3 items-center shadow-md rounded-xl overflow-hidden">
        <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
          <div>
            <h4 className="text-white text-lg font-semibold">
              Create Your Account
            </h4>
            <p className="text-[13px] text-white mt-2">
              Welcome to our registration page! Get started by creating your
              account.
            </p>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold">
              Simple & Secure Registration
            </h4>
            <p className="text-[13px] text-white mt-2">
              Our registration process is designed to be straightforward and
              secure. We prioritize your privacy and data security.
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="md:col-span-2 w-full py-6 px-6 sm:px-16"
        >
          <div className="mb-6">
            <h3 className="text-2xl font-bold">Create an account</h3>
            <p className="text-red-700">
              {error ? "Something went wrong!" : ""}
            </p>
          </div>
          <div className="space-y-5">
            <div>
              <label className="text-sm mb-2 block">Name</label>
              <div className="relative flex items-center">
                <input
                  name="fullName"
                  type="text"
                  required
                  className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  id="fullName"
                  placeholder="Enter full name"
                  onChange={handleChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-4 h-4 absolute right-4"
                  viewBox="0 0 24 24"
                >
                  <circle cx="10" cy="7" r="6" />
                  <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" />
                </svg>
              </div>
            </div>
            <div>
              <label className="text-sm mb-2 block">Username</label>
              <div className="relative flex items-center">
                <input
                  name="username"
                  type="text"
                  required
                  className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter username"
                  id="username"
                  onChange={handleChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-4 h-4 absolute right-4"
                  viewBox="0 0 24 24"
                >
                  <circle cx="10" cy="7" r="6" />
                  <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" />
                </svg>
              </div>
            </div>
            <div>
              <label className="text-sm mb-2 block">Email Id</label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="email"
                  required
                  className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter email"
                  id="email"
                  onChange={handleChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-4 h-4 absolute right-4"
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" />
                    </clipPath>
                  </defs>
                  <g
                    clipPath="url(#a)"
                    transform="matrix(1.33 0 0 -1.33 0 682.667)"
                  >
                    <path
                      fill="none"
                      strokeMiterlimit="10"
                      strokeWidth="40"
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                    />
                    <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" />
                  </g>
                </svg>
              </div>
            </div>
            <div>
              <label className="text-sm mb-2 block">Password</label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  required
                  className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter password"
                  id="password"
                  onChange={handleChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-4 h-4 absolute right-4 cursor-pointer"
                  viewBox="0 0 128 128"
                >
                  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-3 block text-sm">
                I accept the{" "}
                <a
                  href="#"
                  className="text-blue-600 font-semibold hover:underline ml-1"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
          <div className="!mt-10">
            <button
              disabled={loading}
              className="w-full py-3 px-4 text-sm font-semibold rounded text-white bg-gray-700 hover:bg-gray-800 focus:outline-none"
            >
              {loading ? "Loading..." : "Create an Account"}
            </button>
          </div>
          <p className="text-sm mt-6 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline ml-1"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
    
  );
}

export default SignUp;
