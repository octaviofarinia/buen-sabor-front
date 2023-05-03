import { Producto } from './Producto';
import { Ingrediente } from './Ingrediente';
import { UnidadDeMedida } from './UnidadDeMedida';
import { Categoria } from './Categoria';

export const interfaceRouter = ({dataModel}) => {
  switch (dataModel) {
    case "Productos":
      return base_product_object;
    case "Ingredientes":
      return base_ingredient_object;
    case "UnidadDeMedida":
      return base_unidad_object;
    case "Categorias":
      return base_category_object;
    default:
      return null;
  }
};

const base_category_object: Categoria = {
  denominacion: null ?? undefined,
  id_rubro_padre: null ?? undefined,
};
const base_unidad_object: UnidadDeMedida = {
  nombre: null ?? undefined,
  abreviacion: null ?? undefined,
};

const base_product_object: Producto = {
  nombre: null ?? undefined,
};

const base_ingredient_object: Ingrediente = {
  nombre: null ?? undefined,
  unidad_de_medida: null ?? undefined,
};
