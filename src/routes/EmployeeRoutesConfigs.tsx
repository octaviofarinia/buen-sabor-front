import { EmployeeMain } from '../views/employeeViews/EmployeeMain';
import ClientDinamicRoutes, { ClientStaticRoutes } from './ClientRoutesConfigs';
import { AuthenticationGuard } from '../components/Auth0/AuthenticationGuard';
import { IngredienteABMRoutes } from './ABMRoutes/IngredienteRoutes';
import { ProductoRoutes } from './ABMRoutes/ProductoRoutes';
import { RubroArticuloRoutes } from './ABMRoutes/RubroArticuloRoutes';
import { UnidadDeMedidaRoutes } from './ABMRoutes/UnidadDeMedidaRoutes';
import { PedidoFacturaRoutes } from './ABMRoutes/PedidoAndFacturaRoutes';

const EmployeeDinamicRoutes = [
  ...ClientDinamicRoutes,
  ...IngredienteABMRoutes,
  ...ProductoRoutes,
  ...RubroArticuloRoutes,
  ...UnidadDeMedidaRoutes,
  ...PedidoFacturaRoutes,
];

export const EmployeeStaticRoutes = [
  ...ClientStaticRoutes,
  {
    name: 'Empleado',
    path: '/employee',
    element: <AuthenticationGuard component={EmployeeMain} />,
  },
];

export default EmployeeDinamicRoutes;
