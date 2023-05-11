import { ClientMain } from '../views/ClientMain';

const ClientRoutesConfigs = [
  { path: '/', element: <ClientMain /> },
  { path: '/Inicio', element: <ClientMain />},
  { path:'Productos/:categoria'},
  { path: '/Productos'},
  { path: '/Carrito'},
  { path: '/Nosotros'},
  { path: '/Donde-Estamos'}
];

export default ClientRoutesConfigs;
