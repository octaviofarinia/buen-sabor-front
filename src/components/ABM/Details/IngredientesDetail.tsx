import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getOne } from '../../../API/Requests/BaseRequests';
import { base_ingredient } from '../../../Interfaces/ABM/InterfaceDelivery';
import { AxiosError } from 'axios';
import { ToastAlert, notify } from '../../Toast/ToastAlert';
import { Button } from '../../Botones/Button';
import { ArticuloInsumo } from '../../../Interfaces/ABM/ArticuloInsumo';
import { Loader } from '../../Loader/Loader';

export const IngredientesDetail = () => {
  const { id } = useParams();
  const [ingrediente, setIngrediente] = useState<ArticuloInsumo>(base_ingredient);
  const [loading, setLoading] = useState(false);

  const getRegisterData = async () => {
    setLoading(true);
    try {
      const response = await getOne({
        id: Number(id),
        endpoint: 'articulos-insumo',
        
      });
      setIngrediente(response)
      notify('Se cargo el registro: ' + response.status, 'success');
      setLoading(false);
    } catch (err) {
      const axiosErr = err as AxiosError;
      setLoading(false);
      notify('Ocurrió un error: ' + axiosErr.response?.status, 'error');
    }
  };
  useEffect(() => {
    getRegisterData();
  }, []);

  return (
    <div className="flex w-full bg-neutral-100 px-5 dark:bg-neutral-800  lg:px-0">
      {loading &&<Loader texto="Cargando registros" closeLoading={setLoading} />}
      <div
        className="mx-auto my-10  w-full max-w-4xl rounded-lg border-b-4 border-l-4 border-amber-200 p-5  py-3 px-4 text-xl shadow-lg 
     dark:border-amber-400 dark:bg-neutral-800  md:text-2xl lg:py-8"
      >
        <div className="flex w-full items-center justify-between pb-4">
          <h1 className="mb-3 flex flex-col items-start justify-between font-bold  text-black dark:text-white md:text-4xl">
            Detalle
            <span className="text-start text-xl text-amber-400 ">
              Ingrediente | Artículo - Insumo{' '}
            </span>
          </h1>

          <Link to={`/employee/ABM/Ingredientes`} className="shadow-md">
            <Button content="Volver" color="amarillo" type="button" />
          </Link>
        </div>
        <div className="flex flex-col gap-5">
          <h5 className="border-1  mb-2 flex justify-between gap-1 rounded-lg rounded-l-xl border-b-2 border-l-2 border-amber-200   py-5 px-5 font-semibold leading-none text-red-500 shadow-md dark:border-amber-400 dark:bg-neutral-700 dark:text-red-200 ">
            <span className="text-neutral-900 dark:text-white ">Id:</span>
            {ingrediente.id}
          </h5>
          <h5 className="border-1  mb-2 flex justify-between  gap-1 rounded-lg rounded-l-xl border-b-2 border-l-2 border-amber-200  py-5 px-5  font-semibold leading-none text-red-500 shadow-md dark:border-amber-400 dark:bg-neutral-700 dark:text-red-200 ">
            <span className="text-neutral-900 dark:text-white ">Denominacion:</span>
            {ingrediente.denominacion}
          </h5>
          <h5 className="border-1  mb-2 flex  justify-between gap-1 rounded-lg rounded-l-xl border-b-2 border-l-2 border-amber-200  py-5 px-5  font-semibold leading-none text-red-500 shadow-md dark:border-amber-400 dark:bg-neutral-700 dark:text-red-200 ">
            <span className="text-neutral-900 dark:text-white ">Categoría:</span>
            {ingrediente.rubroArticulo?.denominacion}
          </h5>
          <h5 className="border-1  mb-2 flex justify-between gap-1 rounded-lg rounded-l-xl border-b-2 border-l-2 border-amber-200   py-5 px-5 font-semibold leading-none text-red-500 shadow-md dark:border-amber-400 dark:bg-neutral-700 dark:text-red-200 ">
            <span className="text-neutral-900 dark:text-white ">Precio de Compra:</span>
            {ingrediente.precioCompra}
          </h5>

          <h5 className="border-1  mb-2 flex justify-between  gap-1 rounded-lg rounded-l-xl border-b-2 border-l-2 border-amber-200  py-5 px-5  font-semibold leading-none text-red-500 shadow-md dark:border-amber-400 dark:bg-neutral-700 dark:text-red-200 ">
            <span className="text-neutral-900 dark:text-white ">Stock Actual:</span>
            {ingrediente.stockActual}
          </h5>
          <h5 className="border-1  mb-2 flex justify-between  gap-1 rounded-lg rounded-l-xl border-b-2 border-l-2 border-amber-200   py-5 px-5 font-semibold leading-none text-red-500 shadow-md dark:border-amber-400 dark:bg-neutral-700 dark:text-red-200 ">
            <span className="text-neutral-900 dark:text-white ">Stock Mínimo:</span>
            {ingrediente.stockMinimo}
          </h5>
          <h5 className="border-1  mb-2 flex  justify-between gap-1 rounded-lg rounded-l-xl border-b-2 border-l-2 border-amber-200  py-5 px-5  font-semibold leading-none text-red-500 shadow-md dark:border-amber-400 dark:bg-neutral-700 dark:text-red-200 ">
            <span className="text-neutral-900 dark:text-white ">Unidad de Medida:</span>
            {ingrediente.unidadMedida?.denominacion}
          </h5>
          <h5 className="border-1  mb-2 flex justify-between gap-1 rounded-lg rounded-l-xl border-b-2 border-l-2 border-amber-200  py-5 px-5  font-semibold leading-none text-red-500 shadow-md dark:border-amber-400 dark:bg-neutral-700 dark:text-red-200 ">
            <span className="text-neutral-900 dark:text-white ">Imagen:</span>
            <img
              src={ingrediente.urlImagen?.toString()}
              alt={ingrediente.denominacion?.toString()}
              className="max-w-xs rounded-lg object-contain "
            />
          </h5>
        </div>
      </div>
      <ToastAlert />
    </div>
  );
};
