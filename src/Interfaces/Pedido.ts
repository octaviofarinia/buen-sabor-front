import { DetallePedido } from './DetallePedido';

export interface Pedido {
  id: number | null;
  total: number;
  mpStatus?: string | null;
  tipoEnvio: string | null;
  factura?: Factura | null;
  idDomicilioEntrega: null | number;
  auth0Id: string | undefined;
  tiempoEstimadoFinalizacion: number;
  productos: DetallePedido[] | null;
  validated?: boolean;
}

export interface Factura {
  mpPaymentId: number | null;
  mpMerchantOrderId: number | null;
  mpPreferenceId: string | null;
  mpPaymentType: string | null;
  formaPago: string | null;
}
