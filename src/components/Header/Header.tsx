import { Link } from 'react-router-dom';
import { HeaderRouter } from './HeaderRouter';
import { users } from '../../Interfaces/userInteface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger } from '@fortawesome/free-solid-svg-icons';
interface Users {
  user: users;
}

const Header = ({ user }: Users) => {
  return (
    <div className="h-32 bg-slate-900 lg:pb-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <header className="flex items-center justify-between py-4 md:py-8">
          <Link
            to={user.role === 'EMPLOYEE' ? '/employee' : '/'}
            className="inline-flex items-center gap-2.5 text-3xl font-bold uppercase text-amber-300 md:text-3xl"
            aria-label="logo"
          >
            <FontAwesomeIcon
              icon={faBurger}
              size="2xl"
              style={{ color: '#fcd34d' }}
            />
            <h2 className="text-3xl font-bold uppercase text-amber-300 md:text-3xl">
              el buen sabor
            </h2>
          </Link>

          <nav className="hidden gap-12 lg:flex"></nav>

          <div className="-ml-8 hidden flex-col gap-2.5 sm:flex-row sm:justify-center lg:flex lg:justify-start">
            {HeaderRouter({ user: user })}
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-2.5 py-2 text-sm font-semibold text-gray-500 ring-indigo-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Menu
          </button>
        </header>
      </div>
    </div>
  );
};
export default Header;
