import { useAuth0 } from '@auth0/auth0-react';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

export const UserRouter = () => {
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div className="-ml-8 hidden flex-col gap-2.5 text-amber-400 sm:flex-row sm:justify-center lg:flex lg:items-center lg:justify-start lg:gap-10 lg:text-xl">
      <Link to="/Inicio" className="hover:text-amber-500  active:bg-amber-500">
        Inicio
      </Link>
      <Link
        to="/Productos"
        className="hover:text-amber-500  active:bg-amber-500"
      >
        Productos
      </Link>
      <Link to="/Carrito" className="hover:text-amber-500  active:bg-amber-500">
        <FontAwesomeIcon
          icon={faCartShopping}
          className="text-amber-400 hover:text-amber-500  active:bg-amber-500"
        />
      </Link>
      {isAuthenticated ? (
        <Link
          to="/perfil"
          className="inline-block rounded-lg px-4 py-3 text-center text-sm font-semibold text-amber-400 outline-none ring-amber-400 transition duration-100 hover:text-amber-500 focus-visible:ring active:text-amber-500 md:text-xl"
        >
          {user?.name}
        </Link>
      ) : (
        <button
          onClick={() =>
            loginWithRedirect({
              authorizationParams: { screen_hint: 'signup' },
            })
          }
          className={`inline-block rounded-lg bg-amber-400 px-8 py-3 text-center text-xl font-semibold text-black outline-none ring-amber-400 transition duration-100 hover:bg-amber-500 focus-visible:ring active:bg-amber-500 md:text-xl ${styles.header_button}`}
        >
          Registrarse
        </button>
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
