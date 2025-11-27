import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [thisUser, setThisUser] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState({});
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const [userType, setUserType] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    fetch(`${API_BASE_URL}/users/userData`, {
      method: "GET",
      credentials: "include",
    })
      .then(async (res) => {
        if (res.ok) {
          const body = await res.json();
          setUserType(body.data.user.userType);
          setThisUser(body.data.user.username);
          setIsAuthenticated(true);
        } else {
          setErrors({ ...errors, isAuthenticated: "Please login" });
          setIsAuthenticated(false);
        }
      })
      .catch((err) => {
        console.log("Some Error Occurred fetching user details");
      });
  }, []);

  const handleLogout = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    fetch(`${API_BASE_URL}/users/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then(async (res) => {
        const ret = await res.json();
        if (res.ok) {
          console.log("Successful Logout");
          setIsAuthenticated(false);
          setShowDropdownMenu(false);
          navigate("/");
        } else {
          console.log(ret);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-3xl border-b border-white/20">
      {/* <Haze /> */}
       {/* <div className="absolute inset-x-0 -top-30 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#0D79F4] to-[#07CEF7] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
        </div> */}
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="">
            <img
              src="https://res.cloudinary.com/dvny8jtdq/image/upload/v1752483724/embrace_autism_logo-removebg-preview_dsbqkd.png"
              className="w-10 h-10"
            />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            to="/"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Home
          </Link>
          <Link
            to="/About-us"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            About Us
          </Link>
          {!isAuthenticated ? (
            <div className="flex gap-x-6">
              <Link
                to="/child"
                className="col-span-3 text-sm font-semibold leading-6 text-gray-900"
              >
                Child
              </Link>
              <Link
                to="/adult"
                className="col-span-3 text-sm font-semibold leading-6 text-gray-900"
              >
                Adult
              </Link>
            </div>
          ) : userType === "Adult" ? (
            <div className="flex gap-x-6">
              <Link
                to="/adult/Features"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Features
              </Link>
              <Link
                to="/adult/ViewEvent"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Community Events
              </Link>
              {/* <Link
                to="/adult/Volunteer"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Volunteer
              </Link> */}
              <Link
                to="/adult/ShareStories"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Share Stories
              </Link>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isAuthenticated ? (
            <div>
              <Link
                to="/profile"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {thisUser} <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          ) : (
            <button>
              <Link
                to="/signup"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Signup
                {/* <div className="text-xs text-red-600">
                  {errors.isAuthenticated}
                </div> */}
              </Link>
            </button>
          )}
          <button onClick={() => setShowDropdownMenu((prev) => !prev)}>
            <i className="fas fa-chevron-down ml-2 text-xs text-gray-500"></i>
          </button>
        </div>
      </nav>
      {showDropdownMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-slate-50 rounded shadow-lg py-2 z-50">
          <Link
            to="/profile"
            onClick={() => setShowDropdownMenu((prev) => !prev)}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            reloadDocument
          >
            Profile
          </Link>
          <Link
            to="/settings"
            onClick={() => setShowDropdownMenu((prev) => !prev)}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            reloadDocument
          >
            Settings
          </Link>
          <Link
            to="/login"
            onClick={() => setShowDropdownMenu((prev) => !prev)}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            reloadDocument
          >
            Login
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            reloadDocument
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
