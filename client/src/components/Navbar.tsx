import { ReactElement } from "react";
import logo from '../images/name.png'
import { useUserSelector } from "../features/users/state/hooks";
import { useLogout } from "../features/users/state/hooks";



const Navbar = () :ReactElement => {

  const { loggedIn} = useUserSelector()
  const logout = useLogout()


  if (loggedIn === false){
    return (
        <>
            <nav className="bg-gradient-to-l from-purple-600 to-indigo-600 p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Left Side: Logo */}
        <img src={logo} alt="logo"  style={{width:'350px'}}/>

       

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
  } else {
    return (
      <>
          <nav className="bg-gradient-to-l from-purple-600 to-indigo-600 p-4 shadow-lg">
    <div className="max-w-6xl mx-auto flex justify-between items-center">
      {/* Left Side: Logo */}
      <img src={logo} alt="logo"  style={{width:'350px'}}/>

     

      {/* Right Side: Links */}
      <div className="flex space-x-4">
      <a
          href="/"
          className="text-white text-sm font-medium hover:underline">
          Home
        </a>
        <a
          href="/myevents"
          className="text-white text-sm font-medium hover:underline">
          My Events
          
        </a>
        <a
          href="/"
          onClick={()=>logout()}
          className="text-white text-sm font-medium hover:underline">
          logout
          
        </a>
       
      </div>
    </div>
  </nav>
      </>
  )
  }
}

export default Navbar