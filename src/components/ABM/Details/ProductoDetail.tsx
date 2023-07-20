import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getOne } from '../../../API/Requests/BaseRequests';
import { base_product } from '../../../Interfaces/ABM/InterfaceDelivery';
import { AxiosError } from 'axios';
import { ToastAlert, notify } from '../../Toast/ToastAlert';
import { Button } from '../../Botones/Button';
import { ArticuloManufacturado } from '../../../Interfaces/ABM/ArticuloManufacturado';
import { Loader } from '../../Loader/Loader';

export const ProductoDetail = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState<ArticuloManufacturado>(base_product);
  const [loading, setLoading] = useState(false);

  const getRegisterData = async () => {
    setLoading(true);
    try {
      const response = await getOne({
        id: Number(id),
        endpoint: 'articulos-manufacturados',
      });
      setProducto(response);
      notify('Se cargo el registro: ' + response.status, 'success');
    } catch (err) {
      const axiosErr = err as AxiosError;
      notify('Ocurrió un error: ' + axiosErr.response?.status, 'error');
    }
    setLoading(false);
  };
  useEffect(() => {
    getRegisterData();
  }, []);

  return (
    <div className="flex w-full bg-white px-5 dark:bg-neutral-800  lg:px-0">
      {loading &&<Loader texto="Cargando registros" closeLoading={setLoading} />}

      <div
        className="mx-auto my-10  w-full max-w-4xl rounded-lg border-b-4 border-l-4 border-amber-200 p-5  py-3 px-4 text-xl shadow-lg 
     dark:border-amber-400 dark:bg-neutral-800  md:text-2xl lg:py-8"
      >
        <div className="flex w-full items-center justify-between pb-4">
          <h1 className="mb-3 flex flex-col items-start justify-between font-bold  text-black dark:text-white md:text-4xl">
            Detalle
            <span className="text-start text-xl text-amber-400 ">
              Producto | Artículo - Manufacturado{' '}
            </span>
          </h1>

          <Link to={`/employee/ABM/Productos`} className="shadow-md">
            <Button content="Volver" color="amarillo" type="button" />
          </Link>
        </div>
        <div className="flex flex-col gap-5">
          <h5 className="border-1  mb-2 flex justify-between gap-1 rounded-lg rounded-l-xl border-b-2 border-l-2 border-amber-200   py-5 px-5 font-semibold leading-none text-red-500 shadow-md dark:border-amber-400 dark:bg-neutral-700 dark:text-red-200 ">
            <span className="text-neutral-900 dark:text-white ">Id</span>
            {producto.id}
          </h5>
          <h5 className="border-1  mb-2 flex justify-between  gap-1 rounded-lg rounded-l-xl border-b-2 border-l-2 border-amber-200  py-5 px-5  font-semibold leading-none text-red-500 shadow-md dark:border-amber-400 dark:bg-neutral-700 dark:text-red-200 ">
            <span className="text-neutral-900 dark:text-white ">Denominacion</span>
            {producto.denominacion}
          </h5>
          <h5 className="border-1  mb-2 flex justify-between  gap-1 rounded-lg rounded-l-xl border-b-2 border-l-2 border-amber-200  py-5 px-5  font-semibold leading-none text-red-500 shadow-md dark:border-amber-400 dark:bg-neutral-700 dark:text-red-200 ">
            <span className="text-neutral-900 dark:text-white ">Descripción</span>
            {producto.descripcion}
          </h5>
          <h5 className="border-1  mb-2 flex justify-between  gap-1 rounded-lg rounded-l-xl border-b-2 border-l-2 border-amber-200  py-5 px-5  font-semibold leading-none text-red-500 shadow-md dark:border-amber-400 dark:bg-neutral-700 dark:text-red-200 ">
            <span className="text-neutral-900 dark:text-white ">Precio de Venta</span>
            {producto.precioVenta}
          </h5>
          <h5 className="border-1  mb-2 flex justify-between  gap-1 rounded-lg rounded-l-xl border-b-2 border-l-2 border-amber-200  py-5 px-5  font-semibold leading-none text-red-500 shadow-md dark:border-amber-400 dark:bg-neutral-700 dark:text-red-200 ">
            <span className="text-neutral-900 dark:text-white ">
              Tiempo estimado en cocina (Min)
            </span>
            {producto.tiempoEstimadoCocina}
          </h5>
          <h5 className="border-1  mb-2 flex justify-between gap-1 rounded-lg rounded-l-xl border-b-2 border-l-2 border-amber-200  py-5 px-5  font-semibold leading-none text-red-500 shadow-md dark:border-amber-400 dark:bg-neutral-700 dark:text-red-200 ">
            <span className="text-neutral-900 dark:text-white ">Imagen</span>
            <img
              src={producto.urlImagen?.toString()}
              alt={producto.denominacion?.toString()}
              className="max-w-xs rounded-lg object-contain "
            />
          </h5>
        </div>
      </div>
      <ToastAlert />
    </div>
  );
};
