import { Base } from '../../API/BaseAPIInterface';
import { Pedido } from '../ClientSide/Pedido';

export interface Factura extends Base {
  fechaFacturacion: string;
  mpPaymentId: string | null;
  mpMerchantOrderId: string | null;
  mpPreferenceId: string | null;
  mpPaymentType: string | null;
  formaPago: string;
  totalVenta: number;
  pedido: Pedido;
  numeroFactura: number | null;
  medioDePago: string | null;
  fechaAlta: string;
  fechaModificacion: string | null;
}
