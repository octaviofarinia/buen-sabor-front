import { DetallePedido } from './DetallePedido';

export interface Pedido {
  id: number | null;
  total: number;
  mpStatus?: string | null;
  tipoEnvio: string | null;
  factura?: MPfactura | null;
  idDomicilioEntrega: null | number;
  auth0Id: string | undefined;
  tiempoEstimadoFinalizacion: number;
  productos: DetallePedido[] | null;
}

export interface MPfactura {
  mpPaymentId: number | null;
  mpMerchantOrderId: number | null;
  mpPreferenceId: string | null;
  mpPaymentType: string | null;
  formaPago: string | null;
}
