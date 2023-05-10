import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export const UserRouter = ({ user }) => {
  return (
    <div className="-ml-8 hidden flex-col gap-2.5 text-amber-400 sm:flex-row sm:justify-center lg:flex lg:items-center lg:gap-10 lg:justify-start lg:text-xl">
      <Link to="/Inicio" className="hover:text-amber-500  active:bg-amber-500">Inicio</Link>
      <Link to="/Productos" className="hover:text-amber-500  active:bg-amber-500">Productos</Link>
      <Link to="/Carrito" className="hover:text-amber-500  active:bg-amber-500">
        <FontAwesomeIcon icon={faCartShopping} className="text-amber-400 hover:text-amber-500  active:bg-amber-500" />
      </Link>
      {user.status ? (
        <Link
          to="/perfil"
          className="inline-block rounded-lg px-4 py-3 text-center text-sm font-semibold text-amber-400 outline-none ring-amber-400 transition duration-100 hover:text-amber-500 focus-visible:ring active:text-amber-500 md:text-xl"
        >
          Perfil
        </Link>
      ) : (
        <Link
          to="/registro"
          className="inline-block rounded-lg bg-amber-400 px-8 py-3 text-center text-xl font-semibold text-black outline-none ring-amber-400 transition duration-100 hover:bg-amber-500 focus-visible:ring active:bg-amber-500 md:text-xl"
        >
          Registrarse
        </Link>
      )}
      {user.status ? (
        <Link
          to="/logout"
          className="inline-block rounded-lg px-4 py-3 text-center text-sm font-semibold text-amber-400 outline-none ring-amber-400 transition duration-100 hover:text-amber-500 focus-visible:ring active:text-amber-500 md:text-xl"
        >
          Cerrar sesion
        </Link>
      ) : (
        <Link
          to="/login"
          className="inline-block rounded-lg px-4 py-3 text-center text-sm font-semibold text-amber-400 outline-none ring-amber-400 transition duration-100 hover:text-amber-500 focus-visible:ring active:text-amber-500 md:text-xl"
        >
          Iniciar sesión
        </Link>
      )}
    </div>
  );
};
