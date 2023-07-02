import { AuthenticationGuard } from '../components/Auth0/AuthenticationGuard';
import CargaDomicilioView from '../views/CargaDomicilioView';
import { CarritoView } from '../views/CarritoView';
import { ClientMain } from '../views/ClientMain';
import { ProductDetailView } from '../views/ProductDetail';
import { Products } from '../views/Products';
import PlanillaPedido from '../views/websocket/PlanillaPedido';

const ClientDinamicRoutes = [
  { path: 'Productos/:categoria', element: '' },
  { path: '/Productos/Detalle/:id', element: <ProductDetailView /> },
  { path: '/Domicilio', element: <AuthenticationGuard component={CargaDomicilioView} /> },
];

export const ClientStaticRoutes = [
  { name: 'Inicio', path: '/', element: <ClientMain /> },
  { name: 'Productos', path: '/Productos', element: <Products /> },
  { name: 'Carrito', path: '/Carrito', element: <AuthenticationGuard component={CarritoView} /> },
  { name: 'Nosotros', path: '/Nosotros' },
  { name: 'Donde Estamos', path: '/Donde-Estamos' },
  { name: 'PEDIDOS', path: '/Pedidos', element: <PlanillaPedido /> },
];

export default ClientDinamicRoutes;
