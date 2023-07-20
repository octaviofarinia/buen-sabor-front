import { Base } from '../../API/BaseAPIInterface';
import { RubroArticulo } from './RubroArticulo';
import { UnidadDeMedida } from './UnidadDeMedida';

export interface ArticuloInsumo extends Base {
  denominacion: string | null;
  urlImagen: string | null;
  precioCompra: number | null;
  stockActual: number | null;
  stockMinimo: number | null;
  idUnidadMedida?: number | null;
  idRubroArticulo?: number | null;
  unidadMedida?: UnidadDeMedida | null;
  rubroArticulo?: RubroArticulo | null;
}
