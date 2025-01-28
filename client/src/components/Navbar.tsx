import { ReactElement, useState } from "react";
import logo from '../images/name.png'
import { useUserSelector } from "../features/users/state/hooks";
import { useLogout } from "../features/users/state/hooks";



const Navbar = (): ReactElement => {
  const { loggedIn } = useUserSelector();
  const logout = useLogout();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-l from-purple-600 to-indigo-600 p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* Left Side: Logo */}
        <img
          src={logo}
          alt="logo"
          className="w-40 sm:w-48 md:w-60"
        />

        {/* Hamburger Menu (Visible on smaller screens) */}
        <button
          className="block sm:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>

        {/* Right Side: Links (Desktop and expanded menu) */}
        <div
          className={`flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 absolute sm:relative bg-purple-600 sm:bg-transparent top-14 sm:top-auto right-4 sm:right-auto rounded-lg sm:rounded-none p-4 sm:p-0 shadow-lg sm:shadow-none transition-transform ${
            isMenuOpen ? "block" : "hidden sm:flex"
          }`}
        >
          <a
            href="/"
            className="text-white text-sm font-medium hover:underline"
          >
            Home
          </a>

          {loggedIn ? (
            <>
              <a
                href="/myevents"
                className="text-white text-sm font-medium hover:underline"
              >
                My Events
              </a>
              <a
                href="/contact"
                className="text-white text-sm font-medium hover:underline"
              >
                Contact
              </a>
              <a
                href="/"
                onClick={() => logout()}
                className="text-white text-sm font-medium hover:underline"
              >
                Logout
              </a>
            </>
          ) : (
            <>
              <a
                href="/login"
                className="text-white text-sm font-medium hover:underline"
              >
                Login
              </a>
              <a
                href="/register"
                className="text-white text-sm font-medium hover:underline"
              >
                Register
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar