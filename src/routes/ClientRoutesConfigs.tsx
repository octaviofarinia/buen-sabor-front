import { AuthenticationGuard } from '../components/Auth0/AuthenticationGuard';
import CargaDomicilioView from '../views/CargaDomicilioView';
import { CarritoView } from '../views/CarritoView';
import { ClientMain } from '../views/ClientMain';
import { PreguntasView } from '../views/PreguntasView';
import { ProductDetailView } from '../views/ProductDetail';
import { Products } from '../views/Products';
import PlanillaPedido from '../views/websocket/PlanillaPedido';
import { TeamView } from '../views/TeamView';
import FakeCartView from '../views/mp/FakeCartView';

const ClientDinamicRoutes = [
    { path: 'Productos/:categoria', element: '' },
    { path: '/Productos/Detalle/:id', element: <ProductDetailView /> },
    { path: '/Carrito', element: <AuthenticationGuard component={CarritoView} /> },
    { path: '/Domicilio', element: <AuthenticationGuard component={CargaDomicilioView} /> },
];

export const ClientStaticRoutes = [
    { name: 'Inicio', path: '/', element: <ClientMain /> },
    { name: 'Productos', path: '/Productos', element: <Products /> },
    { name: 'Nuestro Equipo', path: '/NuestroEquipo', element: <TeamView /> },
    { name: 'Preguntas', path: '/Preguntas', element: <PreguntasView /> },
    { name: 'PEDIDOS', path: '/Pedidos', element: <PlanillaPedido /> },
    { name: 'FAKE CART', path: '/FakeCart', element: <FakeCartView /> },
];

export default ClientDinamicRoutes;
