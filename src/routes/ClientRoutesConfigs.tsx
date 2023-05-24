import { ClientMain } from '../views/ClientMain';
import { Products } from '../views/Products';

const ClientDinamicRoutes = [{ path: 'Productos/:categoria', element: '' }];

export const ClientStaticRoutes = [
  { name: 'Inicio', path: '/', element: <ClientMain /> },
  { name: 'Productos', path: '/Productos', element: <Products /> },
  { name: 'Carrito', path: '/Carrito' },
  { name: 'Nosotros', path: '/Nosotros' },
  { name: 'Donde Estamos', path: '/Donde-Estamos' },
];

export default ClientDinamicRoutes;
