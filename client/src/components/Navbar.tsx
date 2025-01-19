import { ReactElement } from "react";

const Navbar = () :ReactElement => {
    return (
        <>
            <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Left Side: Logo */}
        <div className="text-white text-2xl font-bold">
          EventlyEasy
        </div>

        {/* Right Side: Links */}
        <div className="flex space-x-4">
        <a
            href="/"
            className="text-white text-sm font-medium hover:underline">
            Home
          </a>
          <a
            href="/login"
            className="text-white text-sm font-medium hover:underline">
            Login
          </a>
          <a
            href="/register"
            className="text-white text-sm font-medium hover:underline">
            Register
          </a>
        </div>
      </div>
    </nav>
        </>
    )
}

export default Navbar