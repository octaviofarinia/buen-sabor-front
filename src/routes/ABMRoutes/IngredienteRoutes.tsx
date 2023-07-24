import { ABMIngredientes } from '../../components/ABM/Tables/ABMIngredientes';
import { IngredienteAddOrUpdate } from '../../components/ABM/AddOrUpdate/IngredienteAddOrUpdate';
import { IngredientesDetail } from '../../components/ABM/Details/IngredientesDetail';
import { AuthenticationGuard } from '../../components/Auth0/AuthenticationGuard';
import { AgregarStockView } from '../../views/EmployeeViews/AgregarStockView';

export const IngredienteABMRoutes = [
  {
    path: 'employee/ABM/Ingredientes',
    element: <AuthenticationGuard component={ABMIngredientes} />,
  },
  {
    path: 'employee/ABM/Ingredientes/:id',
    element: <AuthenticationGuard component={IngredientesDetail} />,
  },
  {
    path: 'employee/ABM/Ingredientes/newRegister',
    element: <AuthenticationGuard component={IngredienteAddOrUpdate} />,
  },
  {
    path: 'employee/ABM/Ingredientes/edit/:id',
    element: <AuthenticationGuard component={IngredienteAddOrUpdate} />,
  },
  {
    path: 'employee/ABM/Ingredientes/:id/agregarStock/',
    element: <AuthenticationGuard component={AgregarStockView} />,
  },
];
