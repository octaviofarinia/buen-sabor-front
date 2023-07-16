import { Base } from "../../API/BaseAPIInterface";

export interface Producto extends Base{
  denominacion: string | null;
  descripcion: string | null;
  precioVenta: number | null;
  urlImagen: string | null;
  tiempoEstimadoCocina: number | null;
}
