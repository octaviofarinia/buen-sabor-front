import { Route } from './NavigationInterface';

export const ABMRoutes: Route[] = [
  {
    name: 'Rubro de los Artículos | Categorías',
    imagen: '/category.png',
    route: 'RubroArticulos',
    dropdown: 'Rubro de los Artículos',
    type: 'ABM',
  },
  {
    name: 'Artículos Insumos | Ingredientes',
    imagen: '/ingredient.png',
    route: 'Ingredientes',
    dropdown: 'Artículos Insumos',
    type: 'ABM',
  },
  {
    name: 'Artículos Manufacturados | Productos',
    imagen: '/burgasMain.jpg',
    route: 'Productos',
    dropdown: 'Artículos Manufacturados',
    type: 'ABM',
  },
  {
    name: 'Unidad De Medida',
    imagen: '/measure.png',
    route: 'UnidadDeMedida',
    dropdown: 'Unidades de Medida',
    type: 'ABM',
  },
];

export const PlanillaRoutes: Route[] = [
  {
    name: 'Pedidos',
    imagen: '/pedido.jpg',
    route: 'Pedidos',
    dropdown: 'Pedidos',
    type: 'Planilla',
  },
  {
    name: 'Facturas',
    imagen: '/facturas.jpg',
    route: 'Facturas',
    dropdown: 'Facturas',
    type: 'Planilla',
  },
  {
    name: 'Ranking Productos',
    imagen: '/ranks.jpg',
    route: 'Productos',
    dropdown: 'Ranking Productos',
    type: 'Ranking',
  },
];

export default ABMRoutes;
