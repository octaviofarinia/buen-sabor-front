import { Categoria } from './Categoria';
import { DetalleProducto } from './DetalleProducto';
import { Ingrediente } from './Ingrediente';
import { Producto } from './Producto';
import { UnidadDeMedida } from './UnidadDeMedida';

export const base_category_object: Categoria = {
  id: null,
  denominacion: null,
  RubroPadre: null,
  idRubroPadre: null,
  subRubros: null,
};

export const base_unidad_object: UnidadDeMedida = {
  id: null,
  denominacion: null,
  abreviatura: null,
};

export const base_detalle_producto_object: DetalleProducto = {
  id: null,
  cantidad: null,
  idArticuloInsumo: null,
  idArticuloManufacturado: null,
};

export const base_product_object: Producto = {
  id: null,
  denominacion: null,
  descripcion: null,
  urlImagen: null,
  precioVenta: null,
  tiempoEstimadoCocina: null,
};

export const base_ingredient_object: Ingrediente = {
  id: null,
  denominacion: null,
  urlImagen: null,
  precioCompra: null,
  precioVenta: null,
  stockActual: null,
  stockMinimo: null,
  unidadMedida: null,
  rubroArticulo: null,
  idUnidadMedida: null,
  idRubroArticulo: null,
};
