import { ABMIngredientes } from "../../components/ABM/ABMIngredientes";
import { IngredienteAddOrUpdate } from "../../components/ABM/AddOrUpdate/IngredienteAddOrUpdate";
import { IngredientesDetail } from "../../components/ABM/Details/IngredientesDetail";
import { AuthenticationGuard } from "../../components/Auth0/AuthenticationGuard";

export const IngredienteABMRoutes=[
    {
      path: 'employee/ABM/Ingrediente',
      element: <AuthenticationGuard component={ABMIngredientes} />,
    },
    {
      path: 'employee/ABM/Ingrediente/:id',
      element: <AuthenticationGuard component={IngredientesDetail} />,
    },
    {
      path: 'employee/ABM/Ingrediente/newRegister',
      element: <AuthenticationGuard component={IngredienteAddOrUpdate} />,
    },
    {
      path: 'employee/ABM/Ingrediente/edit/:id',
      element: <AuthenticationGuard component={IngredienteAddOrUpdate} />,
    },
  ]