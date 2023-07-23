import { ABMRoutes } from '../../Interfaces/NavigationInterfaces/ABMRoutes';
import { useUser } from '../../context/UserProvider';
import { ABMRoles, facturaRoles, pedidoRoles } from '../../Utils/Constants/UserRoles';
import { ImageLink } from '../../components/ImageLink/ImageLink';

export const EmployeeMain = () => {
  const { userRole } = useUser();
  return (
    <div className="bg-neutral-100 pt-3 pb-10 dark:bg-neutral-800">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="relative grid gap-6 sm:grid-cols-2">
          {Object.values(ABMRoles).includes(userRole) &&
            ABMRoutes.map((route) => (
              <ImageLink
                dropdown={route.dropdown}
                imagen={route.imagen}
                name={route.name}
                type={route.type}
                route={route.route}
              />
            ))}
          {Object.values(pedidoRoles).includes(userRole) && (
            <ImageLink
              dropdown={'Pedidos'}
              imagen={'/pedido.jpg'}
              name={'Pedidos'}
              type={'Planilla'}
              route={'Pedidos'}
            />
          )}
          {Object.values(facturaRoles).includes(userRole) && (
            <ImageLink
              dropdown={'Facturas'}
              imagen={'/facturas.jpg'}
              name={'Facturas'}
              type={'Planilla'}
              route={'Facturas'}
            />
          )}
        </div>
      </div>
    </div>
  );
};
