import { Base } from '../../API/BaseAPIInterface';

export interface Categoria extends Base {
  denominacion: string | null;
  RubroPadre: Categoria | null;
  idRubroPadre?: number | null;
  subRubros: Categoria[] | null;
}
