import { AuthenticationGuard } from '../../components/Auth0/AuthenticationGuard';
import { FacturasView } from '../../views/EmployeeViews/FacturasView';
import { PedidosView } from '../../views/EmployeeViews/PedidosView';
import { DetallePedidoView } from '../../views/EmployeeViews/DetallePedido';

export const PedidoFacturaRoutes = [
  {
    path: 'employee/Planilla/Pedidos',
    element: <AuthenticationGuard component={PedidosView} />,
  },
  {
    path: 'employee/Planilla/Facturas',
    element: <AuthenticationGuard component={FacturasView} />,
  },
  {
    path: 'employee/Planilla/Pedidos/:id',
    element: <AuthenticationGuard component={DetallePedidoView} />,
  },
];
