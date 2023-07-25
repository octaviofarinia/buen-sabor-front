import { Base } from '../../API/BaseAPIInterface';

export interface UnidadDeMedida extends Base {
  denominacion: string | null;
  abreviatura: string | null;
}
