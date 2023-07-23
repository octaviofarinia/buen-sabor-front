import { ToastAlert, notify } from '../../components/Toast/ToastAlert';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faFaceSadCry,
  faTruck,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { PedidoPlanilla } from '../../Interfaces/ABM/PedidoPlanilla';
import { Loader } from '../../components/Loader/Loader';
import { Button } from '../../components/Botones/Button';
import { over } from 'stompjs';
import SockJS from 'sockjs-client/dist/sockjs';
import { EstadosSelect, EstadosSelectFiltro, PedidoStatus, setEstadoDePedido } from '../../Utils/PlanillaUtils';
import { backend_url } from '../../Utils/ConstUtils';
import { anularPedido, getPedidos } from '../../API/Requests/PlanillaRequests/PedidoRequests';
import { useUser } from '../../context/UserProvider';
import { employeeRoles } from '../../Utils/Constants/UserRoles';

export const PedidosView = () => {
  const { userRole } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [pedidos, setPedidos] = useState<PedidoPlanilla[]>([]);
  const [conectado, setConectado] = useState<boolean>(false);
  const [estadoPedidos, setEstadoPedidos] = useState<string>('');
  
  var stompClient: any = null;

  const setDataByRole = async () => {
    setIsLoading(true);
    switch (userRole) {
      case employeeRoles.ADMINISTRADOR:
        const data = await getPedidos(null);
        setPedidos(data);
        break;
      case employeeRoles.CAJERO:
        const pagadosCajero = await getPedidos(PedidoStatus.PAGADO);
        const pendientesPagoCajero = await getPedidos(PedidoStatus.PENDIENTE_PAGO);
        setPedidos([...pagadosCajero, ...pendientesPagoCajero]);
        break;
      case employeeRoles.COCINERO:
        const pagados = await getPedidos(PedidoStatus.PAGADO);
        const pendientesCocinero = await getPedidos(PedidoStatus.PENDIENTE_PAGO);
        const preparacion = await getPedidos(PedidoStatus.PREPARACION);
        setPedidos([...pagados, ...pendientesCocinero, ...preparacion]);
        break;
      case employeeRoles.DELIVERY:
        const pendienteEnvio = await getPedidos(PedidoStatus.PENDIENTE_ENVIO);
        const en_camino = await getPedidos(PedidoStatus.EN_CAMINO);
        setPedidos([...en_camino, ...pendienteEnvio]);
        break;
      default:
        notify('Rol no permitido', 'error');
        break;
    }
    setIsLoading(false);
  };

  const getFiltered = async (estado: string) => {
    const data = await getPedidos(estado);
    setPedidos(data);
  };
  useEffect(() => {
    if (!conectado) {
      createSocket();
    }
  }, []);

  //WEB SOCKET
  const createSocket = () => {
    let Sock = new SockJS(`${backend_url}/ws`);
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setConectado(true);
    setDataByRole();
    stompClient.subscribe('/pedidos', onMessageReceived);
  };

  const onMessageReceived = (payload: any) => {
    let payloadData = JSON.parse(payload.body);
    console.log(payloadData);
    setDataByRole();
  };

  const onError = (err: any) => {
    console.log(err);
  };

  return (
    <div className=" relative flex w-full flex-1 flex-col gap-5 bg-neutral-100 px-5 pt-5 dark:bg-neutral-800 sm:px-8 md:px-16 ">
      {isLoading && (
        <Loader
          texto="Cargando los pedidos..."
          closeLoading={setIsLoading}
          showCloseLoading={true}
        />
      )}
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-3 text-3xl font-extrabold uppercase text-black dark:text-neutral-50">
          <FontAwesomeIcon icon={faTruck} />
          Pedidos
        </h1>
        <div className="flex gap-5">
          <label className="flex items-center gap-5 text-xl">
            Filtrar:
            <EstadosSelectFiltro
              pedido={null}
              callback={(e) => {
                getFiltered(e.target.value);
              }}
            />
          </label>

          <Button
            type="button"
            content={'Mostrar todos'}
            color="negro"
            textSize="text-xl"
            callback={() => {
              setDataByRole();
              setEstadoPedidos('');
            }}
          />
        </div>
      </div>
      <ToastAlert />
      {pedidos.length != 0 ? (
        <div className=" mb-6 flex flex-col gap-y-1 overflow-hidden rounded-lg bg-neutral-900 shadow-2xl dark:shadow-neutral-800">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full table-fixed bg-neutral-900 text-left text-sm font-light">
                  <thead className="font-medium uppercase">
                    <tr className="border-b-4 border-b-neutral-500 bg-neutral-900  dark:border-b-white ">
                      <th className="px-6 py-4 text-neutral-50">ID</th>
                      <th className="px-6 py-4 text-neutral-50">Total</th>
                      <th className="px-6 py-4 text-neutral-50">Estado</th>
                      <th className="px-6 py-4 text-neutral-50">Fecha de Alta</th>
                      <th className="px-6 py-4 text-neutral-50">Fecha de Modificación</th>
                      {[
                        employeeRoles.ADMINISTRADOR,
                        employeeRoles.CAJERO,
                        employeeRoles.DELIVERY,
                      ].includes(userRole) && (
                        <th className="px-6 py-4 text-center text-neutral-50">
                          {' '}
                          Pedido Finalizado
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {pedidos.map((pedido) => (
                      <tr
                        className="border-b border-b-neutral-200 odd:bg-neutral-100 even:bg-neutral-100 hover:bg-neutral-200 dark:border-neutral-500 dark:border-b-neutral-400 dark:bg-neutral-500 dark:text-neutral-50 dark:odd:bg-neutral-600 dark:even:bg-neutral-500 dark:hover:bg-neutral-700"
                        key={pedido.id}
                      >
                        <td className="px-6 py-4">{pedido.id}</td>
                        <td className="px-6 py-4">{pedido.total}</td>
                        <td className="px-6 py-4">
                          {pedido.estado !== PedidoStatus.COMPLETADO &&
                          pedido.estado !== PedidoStatus.NOTA_CREDITO &&
                          pedido.estado !== PedidoStatus.CANCELADO ? (
                            <div className="flex gap-5">
                              <EstadosSelect
                                pedido={pedido}
                                callback={(e) => {
                                  setEstadoDePedido(e.target.value, pedido.id);
                                }}
                              />
                            </div>
                          ) : (
                            <h2 className="flex gap-3 py-2 pr-8 text-xl font-bold">
                              {pedido.estado === PedidoStatus.COMPLETADO ? (
                                <FontAwesomeIcon icon={faCheck} size="lg" />
                              ) : (
                                <FontAwesomeIcon icon={faXmark} size="lg" />
                              )}
                              {pedido.estado}
                            </h2>
                          )}
                        </td>

                        <td className="px-6 py-4">{pedido.fechaAlta}</td>
                        <td className="px-6 py-4">{pedido.fechaModificacion}</td>

                        <td className="px-6 py-4">
                          <div className="m-0 flex h-full items-center justify-center gap-16 p-0">
                            {userRole === employeeRoles.DELIVERY && (
                              <>
                                <Button
                                  type="button"
                                  color="verde"
                                  content={
                                    <p className="flex gap-3">
                                      Confirmar finalizado
                                      <FontAwesomeIcon icon={faXmark} size="lg" />
                                    </p>
                                  }
                                  callback={() => {
                                    setEstadoDePedido(PedidoStatus.COMPLETADO, pedido.id);
                                  }}
                                />
                              </>
                            )}
                            {[employeeRoles.ADMINISTRADOR, employeeRoles.CAJERO].includes(
                              userRole
                            ) && (
                              <>
                                {pedido.estado !== PedidoStatus.COMPLETADO &&
                                pedido.estado !== PedidoStatus.NOTA_CREDITO &&
                                pedido.estado !== PedidoStatus.CANCELADO ? (
                                  <>
                                    <Button
                                      type="button"
                                      color="verde"
                                      content={
                                        <p className="flex gap-3">
                                          Confirmar finalizado
                                          <FontAwesomeIcon icon={faXmark} size="lg" />
                                        </p>
                                      }
                                      callback={() => {
                                        setEstadoDePedido(PedidoStatus.COMPLETADO, pedido.id);
                                      }}
                                    />
                                    <Button
                                      type="button"
                                      color="rojo"
                                      content={
                                        <p className="flex gap-3">
                                          Anular pedido
                                          <FontAwesomeIcon icon={faXmark} size="lg" />
                                        </p>
                                      }
                                      callback={() => {
                                        anularPedido(pedido.id);
                                      }}
                                    />
                                  </>
                                ) : (
                                  <h5 className="text- flex gap-3 md:text-xl">
                                    Pedido {pedido.estado}
                                    {pedido.estado === PedidoStatus.COMPLETADO ? (
                                      <FontAwesomeIcon icon={faCheck} size="lg" />
                                    ) : (
                                      <FontAwesomeIcon icon={faXmark} size="lg" />
                                    )}
                                  </h5>
                                )}
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2
          className="my-6 rounded-md bg-rose-700 p-2 text-center font-semibold text-zinc-100
    shadow-lg"
        >
          <FontAwesomeIcon icon={faFaceSadCry} size="lg" /> Lo siento! No hay información disponible 
        </h2>
      )}
    </div>
  );
};
