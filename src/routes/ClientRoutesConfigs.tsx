import { ClientMain } from '../views/ClientMain';
import { Products } from '../views/Products';

const ClientRoutesConfigs = [
  { path: '/', element: <ClientMain /> },
  { path:'Productos/:categoria'},
  { path: '/Productos', element: <Products />},
  { path: '/Carrito'},
  { path: '/Nosotros'},
  { path: '/Donde-Estamos'}
];

export default ClientRoutesConfigs;
