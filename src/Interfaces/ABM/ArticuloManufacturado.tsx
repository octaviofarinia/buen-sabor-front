import { Base } from '../../API/BaseAPIInterface';

export interface ArticuloManufacturado extends Base {
  denominacion: string | null;
  descripcion: string | null;
  precioVenta: number | null;
  urlImagen: string | null;
  tiempoEstimadoCocina: number | null;
}
