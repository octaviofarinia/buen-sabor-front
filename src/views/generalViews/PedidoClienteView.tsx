import { useEffect, useState } from 'react';
import { PedidoPlanilla } from '../../Interfaces/ABM/PedidoPlanilla';
import { ToastAlert, notify } from '../../components/Toast/ToastAlert';
import { Button } from '../../components/Botones/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { getPedidosByUser } from '../../API/Requests/PlanillaRequests/PedidoRequests';
import { Loader } from '../../components/Loader/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faTableList } from '@fortawesome/free-solid-svg-icons';
import { PedidoStatus, getTextColorByPedidoStatus } from '../../Utils/PlanillaUtils';
import CartConstants from '../../Utils/Constants/CartConstants';

export const PedidoClienteView = () => {
  const [pedidos, setPedidos] = useState<PedidoPlanilla[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { user, getAccessTokenSilently } = useAuth0();
  const getPedidosFromUser = async () => {
    if (user?.sub != undefined) {
      await getAccessTokenSilently()
        .then(async (accessToken) => {
          const response = await getPedidosByUser(user.sub!, accessToken);
          console.log(response);
          setPedidos(response);
          setLoading(false);
        })
        .catch((err) => {
          const error = err as Error;
          notify(error.message, 'error');
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    getPedidosFromUser();
  }, [user]);
  return (
    <div className=" relative flex w-full flex-1 flex-col gap-5 bg-neutral-100 px-5 pt-5 dark:bg-neutral-800 sm:px-8 md:px-16 ">
      {isLoading ? (
        <Loader texto="Cargando los pedidos..." closeLoading={setLoading} showCloseLoading={true} />
      ) : (
        <div className="flex-col">
          <h1 className="flex items-center gap-3 text-3xl font-extrabold uppercase text-black dark:text-neutral-50">
            <FontAwesomeIcon icon={faTableList} />
            Tus Pedidos
          </h1>
          {pedidos.length !== 0 ? (
            <section className="body-font rounded-lg bg-neutral-100  text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100 ">
              <div className=" my-6 flex flex-col  overflow-hidden rounded-lg bg-neutral-100 shadow-2xl dark:bg-neutral-900 dark:shadow-neutral-900">
                <div className="overflow-x-auto ">
                  <div className="inline-block min-w-full">
                    <div className="overflow-hidden">
                      <table className="min-w-full table-fixed text-left text-sm font-light">
                        <thead className="font-medium uppercase">
                          <tr className="border-b-4 border-b-neutral-300 text-neutral-900 dark:border-b-neutral-600  dark:text-neutral-100">
                            <th className="px-6 py-4">Estado</th>
                            <th className="px-6 py-4">Fecha de Inicio del Pedido</th>
                            <th className="px-6 py-4">Fecha de Modificacion del Pedido</th>
                            <th className="px-6 py-4">Tipo de Envío</th>
                            <th className="px-6 py-4">Forma de Pago</th>
                            <th className="px-6 py-4">Hora Estimada Finalización</th>
                            <th className="px-6 py-4">Monto Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pedidos
                            .sort(
                              (a, b) =>
                                new Date(b.fechaAlta!.replace(' ', 'T')).getTime() -
                                new Date(a.fechaAlta!.replace(' ', 'T')).getTime()
                            )
                            .map((pedido, index) => (
                              <tr
                                className="border-b border-b-neutral-200 transition-colors duration-100 ease-linear
                         odd:bg-neutral-100 even:bg-neutral-100 hover:bg-sky-100 dark:border-neutral-500 dark:border-b-neutral-700
                           dark:bg-neutral-800 dark:text-white  dark:hover:bg-sky-600"
                                key={pedido.id}
                              >
                                <td
                                  className={`px-6 py-4 ${getTextColorByPedidoStatus(
                                    pedido.estado
                                  )} font-bold`}
                                >
                                  {pedido.estado}
                                </td>
                                <td className="px-6 py-4">{pedido.fechaAlta}</td>
                                <td className="px-6 py-4">{pedido.fechaModificacion}</td>
                                <td
                                  className={`px-6 py-4 ${
                                    pedido.tipoEnvio === CartConstants.DELIVERY
                                      ? 'text-rose-500'
                                      : 'text-amber-500'
                                  } font-semibold `}
                                >
                                  {pedido.tipoEnvio}
                                </td>
                                <td
                                  className={`px-6 py-4 ${
                                    pedido.formaPago === 'EFECTIVO'
                                      ? 'text-green-500'
                                      : 'text-blue-500'
                                  } font-semibold `}
                                >
                                  {pedido.formaPago}
                                </td>
                                <td className="px-6 py-4">{pedido.horaEstimadaFinalizacion}</td>
                                <td className="px-6 py-4 font-bold text-green-500">
                                  $ {pedido.total}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <div className="flex justify-center gap-4 py-5 px-5">
              <ToastAlert />
              <h2 className="flex-auto rounded-md bg-rose-500 p-8 text-center text-4xl text-neutral-100">
                Ups! No hay pedidos asociados a tu usuario en el sistema. Si hay algún inconveniente
                con esto. ¡No dudes en llamarnos!
              </h2>
              <Button
                content="Volver al inicio"
                callback={() => navigate('/')}
                textSize="text-2xl xl:text-4xl"
                type="button"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
