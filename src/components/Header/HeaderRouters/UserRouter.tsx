import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useUser } from '../../../context/UserProvider';

export const UserRouter = () => {
  const { userRole: userRoles } = useUser();
  return (
    <div className="-ml-8 hidden flex-col gap-2.5 text-amber-400 sm:flex-row sm:justify-center lg:flex lg:items-center lg:justify-start  ">
      <Link to="/" className="flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 text-amber-400 hover:bg-neutral-800 hover:text-amber-500 active:text-amber-500 ">
        Inicio
      </Link>
      <Link to="/Productos" className="flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 text-amber-400 hover:bg-neutral-800 hover:text-amber-500 active:text-amber-500 ">
        Productos
      </Link>
      {!userRoles.includes('employee') && (
        <Link to="/Carrito" className="flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 text-amber-400 hover:bg-neutral-800 hover:text-amber-500 active:text-amber-500 ">
          <FontAwesomeIcon
            icon={faCartShopping}
            className="text-amber-400 hover:text-amber-500  "
          />
        </Link>
      )}
    </div>
  );
};
