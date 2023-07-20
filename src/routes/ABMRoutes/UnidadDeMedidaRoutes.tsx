import { ABMUnidadDeMedida } from "../../components/ABM/Tables/ABMUnidadDeMedida";
import { UnidadDeMedidaAddOrUpdate } from "../../components/ABM/AddOrUpdate/UnidadDeMedidaAddOrUpdate";
import { UnidadDeMedidaDetail } from "../../components/ABM/Details/UnidadDeMedidaDetail";
import { AuthenticationGuard } from "../../components/Auth0/AuthenticationGuard";

export const UnidadDeMedidaRoutes=[
    {
      path: 'employee/ABM/UnidadDeMedida',
      element: <AuthenticationGuard component={ABMUnidadDeMedida} />,
    },
    {
      path: 'employee/ABM/UnidadDeMedida/:id',
      element: <AuthenticationGuard component={UnidadDeMedidaDetail} />,
    },
    {
      path: 'employee/ABM/UnidadDeMedida/newRegister',
      element: <AuthenticationGuard component={UnidadDeMedidaAddOrUpdate} />,
    },
    {
      path: 'employee/ABM/UnidadDeMedida/edit/:id',
      element: <AuthenticationGuard component={UnidadDeMedidaAddOrUpdate} />,
    },
  ]