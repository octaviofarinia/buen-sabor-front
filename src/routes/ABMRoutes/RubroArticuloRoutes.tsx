import { ABMRubroArticulos } from "../../components/ABM/Tables/ABMRubros";
import { RubroArticuloAddOrUpdate } from "../../components/ABM/AddOrUpdate/RubroArticuloAddOrUpdate";
import { RubroArticuloDetail } from "../../components/ABM/Details/RubroArticuloDetail";
import { AuthenticationGuard } from "../../components/Auth0/AuthenticationGuard";

export const RubroArticuloRoutes=[
    {
      path: 'employee/ABM/RubroArticulos',
      element: <AuthenticationGuard component={ABMRubroArticulos} />,
    },
    {
      path: 'employee/ABM/RubroArticulos/:id',
      element: <AuthenticationGuard component={RubroArticuloDetail} />,
    },
    {
      path: 'employee/ABM/RubroArticulos/newRegister',
      element: <AuthenticationGuard component={RubroArticuloAddOrUpdate} />,
    },
    {
      path: 'employee/ABM/RubroArticulos/edit/:id',
      element: <AuthenticationGuard component={RubroArticuloAddOrUpdate} />,
    },
  ]