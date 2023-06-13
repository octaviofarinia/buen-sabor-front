import { ClientMain } from '../views/ClientMain';
import { ProductDetailView } from '../views/ProductDetail';
import { Products } from '../views/Products';

const ClientDinamicRoutes = [
  { path: 'Productos/:categoria', element: '' },
  { path: '/Productos/Detalle/:id', element: <ProductDetailView /> },
];

export const ClientStaticRoutes = [
  { name: 'Inicio', path: '/', element: <ClientMain /> },
  { name: 'Productos', path: '/Productos', element: <Products /> },
  { name: 'Carrito', path: '/Carrito' },
  { name: 'Nosotros', path: '/Nosotros' },
  { name: 'Donde Estamos', path: '/Donde-Estamos' },
];

export default ClientDinamicRoutes;
