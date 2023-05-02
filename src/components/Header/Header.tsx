import { Link } from "react-router-dom";
import { roleCase } from "./RoleFunctions";
import { users } from "../../Interfaces/userInteface";

interface Users {
    user: users;
  }

const Header = ({user }: Users) => {
  return (
    <header className="w-full  bg-slate-900 h-32 flex flex-row items-center">
      <nav className="flex w-full flex-row items-center justify-between px-12 text-white
      sticky top-0 z- py-2 text-neutral-600 "
      data-te-navbar-ref>
        <div className="">
          <form className="flex items-center">
            <label  className="sr-only">
              Buscar
            </label>
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-amber-400 focus:ring-amber-400  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-amber-500 dark:focus:ring-amber-600"
                placeholder="Buscar..."
                required
              />
            </div>
            <button
              type="submit"
              className="ml-2 rounded-lg border border-amber-400 bg-amber-400 p-2.5 text-sm font-medium text-white hover:bg-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-400 dark:bg-amber-500 dark:hover:bg-amber-500 dark:focus:ring-amber-600"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </form>
        </div>
        <div className="Fuppercase flex flex-col items-center text-3xl font-extrabold text-amber-400 uppercase">
          <img
            src="../../../public/🦆 illustration _Chicken_ (2).png"
            alt="buen sabor logo"
            className="w-20"
          />
          <h2>el buen sabor</h2>
        </div>
       {roleCase({user: user})}
      </nav>
    </header>
  );
};
export default Header;
