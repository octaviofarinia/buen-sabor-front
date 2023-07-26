import { ABMProductos } from '../../components/ABM/Tables/ABMProductos';
import { ProductoAddOrUpdate } from '../../components/ABM/AddOrUpdate/ProductoAddOrUpdate';
import { ProductoDetail } from '../../components/ABM/Details/ProductoDetail';
import { AuthenticationGuard } from '../../components/Auth0/AuthenticationGuard';
import { RankingView } from '../../views/EmployeeViews/RankingView';

export const ProductoRoutes = [
  {
    path: 'employee/ABM/Productos',
    element: <AuthenticationGuard component={ABMProductos} />,
  },
  {
    path: 'employee/ABM/Productos/:id',
    element: <AuthenticationGuard component={ProductoDetail} />,
  },
  {
    path: 'employee/ABM/Productos/newRegister',
    element: <AuthenticationGuard component={ProductoAddOrUpdate} />,
  },
  {
    path: 'employee/ABM/Productos/edit/:id',
    element: <AuthenticationGuard component={ProductoAddOrUpdate} />,
  },
];

export const RankingRoutes = [
  {
    path: 'employee/Ranking/Productos',
    element: <AuthenticationGuard component={RankingView} />,
  },
];
