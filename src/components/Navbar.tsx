import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [toggle, setToggle] = useState(false);
  return (
    <nav className=" bg-blue-800  border-gray-200 dark:bg-gray-900 navbar">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between     mx-auto p-4  md:px-7">
        <a href="/" className="  flex items-center  relative">
          <h1 className="text-white font-bold text-2xl">CATALYST</h1>
        </a>
        <button
          onClick={() => {
            setToggle(!toggle);
          }}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-[#FFCD29]  focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
          id="navbar-default"
          className={` ${
            toggle ? "block" : "hidden"
          } w-full  md:block md:w-auto`}
        >
          <ul className="font-medium flex flex-col mt-4  rounded-lg  md:flex-row lg:space-x-5 xl:space-x-8 rtl:space-x-reverse md:mt-0 ">
            <li>
              <NavLink
                to="users"
                className="block py-2 px-3 text-white  rounded   hover:bg-[#FFCD29] md:rounded-full dark:text-white md:dark:text-blue-500 "
                aria-current="page"
              >
                Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="properties"
                className="block py-2 px-3 text-white rounded hover:bg-[#FFCD29]  md:border-0 md:rounded-full  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Properties
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/bookings"
                className="block py-2 px-3 text-white  rounded hover:bg-[#FFCD29]  md:border-0 md:rounded-full  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Bookings
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="hidden md:block w-full md:w-auto"></div>
      </div>
    </nav>
  );
}
