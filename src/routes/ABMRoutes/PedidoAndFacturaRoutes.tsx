
import { AuthenticationGuard } from '../../components/Auth0/AuthenticationGuard';
import { DetallePedido } from '../../views/employeeViews/DetallePedido';
import { FacturasView } from '../../views/employeeViews/FacturasView';
import { PedidosView } from '../../views/employeeViews/PedidosView';

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
    element: <AuthenticationGuard component={DetallePedido} />,
  },
];
