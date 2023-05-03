import { Link } from 'react-router-dom';
import routes from '../../Interfaces/routes.json';
export const HeaderRouter = ({ user }) => {
  return user.role == 'EMPLOYEE' ? (
    <div className="-ml-8 hidden flex-col gap-2.5 sm:flex-row sm:justify-center lg:flex lg:justify-start">
      <Link
        to="/employee"
        className="inline-block rounded-lg px-4 py-3 text-center text-sm font-semibold text-amber-300 outline-none ring-amber-300 transition duration-100 hover:text-amber-400 focus-visible:ring active:text-amber-500 md:text-base"
      >
        Inicio
      </Link>
      {routes.map((route)=>(
        <Link
        to={`/employee/${route.name}`}  key={route.name}
        className="inline-block rounded-lg px-4 py-3 text-center text-sm font-semibold text-amber-300 outline-none ring-amber-300 transition duration-100 hover:text-amber-400 focus-visible:ring active:text-amber-500 md:text-base capitalize"
      >
        {route.name}
      </Link>
      ))}
      <Link
        to="/employee/perfil"
        className="inline-block rounded-lg px-4 py-3 text-center text-sm font-semibold text-amber-300 outline-none ring-amber-300 transition duration-100 hover:text-amber-400 focus-visible:ring active:text-amber-500 md:text-base"
      >
        Perfil
      </Link>
    </div>
  ) : (
    <div className="-ml-8 hidden flex-col gap-2.5 sm:flex-row sm:justify-center lg:flex lg:justify-start">
      {user.status ? (
        <Link
          to="/perfil"
          className="inline-block rounded-lg px-4 py-3 text-center text-sm font-semibold text-amber-300 outline-none ring-amber-300 transition duration-100 hover:text-amber-400 focus-visible:ring active:text-amber-500 md:text-base"
        >
          Perfil
        </Link>
      ) : (
        <Link
          to="/registro"
          className="inline-block rounded-lg bg-amber-300 px-8 py-3 text-center text-sm font-semibold text-black outline-none ring-amber-300 transition duration-100 hover:bg-amber-400 focus-visible:ring active:bg-amber-500 md:text-base"
        >
          Registrarse
        </Link>
      )}
      {user.status ? (
        <Link
          to="/logout"
          className="inline-block rounded-lg px-4 py-3 text-center text-sm font-semibold text-amber-300 outline-none ring-amber-300 transition duration-100 hover:text-amber-400 focus-visible:ring active:text-amber-500 md:text-base"
        >
          Cerrar sesion
        </Link>
      ) : (
        <Link
          to="/login"
          className="inline-block rounded-lg px-4 py-3 text-center text-sm font-semibold text-amber-300 outline-none ring-amber-300 transition duration-100 hover:text-amber-400 focus-visible:ring active:text-amber-500 md:text-base"
        >
          Iniciar sesión
        </Link>
      )}
    </div>
  );
};
