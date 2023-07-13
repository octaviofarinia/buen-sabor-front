import { DetallePedido } from './DetallePedido';

export interface Pedido {
  total: number;
  mpStatus?: string | null;
  tipoEnvio: string | null;
  medioDePago: string | null;
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
}
