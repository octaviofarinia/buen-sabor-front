import { Link } from 'react-router-dom';
import routes from '../../../Interfaces/NavigationInterfaces/EmployeeRoutes.json';
import { DropdownHeader } from '../HeaderComponents/DropdownHeader';
import { UserRouter } from './UserRouter';

export const EmployeeRouter = () => {
  return (
    <div
      className="-ml-8 hidden flex-col items-center gap-2.5
     sm:flex-row sm:justify-center lg:flex lg:justify-start "
    >
      <UserRouter />
      <Link
        to="/employee"
        className="flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 text-amber-400 hover:bg-neutral-800 hover:text-amber-500 active:text-amber-500"
      >
        Empleado
      </Link>
      <DropdownHeader routes={routes} />
    </div>
  );
};
