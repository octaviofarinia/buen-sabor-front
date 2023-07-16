import { HashLoader } from 'react-spinners';
import { notify } from '../../components/Toast/ToastAlert';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faFaceSadCry, faTruck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { PedidoWS } from '../../Interfaces/PedidoWS';
import { Loader } from '../../components/Loader/Loader';
import { Button } from '../../components/Botones/Button';
import { over } from 'stompjs';
import SockJS from 'sockjs-client/dist/sockjs';

import axios from 'axios';
import { backend_url } from '../../Utils/ConstUtils';
export const PedidosView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pedidos, setPedidos] = useState<PedidoWS[]>([]);
  const [conectado, setConectado] = useState<boolean>(false);
  var stompClient: any = null;

  const getPedidos = () => {
    axios
      .get(`http://localhost:8080/api/v1/pedidos/ws`)
      .then((res) => {
        setPedidos(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  };

  const setPedidoState = async (id: number | null, estado: string | null) => {
    await axios
      .put(backend_url + '/cambiar-estado', null, {
        params: {
          id: id,
          estado: estado,
        },
      })
      .then(() => {
        notify('Pedido Completado', 'success');
      })
      .catch(() => {
        notify('Ocurrio un error', 'error');
      });
  };
  useEffect(() => {
    setIsLoading(true);
    if (!conectado) {
      createSocket();
    }
    setIsLoading(false);
  }, []);

  //WEB SOCKET
  const createSocket = () => {
    let Sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setConectado(true);
    getPedidos();
    stompClient.subscribe('/pedidos', onMessageReceived);
  };

  const onMessageReceived = (payload: any) => {
    let payloadData = JSON.parse(payload.body);
    console.log(payloadData);
    getPedidos();
  };

  const onError = (err: any) => {
    console.log(err);
  };

  return (
    <div className=" relative flex w-full flex-1 flex-col gap-5 bg-neutral-50 px-5 pt-5 dark:bg-neutral-800 sm:px-8 md:px-16 ">
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
      </div>

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
                      <th className="px-6 py-4 text-center text-neutral-50"> Pedido Finalizado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pedidos.map((pedido) => (
                      <tr
                        className="border-b border-b-neutral-200 odd:bg-zinc-50 even:bg-neutral-100 hover:bg-neutral-200 dark:border-neutral-500 dark:border-b-neutral-400 dark:bg-neutral-500 dark:text-neutral-50 dark:odd:bg-neutral-600 dark:even:bg-neutral-500 dark:hover:bg-neutral-700"
                        key={pedido.id}
                      >
                        <td className="px-6 py-4">{pedido.id}</td>
                        <td className="px-6 py-4">{pedido.total}</td>
                        <td
                          className={`px-6 py-4 font-bold ${
                            pedido.estado === 'ACTIVO' ? 'text-green-500' : 'text-rose-500'
                          }`}
                        >
                          {pedido.estado}
                        </td>
                        <td className="px-6 py-4">{pedido.fechaAlta}</td>
                        <td className="px-6 py-4">{pedido.fechaModificacion}</td>

                        <td className="px-6 py-4">
                          <div className="m-0 flex h-full items-center justify-center gap-16 p-0">
                            {pedido.estado === 'ACTIVO' ? (
                              <Button
                                type="button"
                                color="verde"
                                content={
                                  <h5 className="flex gap-3">
                                    Confirmar finalizado
                                    <FontAwesomeIcon icon={faXmark} size="lg" />
                                  </h5>
                                }
                                callback={() => {
                                  setPedidoState(pedido.id, 'APROBADO');
                                }}
                              />
                            ) : (
                              <h5 className="text- flex gap-3 md:text-xl">
                                Pedido finalizado
                                <FontAwesomeIcon icon={faCheck} size="lg" />
                              </h5>
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
          <FontAwesomeIcon icon={faFaceSadCry} size="lg" /> Aun no hay ningun pedido registrado.
        </h2>
      )}
    </div>
  );
};
