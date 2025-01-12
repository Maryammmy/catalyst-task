import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [toggle, setToggle] = useState(false);
  const navLinks = [
    { name: "Users", path: "/users" },
    { name: "Properties", path: "/properties" },
    { name: "Bookings", path: "/bookings" },
  ];
  return (
    <nav className="bg-blue-700 border-gray-200 dark:bg-gray-900">
      <div className=" flex flex-wrap items-center justify-between mx-auto p-5">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            CATALYST
          </span>
        </a>
        <button
          onClick={() => {
            setToggle(!toggle);
          }}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={` ${
            toggle ? "block" : "hidden"
          } w-full  md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {navLinks.map(({ name, path }) => (
              <li key={name}>
                <NavLink
                  to={path}
                  className="block py-2 px-3 text-white font-semibold rounded hover:text-black hover:transition-all  md:border-0 md:rounded-full  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
