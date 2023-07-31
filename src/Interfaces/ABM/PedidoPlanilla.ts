import { Base } from '../../API/BaseAPIInterface';
import { Cliente } from '../ClientSide/Cliente';
import { Domicilio } from '../ClientSide/Domicilio';

export interface PedidoPlanilla extends Base {
  total: number | null;
  estado: string | null;
  fechaAlta: string | null;
  fechaModificacion: string | null;
  horaEstimadaFinalizacion: string | null;
  totalCosto: number | null;
  tipoEnvio: string | null;
  formaPago: string | null;
  domicilioEntrega?: Domicilio;
  cliente: Cliente;
}
