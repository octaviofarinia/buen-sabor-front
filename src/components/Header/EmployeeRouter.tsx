import { Link } from 'react-router-dom';
import routes from '../../Interfaces/EmployeeRoutes.json';

export const EmployeeRouter = ({ user }) => {
  return (
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
