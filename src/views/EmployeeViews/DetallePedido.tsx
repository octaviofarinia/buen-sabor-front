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

export const DetallePedidoView = () => {
  const { id } = useParams();
  const [detallePedido, setDetallePedido] = useState<DetallePedidoComplete[]>([]);
  const [detallesProducto, setDetalleProducto] = useState<DetalleProducto[][]>([[], []]);
  const [loading, setLoading] = useState(true);
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

    notify('Todas las solicitudes se completaron correctamente', 'success');

    setLoading(false);
  };

  useEffect(() => {
    getRegisterData();
    if (detallePedido.length > 0) {
      getArticulosInsumos();
    }
  }, [detallePedido.length]);

  return (
    <div className="flex bg-neutral-100 px-5 lg:px-24">
      {loading ? (
        <Loader texto="Cargando registros" closeLoading={setLoading} />
      ) : (
        <>
          <div className="flex flex-col items-end">
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
                        <span className="text-neutral-900 dark:text-white ">Descripción</span>
                        {detalle.articuloManufacturado?.descripcion}
                      </h5>
                      <h5 className="border-1  mb-2 flex flex-wrap justify-between  gap-4 rounded-lg rounded-l-xl border-b-2 border-l-2 border-neutral-300  py-5 px-5  font-semibold leading-none text-neutral-500  shadow-md dark:border-amber-400 dark:bg-neutral-700 dark:text-neutral-500  ">
                        <span className="text-neutral-900 dark:text-white ">Cantidad</span>
                        {detalle.cantidad}
                      </h5>
                      <h5 className="border-1  mb-2 flex flex-wrap justify-between  gap-4 rounded-lg rounded-l-xl border-b-2 border-l-2 border-neutral-300  py-5 px-5  font-semibold leading-none text-neutral-500  shadow-md dark:border-amber-400 dark:bg-neutral-700 dark:text-neutral-500  ">
                        <span className="text-neutral-900 dark:text-white ">Ingredientes</span>
                        <div className="flex flex-col">
                          {detallesProducto[index] !== undefined ? (
                            detallesProducto[index].map((detalle) => (
                              <p key={detalle.id} className="flex gap-x-2 gap-y-5 py-2">
                                {detalle.articuloInsumo?.denominacion}
                                <span className="border-r-4 border-r-neutral-900  text-neutral-900 dark:border-r-neutral-100 dark:text-neutral-100"></span>
                                <span className="text-amber-500">
                                  {detalle.articuloInsumo?.stockActual}
                                </span>
                                <span className="text-neutral-900">
                                  {detalle.unidadMedida?.abreviatura}
                                </span>
                              </p>
                            ))
                          ) : (
                            <p>Cargando ingredientes...</p>
                          )}
                        </div>
                      </h5>
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
