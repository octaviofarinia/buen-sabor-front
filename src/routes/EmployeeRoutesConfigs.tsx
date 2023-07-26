import { EmployeeMain } from '../views/EmployeeViews/EmployeeMain';
import ClientDinamicRoutes, { ClientStaticRoutes } from './ClientRoutesConfigs';
import { AuthenticationGuard } from '../components/Auth0/AuthenticationGuard';
import { IngredienteABMRoutes } from './ABMRoutes/IngredienteRoutes';
import { ProductoRoutes, RankingRoutes } from './ABMRoutes/ProductoRoutes';
import { RubroArticuloRoutes } from './ABMRoutes/RubroArticuloRoutes';
import { UnidadDeMedidaRoutes } from './ABMRoutes/UnidadDeMedidaRoutes';
import { PedidoFacturaRoutes } from './ABMRoutes/PedidoAndFacturaRoutes';
import { employeeRoles } from '../Utils/Constants/UserRoles';

const AllEmployeeDinamicRoutes = [
  ...ClientDinamicRoutes,
  ...IngredienteABMRoutes,
  ...ProductoRoutes,
  ...RubroArticuloRoutes,
  ...UnidadDeMedidaRoutes,
  ...PedidoFacturaRoutes,
  ...RankingRoutes,
];

const LogisticaDinamicRoutes = [
  ...ClientDinamicRoutes,
  ...IngredienteABMRoutes,
  ...ProductoRoutes,
  ...RubroArticuloRoutes,
  ...UnidadDeMedidaRoutes,
];

const NormalEmployeesDinamicRoutes = [...PedidoFacturaRoutes];

export const EmployeeStaticRoutes = [
  ...ClientStaticRoutes,
  {
    name: 'Empleado',
    path: '/employee',
    element: <AuthenticationGuard component={EmployeeMain} />,
  },
];

export const getEmployeeRoutes = (role: string) => {
  if (role === employeeRoles.ADMINISTRADOR) {
    return [...AllEmployeeDinamicRoutes, ...EmployeeStaticRoutes];
  } else if (role === employeeRoles.LOGISTICA) {
    return [...EmployeeStaticRoutes, ...LogisticaDinamicRoutes];
  } else {
    return [...EmployeeStaticRoutes, ...NormalEmployeesDinamicRoutes];
  }
};
export default AllEmployeeDinamicRoutes;
