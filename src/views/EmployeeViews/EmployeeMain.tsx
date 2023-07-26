import { ABMRoutes } from '../../Interfaces/NavigationInterfaces/Routes';
import { useUser } from '../../context/UserProvider';
import { ImageLink } from '../../components/ImageLink/ImageLink';
import {
  ABMRoles,
  employeeRoles,
  facturaRoles,
  pedidoRoles,
} from '../../Utils/Constants/UserRoles';

export const EmployeeMain = () => {
  const { userRole } = useUser();
  return (
    <div className="bg-neutral-100 pt-3 pb-10 dark:bg-neutral-800">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="relative grid gap-6 sm:grid-cols-2">
          {Object.values(ABMRoles).includes(userRole) &&
            ABMRoutes.map((route) => (
              <ImageLink
                key={route.name}
                dropdown={route.dropdown}
                imagen={route.imagen}
                name={route.name}
                type={route.type}
                route={route.route}
              />
            ))}
          {Object.values(pedidoRoles).includes(userRole) && (
            <ImageLink
              key={'pedidoItem'}
              dropdown={'Pedidos'}
              imagen={'/pedido.jpg'}
              name={'Pedidos'}
              type={'Planilla'}
              route={'Pedidos'}
            />
          )}
          {Object.values(facturaRoles).includes(userRole) && (
            <ImageLink
              key={'facturaItem'}
              dropdown={'Facturas'}
              imagen={'/facturas.jpg'}
              name={'Facturas'}
              type={'Planilla'}
              route={'Facturas'}
            />
          )}
          {userRole === employeeRoles.ADMINISTRADOR && (
            <ImageLink
              key={'ranking'}
              dropdown={'Ranking Productos'}
              imagen={'/ranking.jpg'}
              name={'Ranking Productos'}
              type={'Ranking'}
              route={'Productos'}
            />
          )}
        </div>
      </div>
    </div>
  );
};
