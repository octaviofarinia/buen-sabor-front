import axios from 'axios';
import { PedidoPlanilla } from '../Interfaces/ABM/PedidoPlanilla';
import { backend_url } from './ConstUtils';
import { notify } from '../components/Toast/ToastAlert';
import { ChangeEvent, useEffect, useState } from 'react';
import { useUser } from '../context/UserProvider';
import { employeeRoles } from './constants/UserRoles';

export enum PedidoStatus {
  PAGADO = 'PAGADO',
  COMPLETADO = 'COMPLETADO',
  PENDIENTE_PAGO = 'PENDIENTE_PAGO',
  PREPARACION = 'PREPARACION',
  EN_CAMINO = 'EN_CAMINO',
  CANCELADO = 'CANCELADO',
  NOTA_CREDITO = 'NOTA_CREDITO',
  PENDIENTE_ENVIO = 'PENDIENTE_ENVIO',
}

interface EstadoSelect {
  pedido: PedidoPlanilla | null;
  callback: (e: ChangeEvent<HTMLSelectElement>) => void;
}
export const EstadosSelect = ({ pedido, callback }: EstadoSelect) => {
  const { userRole } = useUser();

  useEffect(() => {}, [userRole]);

  return (
    <select
      className="rounded-md py-2 pr-8 text-xl font-bold text-neutral-900"
      defaultValue={pedido?.estado && pedido !== null ? pedido.estado : 'SELECCIONE'}
      onChange={(e) => callback(e)}
    >
      <option selected className="text-xl font-bold text-green-700" disabled hidden>
        {pedido?.estado && pedido !== null ? pedido.estado : 'SELECCIONE'}
      </option>
      {userRole === employeeRoles.ADMINISTRADOR && (
        <>
          <option className="text-xl font-bold text-green-700" value={PedidoStatus.PAGADO}>
            PAGADO
          </option>
          <option className="text-xl font-bold text-green-700" value={PedidoStatus.COMPLETADO}>
            COMPLETADO
          </option>
          <option className="text-xl font-bold text-green-700" value={PedidoStatus.PENDIENTE_PAGO}>
            PENDIENTE PAGO
          </option>
          <option className="text-xl font-bold text-green-700" value={PedidoStatus.PREPARACION}>
            EN PREPARACION
          </option>
          <option className="text-xl font-bold text-green-700" value={PedidoStatus.EN_CAMINO}>
            EN CAMINO
          </option>
          <option className="text-xl font-bold text-green-700" value={PedidoStatus.CANCELADO}>
            CANCELADO
          </option>
          <option className="text-xl font-bold text-green-700" value={PedidoStatus.NOTA_CREDITO}>
            NOTA DE CRÉDITO
          </option>
        </>
      )}

      {userRole === employeeRoles.COCINERO && (
        <option className="text-xl font-bold text-green-700" value={PedidoStatus.PREPARACION}>
          PREPARACION
        </option>
      )}

      {userRole === employeeRoles.DELIVERY && (
        <>
          <option className="text-xl font-bold text-green-700" value={PedidoStatus.EN_CAMINO}>
            EN_CAMINO
          </option>
          <option className="text-xl font-bold text-green-700" value={PedidoStatus.PENDIENTE_ENVIO}>
            PENDIENTE DE ENVIO
          </option>
        </>
      )}

      {userRole === employeeRoles.CAJERO && (
        <>
          <option className="text-xl font-bold text-green-700" value={PedidoStatus.PAGADO}>
            PAGADO
          </option>
          <option className="text-xl font-bold text-green-700" value={PedidoStatus.COMPLETADO}>
            COMPLETADO
          </option>
          <option className="text-xl font-bold text-green-700" value={PedidoStatus.PENDIENTE_PAGO}>
            PENDIENTE DE PAGO
          </option>
          <option className="text-xl font-bold text-green-700" value={PedidoStatus.PREPARACION}>
            EN PREPARACIÓN
          </option>
          <option className="text-xl font-bold text-green-700" value={PedidoStatus.EN_CAMINO}>
            EN CAMINO
          </option>
        </>
      )}
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
