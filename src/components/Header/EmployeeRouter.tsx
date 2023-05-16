import { Link } from 'react-router-dom';
import routes from '../../Interfaces/EmployeeRoutes.json';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './Header.module.css';

export const EmployeeRouter = () => {
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div className="-ml-8 hidden flex-col gap-2.5 sm:flex-row sm:justify-center lg:flex lg:justify-start">
      <Link
        to="/employee"
        className="inline-block rounded-lg px-4 py-3 text-center text-sm font-semibold text-amber-300 outline-none ring-amber-300 transition duration-100 hover:text-amber-400 focus-visible:ring active:text-amber-500 md:text-base"
      >
        Inicio
      </Link>
      {routes.map((route) => (
        <Link
          to={`/employee/${route.name}`}
          key={route.name}
          className="inline-block rounded-lg px-4 py-3 text-center text-sm font-semibold capitalize text-amber-300 outline-none ring-amber-300 transition duration-100 hover:text-amber-400 focus-visible:ring active:text-amber-500 md:text-base"
        >
          {route.name}
        </Link>
      ))}
      {isAuthenticated && (
        <Link
          to="/perfil"
          className="inline-block rounded-lg px-4 py-3 text-center text-sm font-semibold text-amber-400 outline-none ring-amber-400 transition duration-100 hover:text-amber-500 focus-visible:ring active:text-amber-500 md:text-xl"
        >
          {user?.name}
        </Link>
      )}
      {isAuthenticated ? (
        <button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
          className={`inline-block rounded-lg px-4 py-3 text-center text-sm font-semibold text-amber-400 outline-none ring-amber-400 transition duration-100 hover:text-amber-500 focus-visible:ring active:text-amber-500 md:text-xl ${styles.header_button}`}
        >
          Cerrar sesion
        </button>
      ) : (
        <button
          onClick={() => loginWithRedirect()}
          className={`inline-block rounded-lg px-4 py-3 text-center text-sm font-semibold text-amber-400 outline-none ring-amber-400 transition duration-100 hover:text-amber-500 focus-visible:ring active:text-amber-500 md:text-xl ${styles.header_button}`}
        >
          Iniciar sesión
        </button>
      )}
    </div>
  );
};
