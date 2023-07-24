import { Base } from '../../API/BaseAPIInterface';
import { ArticuloInsumo } from './ArticuloInsumo';
import { ArticuloManufacturado } from './ArticuloManufacturado';
import { UnidadDeMedida } from './UnidadDeMedida';

export interface DetalleProducto extends Base {
  cantidad: number | null;
  idArticuloInsumo?: number | null;
  idArticuloManufacturado?: number | null;
  denominacion?: string | null;
  articuloManufacturado?: ArticuloManufacturado | null;
  articuloInsumo?: ArticuloInsumo | null;
  unidadMedida?: UnidadDeMedida|null;

}
