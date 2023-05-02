import { Link } from 'react-router-dom';
import { roleCase } from './RoleFunctions';
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
            to={user.role === 'EMPLOYEE ' ? '/employee' : '/'}
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

          <nav className="hidden gap-12 lg:flex">
            {roleCase({user:user})}
          </nav>

          <div className="-ml-8 hidden flex-col gap-2.5 sm:flex-row sm:justify-center lg:flex lg:justify-start">
            {user.status ? (
              <Link to="/perfil" className="inline-block rounded-lg px-4 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:text-indigo-500 focus-visible:ring active:text-indigo-600 md:text-base">Perfil</Link>
            ) : (
              <Link to="/registro"  className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Registrarse</Link>
            )}
            {user.status ? (
              <Link to="/logout" className="inline-block rounded-lg px-4 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:text-indigo-500 focus-visible:ring active:text-indigo-600 md:text-base">Cerrar sesion</Link>
            ) : (
              <Link to="/login" className="inline-block rounded-lg px-4 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:text-indigo-500 focus-visible:ring active:text-indigo-600 md:text-base">Iniciar sesión</Link>
            )}
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
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
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
