import axios from 'axios';
import { PedidoPlanilla } from '../Interfaces/ABM/PedidoPlanilla';
import { backend_url } from './ConstUtils';
import { notify } from '../components/Toast/ToastAlert';
import { ChangeEvent } from 'react';

export enum PedidoStatus {
  PAGADO = 'PAGADO',
  COMPLETADO = 'COMPLETADO',
  PENDIENTE_PAGO = 'PENDIENTE_PAGO',
  PREPARACION = 'PREPARACION',
  EN_CAMINO = 'EN_CAMINO',
  CANCELADO = 'CANCELADO',
  RECHAZADO = 'RECHAZADO',
}

interface EstadoSelect {
  pedido: PedidoPlanilla | null;
  callback: (e: ChangeEvent<HTMLSelectElement>) => void;
}
export const EstadosSelect = ({ pedido, callback }: EstadoSelect) => {
  return (
    <select
      className="rounded-md  py-2 pr-8 text-xl font-bold text-neutral-900"
      defaultValue={pedido?.estado && pedido !== null ? pedido.estado : 'SELECCIONE'}
      onChange={(e) => callback(e)}
    >
      {pedido === null && (
        <option selected className="text-xl font-bold text-neutral-900">
          SELECCIONE
        </option>
      )}
      {pedido === null && (
        <option className="text-xl font-bold text-green-700" value={PedidoStatus.COMPLETADO}>
          {PedidoStatus.COMPLETADO}
        </option>
      )}
      <option className="text-xl font-bold text-green-700" value={PedidoStatus.PAGADO}>
        {PedidoStatus.PAGADO}
      </option>

      <option className="text-xl font-bold text-amber-700" value={PedidoStatus.PENDIENTE_PAGO}>
        {PedidoStatus.PENDIENTE_PAGO}
      </option>
      <option className="text-xl font-bold text-amber-500" value={PedidoStatus.PREPARACION}>
        {PedidoStatus.PREPARACION}
      </option>
      <option className="text-xl font-bold text-blue-500" value={PedidoStatus.EN_CAMINO}>
        {PedidoStatus.EN_CAMINO}
      </option>
      <option className="text-xl font-bold text-rose-700" value={PedidoStatus.RECHAZADO}>
        {PedidoStatus.RECHAZADO}
      </option>
    </select>
  );
};

export const setEstadoDePedido = async (estado: string | null, id?: number) => {
  await axios
    .put(backend_url + '/pedidos/cambiar-estado', null, {
      params: {
        id: id,
        estado: estado,
      },
    })
    .then(() => {
      notify('Se cambio el estado a: ' + estado, 'success');
    })
    .catch(() => {
      notify('Ocurrio un error', 'error');
    });
};
