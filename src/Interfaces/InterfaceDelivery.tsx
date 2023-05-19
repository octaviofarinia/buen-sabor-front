import { Categoria } from './Categoria';
import { Ingrediente } from './Ingrediente';
import { Producto } from './Producto';
import { UnidadDeMedida } from './UnidadDeMedida';

export const base_category_object: Categoria = {
  id: '',
  denominacion: null,
  idRubroPadre: null,
};

export const base_unidad_object: UnidadDeMedida = {
  id: '',
  denominacion: null ?? undefined,
  abreviatura: null ?? undefined,
};

export const base_product_object: Producto = {
  id: '',
  nombre: null ?? undefined,
  imgRoute: null ?? undefined,
  precio: null ?? undefined,
};

export const base_ingredient_object: Ingrediente = {
  id: '',
  nombre: null ?? undefined,
  unidad_de_medida: null ?? undefined,
};
