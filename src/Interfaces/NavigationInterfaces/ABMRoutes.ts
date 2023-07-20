import { Route } from "./NavigationInterface";

export const routes:Route[] = [
  {
    name: 'Categorias',
    imagen: '/category.png',
    route: 'Categorias',
    type: 'ABM',
  },
  {
    name: 'Ingrediente',
    imagen: '/ingredient.png',
    route: 'Ingrediente',
    type: 'ABM',
  },
  {
    name: 'Productos',
    imagen: '/burgasMain.jpg',
    route: 'Productos',
    type: 'ABM',
  },
  {
    name: 'Unidad De Medida',
    imagen: '/measure.png',
    route: 'UnidadDeMedida',
    type: 'ABM',
  },
  {
    name: 'Pedidos',
    imagen: '/pedido.jpg',
    route: 'Pedidos',
    type: 'Planilla',
  },
  {
    name: 'Facturas',
    imagen: '/facturas.jpg',
    route: 'Facturas',
    type: 'Planilla',
  },
];

export default routes;
