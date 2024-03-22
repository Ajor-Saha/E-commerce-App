import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { FaUserCircle, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../redux/user/userSlice";
import { FaPlus, FaMinus, FaMoon, FaSun } from "react-icons/fa";
import { toggleTheme } from "../../redux/theme/themeSlice";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false); // Step 1
  const [dropIcon, setDropIcon] = useState(false);
  const [dropIcona, setDropIcona] = useState(false);
  const [dropIconb, setDropIconb] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSideNav = () => {
    // Step 2
    setIsSideNavOpen(!isSideNavOpen);
  };

  const toggleDropIcon = () => {
    setDropIcon(!dropIcon);
  };

  const toggleDropIcona = () => {
    setDropIcona(!dropIcona);
  };

  const toggleDropIconb = () => {
    setDropIconb(!dropIconb);
  };

  const { currentUser, loading, error, accessToken } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  const handleSignOut = async () => {
    try {
      const response = await fetch("https://e-commerce-app-pearl-six.vercel.app/api/users/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token in the request headers
        }, // Adjust the method as needed
        // Add any required headers or options
      });

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

  return (
    <nav className="dark:bg-gray-800 bg-gray-100 dark:text-white text-black fixed top-0 left-0 w-full z-50 px-5 py-5 flex justify-between items-center">
      {/* Left section */}
      <div className="flex items-center">
        <Link to="/" className="text-lg font-semibold dark:text-gray-50">
           FashionFleet
        </Link>
      </div>

      {/* Center section */}
      <div className="flex justify-center flex-1">
        <div className="relative w-full max-w-xs ml-2 mr-2">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="block w-full md:w-64 lg:w-80 rounded-md bg-gray-50 dark:bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-400 pl-8 py-1"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 21l-5.2-5.2"></path>
                <circle cx="10" cy="10" r="8"></circle>
              </svg>
            </span>
          </form>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center relative">
        <Button
          className="w-12 h-8  mr-2"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>
        <FaUserCircle
          className="mr-4 cursor-pointer"
          onClick={toggleDropdown}
        />
        {isDropdownOpen && (
          <ul className="absolute right-0 top-10 mt-2 bg-gray-800 rounded-md shadow-lg">
            {currentUser ? (
              <li>
                <button
                  className="block px-4 py-2 text-white hover:bg-gray-700 w-full text-left"
                  onClick={handleSignOut}
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <button
                  className="block px-4 py-2 text-white hover:bg-gray-700 w-full text-left"
                  type="button"
                >
                  <Link to="/login">Login</Link>
                </button>
              </li>
            )}
            <li>
              <button className="block px-4 py-2 text-white hover:bg-gray-700 w-full text-left">
                {currentUser ? (
                  <Link to="/dashboard">Profile</Link>
                ) : (
                  <Link to="/login">Profile</Link>
                )}
              </button>
            </li>
          </ul>
        )}
        <Link to="/shoppingList" className="mr-2">
          <div className="relative">
            <FaShoppingCart className="mr-4 cursor-pointer"/>
            {cartItems.length > 0 && (
              <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white flex items-center justify-center rounded-full text-xs">
                {cartItems.length}
              </div>
            )}
          </div>
        </Link>
        <FaBars className="cursor-pointer" onClick={toggleSideNav} />{" "}
        {/* Step 3 */}
        {isSideNavOpen && (
          <div className="fixed top-0  right-0 h-full w-full bg-black bg-opacity-50 flex justify-end">
            <div className="bg-white dark:bg-gray-900 dark:text-gray-50 w-80 flex flex-col overflow-y-auto">
              <div className="flex justify-end p-4">
                <FaTimes
                  className="text-black dark:text-gray-50 cursor-pointer"
                  onClick={toggleSideNav}
                />
              </div>
              {/* Your sidenav content here */}
              <h1 className="text-black dark:text-gray-50 ml-3 text-lg">Categories</h1>
              <ul className="px-4 text-black dark:text-gray-50">
                <li className="relative py-2 border-b">
                  <span
                    className="cursor-pointer flex"
                    onClick={toggleDropIcon}
                  >
                    MEN{" "}
                    {dropIcon ? (
                      <FaMinus className="ml-2" />
                    ) : (
                      <FaPlus className="ml-2 mt-1 text-sm" />
                    )}
                  </span>
                  {dropIcon && (
                    <ul className="mb-2">
                      <li className="py-2 px-4">
                        <Link to="/products/half-sleeve-tshirt">
                          Half Sleeve T-shirt
                        </Link>
                      </li>
                      <li className="py-2 px-4">
                        <Link to="/products/full-sleeve-tshirt">
                          Full Sleeve T-shirt
                        </Link>
                      </li>
                      <li className="py-2 px-4">
                        <Link to="/products/shirt">Shirt</Link>
                      </li>
                      <li className="py-2 px-4">
                        <Link to="/products/polo-t-shirt">Polo T-shirt</Link>
                      </li>
                      <li className="py-2 px-4">
                        <Link to="/products/Hoodie">Hoodie</Link>
                      </li>
                      <li className="py-2 px-4">
                        <Link to="/products/Jacket">Jacket</Link>
                      </li>
                      <li className="py-2 px-4">
                        <Link to="/products/sports-trouser">
                          Sports Trouser
                        </Link>
                      </li>
                      <li className="py-2 px-4">
                        <Link to="/products/Panjabi">Panjabi</Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li className="relative py-2 border-b">
                  <span
                    className="cursor-pointer flex"
                    onClick={toggleDropIcona}
                  >
                    WOMEN{" "}
                    {dropIcona ? (
                      <FaMinus className="ml-2" />
                    ) : (
                      <FaPlus className="ml-2 mt-1 text-sm" />
                    )}
                  </span>
                  {dropIcona && (
                    <ul className="mb-2">
                      <li className="py-2 px-4">
                        <Link to="/products/women/Skirts">Skirts</Link>
                      </li>
                      <li className="py-2 px-4">
                        <Link to="/products/women/t-shirt">T-Shirt</Link>
                      </li>
                      <li className="py-2 px-4">
                        <Link to="/products/women/comfy-trouser">
                          Comfy Trouser
                        </Link>
                      </li>
                      <li className="py-2 px-4">
                        <Link to="/products/women/Gown">Gown</Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li className="relative py-2 border-b">
                  <span
                    className="cursor-pointer flex"
                    onClick={toggleDropIconb}
                  >
                    KIDS{" "}
                    {dropIconb ? (
                      <FaMinus className="ml-2" />
                    ) : (
                      <FaPlus className="ml-2 mt-1 text-sm" />
                    )}
                  </span>
                  {dropIconb && (
                    <ul className="mb-2">
                      <li className="py-2 px-4">
                        <Link to="/products/kids/polo-tshirt">
                          Polo T-Shirt
                        </Link>
                      </li>
                      <li className="py-2 px-4">
                        <Link to="/products/kids/half-sleeve-tshirt">
                          Half Sleeve T-Shirt
                        </Link>
                      </li>
                      <li className="py-2 px-4">
                        <Link to="/products/kids/maggie">Maggie</Link>
                      </li>
                      <li className="py-2 px-4">
                        <Link to="/products/kids/trouser">Trouser</Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
