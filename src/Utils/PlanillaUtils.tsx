import { PedidoPlanilla } from '../Interfaces/ABM/PedidoPlanilla';
import { ChangeEvent, useEffect } from 'react';
import { useUser } from '../context/UserProvider';
import { employeeRoles } from './Constants/UserRoles';

export enum PedidoStatus {
  PAGADO = 'PAGADO',
  COMPLETADO = 'COMPLETADO',
  PENDIENTE_PAGO = 'PENDIENTE_PAGO',
  PREPARACION = 'PREPARACION',
  EN_CAMINO = 'EN_CAMINO',
  CANCELADO = 'CANCELADO',
  NOTA_CREDITO = 'NOTA_CREDITO',
  PENDIENTE_ENTREGA = 'PENDIENTE_ENTREGA',
}

interface EstadoSelect {
  pedido?: PedidoPlanilla | null;
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
      <option
        disabled
        value={pedido?.estado && pedido !== null ? pedido.estado.toString() : ''}
        hidden
      >
        {pedido?.estado}
      </option>
      {userRole === employeeRoles.ADMINISTRADOR && (
        <>
          <option className="text-xl font-bold text-green-700" value={PedidoStatus.PAGADO}>
            {PedidoStatus.PAGADO}
          </option>
          <option className="text-xl font-bold text-green-400" value={PedidoStatus.COMPLETADO}>
            {PedidoStatus.COMPLETADO}
          </option>
          <option className="text-xl font-bold text-amber-500" value={PedidoStatus.PENDIENTE_PAGO}>
            {PedidoStatus.PENDIENTE_PAGO}
          </option>
          <option className="text-xl font-bold text-violet-700" value={PedidoStatus.PREPARACION}>
            {PedidoStatus.PREPARACION}
          </option>
          <option className="text-xl font-bold text-blue-700" value={PedidoStatus.EN_CAMINO}>
            {PedidoStatus.EN_CAMINO}
          </option>
          <option className="text-xl font-bold text-sky-700" value={PedidoStatus.PENDIENTE_ENTREGA}>
            {PedidoStatus.PENDIENTE_ENTREGA}
          </option>
          <option className="text-xl font-bold text-rose-700" value={PedidoStatus.CANCELADO}>
            {PedidoStatus.CANCELADO}
          </option>
          <option className="text-xl font-bold text-rose-700" value={PedidoStatus.NOTA_CREDITO}>
            {PedidoStatus.NOTA_CREDITO}
          </option>
        </>
      )}

      {userRole === employeeRoles.COCINERO && (
        <>
          <option className="text-xl font-bold text-violet-700" value={PedidoStatus.PREPARACION}>
            {PedidoStatus.PREPARACION}
          </option>
          <option className="text-xl font-bold text-sky-700" value={PedidoStatus.PENDIENTE_ENTREGA}>
            {PedidoStatus.PENDIENTE_ENTREGA}
          </option>
        </>
      )}

      {userRole === employeeRoles.DELIVERY && (
        <>
          <option className="text-xl font-bold text-blue-700" value={PedidoStatus.EN_CAMINO}>
            {PedidoStatus.EN_CAMINO}
          </option>
          <option className="text-xl font-bold text-sky-700" value={PedidoStatus.PENDIENTE_ENTREGA}>
            {PedidoStatus.PENDIENTE_ENTREGA}
          </option>
        </>
      )}

      {userRole === employeeRoles.CAJERO && (
        <>
          <option className="text-xl font-bold text-green-700" value={PedidoStatus.PAGADO}>
            {PedidoStatus.PAGADO}
          </option>
          <option className="text-xl font-bold text-green-700" value={PedidoStatus.PREPARACION}>
            {PedidoStatus.PREPARACION}
          </option>
        </>
      )}
    </select>
  );
};

export const EstadosSelectFiltro = ({  callback }: EstadoSelect) => {
  const { userRole } = useUser();

  useEffect(() => {}, [userRole]);

  return (
    <select
      className="rounded-md py-2 pr-8 text-xl font-bold text-neutral-900"
      onChange={(e) => callback(e)} id="selectFiltro"
    >
      <option selected hidden>
        {'Seleccione'}
      </option>
      {userRole === employeeRoles.ADMINISTRADOR && (
        <>
          <option className="text-xl font-bold text-green-700" value={PedidoStatus.PAGADO}>
            PAGADO
          </option>
          <option className="text-xl font-bold text-green-700" value={PedidoStatus.COMPLETADO}>
            COMPLETADO
          </option>
          <option className="text-xl font-bold text-amber-500" value={PedidoStatus.PENDIENTE_PAGO}>
            PENDIENTE PAGO
          </option>
          <option className="text-xl font-bold text-violet-700" value={PedidoStatus.PREPARACION}>
            EN PREPARACION
          </option>
          <option className="text-xl font-bold text-blue-700" value={PedidoStatus.EN_CAMINO}>
            EN CAMINO
          </option>
          <option className="text-xl font-bold text-rose-700" value={PedidoStatus.CANCELADO}>
            CANCELADO
          </option>
          <option className="text-xl font-bold text-rose-700" value={PedidoStatus.NOTA_CREDITO}>
            NOTA DE CRÉDITO
          </option>
        </>
      )}

      {userRole === employeeRoles.COCINERO && (
        <>
          <option className="text-xl font-bold text-green-700" value={PedidoStatus.PREPARACION}>
            PREPARACION
          </option>
          <option className="text-xl font-bold text-green-700" value={PedidoStatus.PAGADO}>
            PAGADO
          </option>
          <option className="text-xl font-bold text-amber-500" value={PedidoStatus.PENDIENTE_PAGO}>
            PENDIENTE PAGO
          </option>
        </>
      )}

      {userRole === employeeRoles.DELIVERY && (
        <>
          <option className="text-xl font-bold text-blue-700" value={PedidoStatus.EN_CAMINO}>
            EN_CAMINO
          </option>
        </>
      )}

      {userRole === employeeRoles.CAJERO && (
        <>
          <option className="text-xl font-bold text-green-700" value={PedidoStatus.PAGADO}>
            {PedidoStatus.PAGADO}
          </option>
          <option className="text-xl font-bold text-amber-500" value={PedidoStatus.PENDIENTE_PAGO}>
            {PedidoStatus.PENDIENTE_PAGO}
          </option>
          <option
            className="text-xl font-bold text-amber-500"
            value={PedidoStatus.PENDIENTE_ENTREGA}
          >
            {PedidoStatus.PENDIENTE_ENTREGA}
          </option>
        </>
      )}
    </select>
  );
};
export function getTextColorByPedidoStatus(status: string | null) {
  switch (status) {
    case PedidoStatus.PAGADO:
      return 'text-green-700';
    case PedidoStatus.COMPLETADO:
      return 'text-green-400';
    case PedidoStatus.PENDIENTE_PAGO:
      return 'text-amber-500';
    case PedidoStatus.PREPARACION:
      return 'text-violet-700';
    case PedidoStatus.EN_CAMINO:
      return 'text-blue-700';
    case PedidoStatus.PENDIENTE_ENTREGA:
      return 'text-sky-700';
    case PedidoStatus.CANCELADO:
      return 'text-rose-700';
    case PedidoStatus.NOTA_CREDITO:
      return 'text-rose-700';
    default:
      return ''; // Opcional: devolver un valor predeterminado o vacío si el estado no coincide con ninguna opción.
  }
}
