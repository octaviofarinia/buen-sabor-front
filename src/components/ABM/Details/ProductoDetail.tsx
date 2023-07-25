import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getOne } from '../../../API/Requests/BaseRequests';
import { base_product } from '../../../Interfaces/ABM/InterfaceDelivery';
import { AxiosError } from 'axios';
import { ToastAlert, notify } from '../../Toast/ToastAlert';
import { Button } from '../../Botones/Button';
import { ArticuloManufacturado } from '../../../Interfaces/ABM/ArticuloManufacturado';
import { Loader } from '../../Loader/Loader';
import { useAuth0 } from '@auth0/auth0-react';
import { DetalleProducto } from '../../../Interfaces/ABM/DetalleProducto';
import { getDetalles } from '../../../API/Requests/ProductoRequests/DetalleProductoRequests';

export const ProductoDetail = () => {
  const { id } = useParams();
  const [manufacturado, setManufacturado] = useState<ArticuloManufacturado>(base_product);
  const [detalleManufacturado, setDetalleManufacturado] = useState<DetalleProducto[]>([]);

  const [loading, setLoading] = useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const getRegisterData = async () => {
    setLoading(true);
    await getAccessTokenSilently()
      .then(async (accessToken) => {
        const data = await getOne({
          id: Number(id),
          endpoint: 'articulos-manufacturados',
          token: accessToken,
        });
        const detalleData = await getDetalles({
          id: Number(id),
          token: accessToken,
        });
        setManufacturado(data);
        setDetalleManufacturado(detalleData);
      })
      .catch((err) => {
        const axiosErr = err as AxiosError;
        notify('Ocurrió un error: ' + axiosErr.response?.status, 'error');
      });
    setLoading(false);
  };
  useEffect(() => {
    getRegisterData();
  }, []);

  return (
    <div className="flex w-full bg-neutral-100 px-5 dark:bg-neutral-800 lg:px-0">
      {loading ? (
        <Loader texto="Cargando registros" closeLoading={setLoading} />
      ) : (
        <div
          className="mx-auto my-10  w-full max-w-4xl rounded-lg border-b-4 border-l-4 border-neutral-300 bg-neutral-100 p-5 py-3 px-4 text-xl shadow-lg 
dark:border-b-neutral-500 dark:border-l-neutral-500 dark:bg-neutral-700 md:text-2xl lg:py-8"
        >
          <div className="mb-6 w-full  lg:mb-0 lg:py-6 lg:px-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="title-font text-sm tracking-widest text-neutral-500 dark:text-neutral-200">
                  Artículo Manufacturado
                </h1>
                <h2 className="title-font mb-4 text-3xl font-medium text-amber-400 ">
                  {manufacturado.denominacion}
                </h2>
              </div>
              <Link to={`/employee/ABM/Productos`} className="shadow-md">
                <Button content="Volver" color="amarillo" type="button" />
              </Link>{' '}
            </div>

            <div className="flex flex-col gap-3 border-t border-neutral-200 py-2 dark:border-t-neutral-500">
              <p className="fontBebas flex w-full flex-col justify-between border-b-2 border-b-neutral-200  dark:border-b-neutral-500 md:flex-row">
                <span className="text-neutral-500 dark:text-neutral-100">ID</span>
                <span className="ml-auto text-neutral-900 dark:text-neutral-300">
                  {manufacturado.id}
                </span>
              </p>
              <p className="fontBebas flex w-full flex-col justify-between border-b-2 border-b-neutral-200  dark:border-b-neutral-500 md:flex-row">
                <span className="text-neutral-500 dark:text-neutral-100">Descripción</span>
                <span className="ml-auto text-neutral-900 dark:text-neutral-300">
                  {manufacturado.descripcion}
                </span>
              </p>
              <p className="fontBebas flex w-full flex-col justify-between border-b-2 border-b-neutral-200  dark:border-b-neutral-500 md:flex-row">
                <span className="text-neutral-500 dark:text-neutral-100">Precio de venta</span>
                <span className="ml-auto text-neutral-900 dark:text-neutral-300">
                  $ {manufacturado.precioVenta}
                </span>
              </p>
              <p className="fontBebas flex w-full flex-col justify-between border-b-2 border-b-neutral-200  dark:border-b-neutral-500 md:flex-row">
                <span className="text-neutral-500 dark:text-neutral-100">
                  Tiempo Estimado en Cocina
                </span>
                <span className="ml-auto text-neutral-900 dark:text-neutral-300">
                  {manufacturado.tiempoEstimadoCocina} Minutos
                </span>
              </p>
              <div className="fontBebas grid grid-cols-1  gap-y-2  border-b-2 border-b-neutral-200 py-2 dark:border-b-neutral-500 md:grid-cols-2">
                <span className="col-span-1 col-start-1 flex-shrink text-neutral-500 dark:text-neutral-100">
                  Insumos Disponibles
                </span>
                {detalleManufacturado.map((detalle) => (
                  <p
                    key={'detalle' + detalle.id}
                    className="col-span-1 col-start-1 ml-auto flex w-full justify-start gap-2 pl-2 text-start text-neutral-900 dark:text-neutral-300 md:col-start-2 md:border-l-2 md:border-l-neutral-200"
                  >
                    {detalle.articuloInsumo?.denominacion}
                    <span className="ml-auto flex gap-2 text-neutral-900 dark:text-neutral-200">
                      Stock
                      <span className=" text-amber-400">{detalle.articuloInsumo?.stockActual}</span>
                    </span>

                    <span className="text-neutral-900 dark:text-neutral-200">
                      {detalle.unidadMedida?.abreviatura}
                    </span>
                  </p>
                ))}
              </div>
              <div className="fontBebas grid grid-cols-1 flex-col  gap-y-2 border-b-2 border-b-neutral-200 py-2 dark:border-b-neutral-500  md:grid-cols-2 md:flex-row">
                <span className="col-span-1 col-start-1 flex-shrink text-neutral-500 dark:text-neutral-100">
                  Insumos Requeridos
                </span>
                {detalleManufacturado.map((detalle) => (
                  <p
                    key={'detalleStock' + detalle.id}
                    className="col-span-1 col-start-1 ml-auto flex w-full justify-start gap-2 pl-2 text-start text-neutral-900 dark:text-neutral-300 md:col-start-2 md:border-l-2 md:border-l-neutral-200"
                  >
                    Requiere
                    <span className="ml-auto flex gap-2 text-neutral-900 dark:text-neutral-200">
                      {detalle.articuloInsumo?.denominacion}
                      <span className=" text-amber-400">{detalle.cantidad} </span>
                      {detalle.unidadMedida?.abreviatura}
                    </span>
                  </p>
                ))}
              </div>
              <p className="flex w-full justify-center">
                <img
                  src={manufacturado.urlImagen?.toString()}
                  alt={manufacturado.denominacion?.toString()}
                  className="max-h-96 max-w-md rounded-lg  object-cover "
                />
              </p>
            </div>
          </div>
          <ToastAlert />
        </div>
      )}
    </div>
  );
};
