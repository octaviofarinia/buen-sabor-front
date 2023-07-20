import { EmployeeMain } from '../views/EmployeeViews/EmployeeMain';
import { AbmRouter } from '../components/ABM/ABMRouter';
import ClientDinamicRoutes, { ClientStaticRoutes } from './ClientRoutesConfigs';
import { DetailRouter } from '../components/ABM/Details/DetailRouter';
import { AddOrUpdateRouter } from '../components/ABM/AddOrUpdate/AddOrUpdateRouter';
import { AuthenticationGuard } from '../components/Auth0/AuthenticationGuard';
import { IngredienteABMRoutes } from './ABMRoutes/IngredienteRoutes';

const EmployeeDinamicRoutes = [
  ...ClientDinamicRoutes,
  ...IngredienteABMRoutes,
  {
    path: 'employee/:Tipo/:RequestedEndpoint',
    element: <AuthenticationGuard component={AbmRouter} />,
  },
  {
    path: 'employee/ABM/:RequestedEndpoint/:id',
    element: <AuthenticationGuard component={DetailRouter} />,
  },
  {
    path: 'employee/ABM/:RequestedEndpoint/newRegister',
    element: <AuthenticationGuard component={AddOrUpdateRouter} />,
  },
  {
    path: 'employee/ABM/:RequestedEndpoint/edit/:id',
    element: <AuthenticationGuard component={AddOrUpdateRouter} />,
  },
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
