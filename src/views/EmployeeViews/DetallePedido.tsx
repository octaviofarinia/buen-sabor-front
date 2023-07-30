import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastAlert, notify } from '../../components/Toast/ToastAlert';
import { Loader } from '../../components/Loader/Loader';
import { Button } from '../../components/Botones/Button';
import { getPedido } from '../../API/Requests/PlanillaRequests/PedidoRequests';
import { DetallePedidoComplete } from '../../Interfaces/ClientSide/DetallePedido';
import { AxiosError } from 'axios';
import { getDetalles } from '../../API/Requests/ProductoRequests/DetalleProductoRequests';
import { DetalleProducto } from '../../Interfaces/ABM/DetalleProducto';
import { useAuth0 } from '@auth0/auth0-react';
import { getOne } from '../../API/Requests/BaseRequests';
import { PedidoPlanilla } from '../../Interfaces/ABM/PedidoPlanilla';
import { useUser } from '../../context/UserProvider';
import { employeeRoles } from '../../Utils/Constants/UserRoles';
import CartConstants from '../../Utils/Constants/CartConstants';

export const DetallePedidoView = () => {
  const { id } = useParams();
  const [detallePedido, setDetallePedido] = useState<DetallePedidoComplete[]>([]);
  const [detallesProducto, setDetalleProducto] = useState<DetalleProducto[][]>([[], []]);
  const [pedidos, setPedidos] = useState<PedidoPlanilla[]>([]);
  const [loading, setLoading] = useState(true);
  const { userRole } = useUser();
  const { getAccessTokenSilently } = useAuth0();
  const getRegisterData = async () => {
    getAccessTokenSilently()
      .then(async (accessToken) => {
        const response = await getPedido(accessToken, Number(id));
        setDetallePedido(response);
        if (detallePedido.length > 0) {
          notify('Se cargó el registro', 'success');
        }
      })
      .catch((err) => {
        const axiosErr = err as AxiosError;
        notify('Ocurrió un error: ' + axiosErr.response?.status, 'error');
      });

    setLoading(false);
  };

  const getArticulosInsumos = async () => {
    getAccessTokenSilently()
      .then(async (accessToken) => {
        const promises = detallePedido.map(async (detalle) => {
          const response = await getDetalles({
            id: Number(detalle.articuloManufacturado?.id),
            token: accessToken,
          });
          return response;
        });
        const resultados = await Promise.all(promises);
        setDetalleProducto(resultados);
      })
      .catch((err) => {
        const axiosErr = err as AxiosError;
        notify('Ocurrió un error: ' + axiosErr.response?.status, 'error');
      });

    setLoading(false);
  };
  const getPedidoPlanilla = async () => {
    getAccessTokenSilently()
      .then(async (accessToken) => {
        const promises = detallePedido.map(async (detalle) => {
          const response = await getOne({
            id: Number(detalle.idPedido),
            endpoint: 'pedidos',
            token: accessToken,
          });
          return response;
        });
        const resultados = await Promise.all(promises);

        setPedidos(resultados);
      })
      .catch((err) => {
        const axiosErr = err as AxiosError;
        notify('Ocurrió un error: ' + axiosErr.response?.status, 'error');
      });

    setLoading(false);
  };
  useEffect(() => {
    getRegisterData();
    if (detallePedido.length > 0) {
      getArticulosInsumos();
      getPedidoPlanilla();
    }
  }, [detallePedido.length]);

  return (
    <div className="flex bg-neutral-100 px-5 lg:px-24">
      {loading ? (
        <Loader texto="Cargando registros" closeLoading={setLoading} />
      ) : (
        <>
          <div className="flex w-full flex-col items-end">
            <Link to={`/employee/Planilla/Pedidos`} className="">
              <Button content="Volver a pedidos" color="amarillo" type="button" />
            </Link>
            <div className=" mx-auto grid grid-cols-1 gap-5 gap-y-3 px-2 md:grid-cols-2  xl:grid-cols-3">
              {detallePedido.map((detalle, index) => (
                <div
                  key={detalle.id}
                  className="mx-auto my-10  w-full max-w-4xl rounded-lg border-b-4 border-l-4 border-neutral-300  bg-neutral-100 p-5 py-3 px-4 text-xl shadow-lg dark:bg-neutral-800 md:text-2xl lg:py-8"
                >
                  <div className="flex w-full items-center justify-between pb-4">
                    <h1 className="mb-3 flex flex-col items-start justify-between font-bold  text-neutral-900 dark:text-white md:text-4xl">
                      Detalle del pedido {detalle.idPedido}
                      <span className="text-start text-xl text-amber-400 ">Detalle</span>
                    </h1>
                  </div>
                  <div className="flex flex-col gap-5 px-5">
                    <>
                      <h5 className="border-1  mb-2 flex flex-wrap justify-between  gap-4 rounded-lg rounded-l-xl border-b-2 border-l-2 border-neutral-300  py-5 px-5  font-semibold leading-none text-neutral-500  shadow-md dark:border-amber-400 dark:bg-neutral-700 dark:text-neutral-500  ">
                        <span className="text-neutral-900 dark:text-white ">Denominación</span>
                        {detalle.articuloManufacturado?.denominacion}
                      </h5>

                      <h5 className="border-1  mb-2 flex flex-wrap justify-between  gap-4 rounded-lg rounded-l-xl border-b-2 border-l-2 border-neutral-300  py-5 px-5  font-semibold leading-none text-neutral-500  shadow-md dark:border-amber-400 dark:bg-neutral-700 dark:text-neutral-500  ">
                        <span className="text-neutral-900 dark:text-white ">Cantidad</span>
                        {detalle.cantidad}
                      </h5>
                      <h5 className="border-1  mb-2 flex flex-wrap justify-between  gap-4 rounded-lg rounded-l-xl border-b-2 border-l-2 border-neutral-300  py-5 px-5  font-semibold leading-none text-neutral-500  shadow-md dark:border-amber-400 dark:bg-neutral-700 dark:text-neutral-500  ">
                        <span className="text-neutral-900 dark:text-white ">Cliente</span>
                        {pedidos[index]?.cliente.usuario.username}
                      </h5>
                      <h5 className="border-1  mb-2 flex flex-wrap justify-between  gap-4 rounded-lg rounded-l-xl border-b-2 border-l-2 border-neutral-300  py-5 px-5  font-semibold leading-none text-neutral-500  shadow-md dark:border-amber-400 dark:bg-neutral-700 dark:text-neutral-500  ">
                        <span className="text-neutral-900 dark:text-white ">Domicilio</span>

                        {pedidos[index]?.domicilioEntrega !== null
                          ? pedidos[index]?.domicilioEntrega?.calle +
                            ' ' +
                            pedidos[index]?.domicilioEntrega?.numero
                          : CartConstants.RETIRO_EN_LOCAL}

                        {pedidos[index]?.domicilioEntrega?.numeroDpto != undefined &&
                          'Departamento ' +
                            pedidos[index]?.domicilioEntrega?.numeroDpto +
                            ' ' +
                            pedidos[index]?.domicilioEntrega?.pisoDpto}
                      </h5>
                      {[employeeRoles.COCINERO, employeeRoles.ADMINISTRADOR].includes(userRole) && (
                        <h5 className="border-1  mb-2 flex flex-col flex-wrap justify-between  gap-4 rounded-lg rounded-l-xl  py-5 px-5  font-semibold leading-none text-neutral-500  shadow-md dark:border-amber-400 dark:bg-neutral-700 dark:text-neutral-500  ">
                          <span className="text-neutral-900 dark:text-white ">Ingredientes</span>
                          <div className="flex flex-col">
                            {detallesProducto[index] !== undefined ? (
                              detallesProducto[index].map((detalle) => (
                                <div
                                  key={'detalleStock' + detalle.id}
                                  className="flex w-full justify-between gap-2  text-neutral-500 dark:text-neutral-300"
                                >
                                  <p className="flex gap-2  text-neutral-500 dark:text-neutral-200">
                                    {detalle.articuloInsumo?.denominacion}
                                  </p>
                                  <p className="text-end ">
                                    {detalle.cantidad}{' '}
                                    <span className="text-amber-400">
                                      {detalle.unidadMedida?.abreviatura}
                                    </span>
                                  </p>
                                </div>
                              ))
                            ) : (
                              <p>Cargando ingredientes...</p>
                            )}
                          </div>
                        </h5>
                      )}
                    </>

                    {detalle.articuloInsumo !== null && (
                      <h5 className="border-1  mb-2 flex justify-between  gap-4 rounded-lg rounded-l-xl border-b-2 border-l-2 border-amber-200  py-5 px-5  font-semibold leading-none text-neutral-500  shadow-md dark:border-amber-400 dark:bg-neutral-700 dark:text-neutral-500  ">
                        <span className="text-neutral-900 dark:text-white ">Denominacion:</span>
                        {detalle.articuloInsumo?.denominacion}
                      </h5>
                    )}
                  </div>
                </div>
              ))}
              <ToastAlert />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
