import { Base } from '../../API/BaseAPIInterface';

export interface PedidoPlanilla extends Base {
  total: number | null;
  estado: string | null;
  fechaAlta: string | null;
  fechaModificacion: string | null;
}
