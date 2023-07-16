import CartConstants from '../../Utils/Constants/CartConstants';
import { Carrito } from '../Carrito';
import { Domicilio } from '../Domicilio';
import { Pedido } from '../Pedido';
import { Categoria } from './Categoria';
import { DetalleProducto } from './DetalleProducto';
import { Ingrediente } from './Ingrediente';
import { Producto } from './Producto';
import { UnidadDeMedida } from './UnidadDeMedida';

export const base_category: Categoria = {
  id: null,
  denominacion: null,
  RubroPadre: null,
  idRubroPadre: null,
  subRubros: null,
};

export const base_unidad: UnidadDeMedida = {
  id: null,
  denominacion: null,
  abreviatura: null,
};

export const base_detalle_producto: DetalleProducto = {
  id: null,
  cantidad: null,
  idArticuloInsumo: null,
  idArticuloManufacturado: null,
};

export const base_product: Producto = {
  id: null,
  denominacion: null,
  descripcion: null,
  urlImagen: null,
  precioVenta: null,
  tiempoEstimadoCocina: null,
};

export const base_ingredient: Ingrediente = {
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

export const base_domicilio: Domicilio = {
  id: null,
  calle: null,
  numero: null,
  localidad: null,
  codigoPostal: null,
};
export const base_pedido: Pedido = {
  total: 0,
  tipoEnvio: CartConstants.RETIRO_EN_LOCAL,
  medioDePago:CartConstants.EFECTIVO,
  auth0Id: undefined,
  tiempoEstimadoFinalizacion: 0,
  productos: null,
};
