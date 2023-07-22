import CartConstants from '../../Utils/constants/CartConstants';
import { Domicilio } from '../ClientSide/Domicilio';
import { Pedido } from '../ClientSide/Pedido';
import { RubroArticulo } from './RubroArticulo';
import { DetalleProducto } from './DetalleProducto';
import { ArticuloInsumo } from './ArticuloInsumo';
import { ArticuloManufacturado } from './ArticuloManufacturado';
import { UnidadDeMedida } from './UnidadDeMedida';

export const base_category: RubroArticulo = {
  denominacion: null,
  rubroPadre: null,
  idRubroPadre: null,
  subRubros: null,
};

export const base_unidad: UnidadDeMedida = {
  denominacion: null,
  abreviatura: null,
};

export const base_detalle_producto: DetalleProducto = {
  cantidad: null,
  idArticuloInsumo: null,
  idArticuloManufacturado: null,
};

export const base_product: ArticuloManufacturado = {
  denominacion: null,
  descripcion: null,
  urlImagen: null,
  precioVenta: null,
  tiempoEstimadoCocina: null,
};

export const base_ingredient: ArticuloInsumo = {
  denominacion: null,
  urlImagen: null,
  precioCompra: null,
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
  id: null,
  total: 0,
  tipoEnvio: CartConstants.RETIRO_EN_LOCAL,
  idDomicilioEntrega:0,
  auth0Id: undefined,
  tiempoEstimadoFinalizacion: 0,
  productos: null,
};
