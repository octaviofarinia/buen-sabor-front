import { Base } from '../../API/BaseAPIInterface';
import { ArticuloInsumo } from '../ABM/ArticuloInsumo';
import { ArticuloManufacturado } from '../ABM/ArticuloManufacturado';

export interface DetallePedido {
  idArticuloManufacturado: number | null | undefined;
  cantidad: number;
}

export interface DetallePedidoComplete extends Base {
  cantidad: number;
  subtotal: number;
  subtotalCosto: number;
  articuloInsumo: ArticuloInsumo | null;
  articuloManufacturado: ArticuloManufacturado | null;
  idPedido: number;
}
