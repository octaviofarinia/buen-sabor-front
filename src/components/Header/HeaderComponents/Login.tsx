import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import styles from '../Header.module.css';

export const Login = () => {
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div className='flex gap-2.5'>
     
      {isAuthenticated ? (
        <button
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          className={`inline-block rounded-lg px-3 py-2 text-center font-semibold
           text-amber-400 outline-none ring-amber-400 transition duration-100
            hover:text-amber-500 focus-visible:ring active:text-amber-500 
             ${styles.header_button} hover:bg-neutral-800`}
         
        >
          Cerrar sesion
        </button>
      ) : (
        <button
          onClick={() => loginWithRedirect()}
          className={`inline-block rounded-lg px-3 py-2 text-center font-semibold text-amber-400 outline-none ring-amber-400 transition duration-100 hover:text-amber-500 focus-visible:ring active:text-amber-500  ${styles.header_button} hover:bg-neutral-800`}
        >
          Iniciar sesión
        </button>
      )}
      {isAuthenticated ? (
        <Link
          to="/perfil"
          className="inline-block rounded-lg px-3 py-2 text-center font-semibold text-amber-400 outline-none ring-amber-400 transition duration-100 hover:text-amber-500 focus-visible:ring active:text-amber-500  hover:bg-neutral-800"
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
          className={`inline-block rounded-lg bg-amber-400 px-3 py-2text-center text-xl font-semibold text-black outline-none ring-amber-400 transition duration-100 hover:bg-amber-500 focus-visible:ring active:bg-amber-500  ${styles.header_button} hover:bg-neutral-800`}
        >
          Registrarse
        </button>
      )}
    </div>
  );
};
