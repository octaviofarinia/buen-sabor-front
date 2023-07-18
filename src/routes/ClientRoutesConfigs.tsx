import { AuthenticationGuard } from '../components/Auth0/AuthenticationGuard';
import CargaDomicilioView from '../views/CargaDomicilioView';
import { CarritoView } from '../views/CarritoView';
import { ClientMain } from '../views/ClientMain';
import { PreguntasView } from '../views/staticViews/PreguntasView';
import { ProductDetailView } from '../views/ProductDetail';
import { ProductsView } from '../views/ProductsView';
import { TeamView } from '../views/staticViews/TeamView';
import { MP_PostPagoView } from '../views/MP_PostPagoView';
import { PostPagoView } from '../views/PostPagoView';
import { PerfilView } from '../views/PerfilView';

const ClientDinamicRoutes = [
  { path: 'Productos/:categoria', element: '' },
  { path: '/Productos/Detalle/:id', element: <ProductDetailView /> },
  { path: '/Carrito', element: <AuthenticationGuard component={CarritoView} /> },
  { path: '/Domicilio', element: <AuthenticationGuard component={CargaDomicilioView} /> },
  { path: '/MP_PostPayment', element: <AuthenticationGuard component={MP_PostPagoView} /> },
  { path: '/PostPayment', element: <AuthenticationGuard component={PostPagoView} /> },
  { name: '/Perfil', path: '/perfil', element: <AuthenticationGuard component={PerfilView} /> },
];

export const ClientStaticRoutes = [
  { name: 'Inicio', path: '/', element: <ClientMain /> },
  { name: 'Productos', path: '/Productos', element: <ProductsView /> },
  { name: 'Nuestro Equipo', path: '/NuestroEquipo', element: <TeamView /> },
  { name: 'Preguntas', path: '/Preguntas', element: <PreguntasView /> },
];

export default ClientDinamicRoutes;
