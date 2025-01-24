import { ReactElement } from "react";
import logo from "../images/logo.png";
import { useUserSelector } from "../features/users/state/hooks";

const Homepage = (): ReactElement => {
  const { loggedIn } = useUserSelector();

  return (
    <>
      <div>
        <img
          src={logo}
          alt="logo"
          className="w-full"
        />
      </div>
      {!loggedIn && (
        <div className="flex flex-col items-center justify-center h-screen -mt-40">
          <h1 className="text-4xl font-extrabold text-purple-800 mb-4">
            Welcome to EventlyEasy
          </h1>
          <p className="text-lg text-gray-700 mb-4 text-center">
  <span className="font-semibold text-purple-800">EventlyEasy</span> is your go-to app for organizing events, whether they're big or small. It simplifies event planning with tools that are intuitive and easy to use.
</p>
<p className="text-lg text-gray-700 mb-4 text-center">
  From managing guest lists to handling tasks and tracking locations, EventlyEasy helps you stay on top of every detail. Plus, with built-in budget management, you can plan your events without the stress of overspending.
</p>
<p className="text-lg text-gray-700 mb-6 text-center">
  Make every event memorable by keeping everything in one place. Start your journey to effortless event planning today with EventlyEasy!
</p>
          <div className="flex gap-4">
            <a
              href="/register"
              className="px-6 py-2 bg-purple-600 text-white text-lg font-medium rounded-md hover:bg-purple-700 transition"
            >
              Register
            </a>
            <a
              href="/login"
              className="px-6 py-2 bg-pink-600 text-white text-lg font-medium rounded-md hover:bg-pink-700 transition"
            >
              Login
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Homepage;