import { Base } from '../../API/BaseAPIInterface';

export interface RubroArticulo extends Base {
  denominacion: string | null;
  rubroPadre: RubroArticulo | null;
  idRubroPadre?: number | null;
  subRubros: RubroArticulo[] | null;
}
