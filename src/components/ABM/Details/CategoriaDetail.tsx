import { Link, useParams } from 'react-router-dom';
import { Categoria } from '../../../Interfaces/ABM/Categoria';
import { useEffect, useState } from 'react';
import { APIRouter } from '../../../API/APIRouter';
import { ApiProps, getRegister } from '../../../API/APIHandler';
import { base_category } from '../../../Interfaces/ABM/InterfaceDelivery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { AxiosError } from 'axios';
import { ToastAlert, notify } from '../../Toast/ToastAlert';
import { Button } from '../../Botones/Button';

export const CategoryDetail = () => {
  const { RequestedEndpoint, id } = useParams();
  const [categoria, setCategoria] = useState<Categoria>(base_category);
  const [loading, setLoading] = useState(false);

  const getRegisterData = async () => {
    setLoading(true);
    try {
      const response = await getRegister({
        id: id,
        requestedEndpoint: APIRouter(RequestedEndpoint),
        RegisterSetter: setCategoria,
      });
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
    <div className="flex w-full px-5 lg:px-0">
      <div
        className="mx-auto my-10  w-full max-w-4xl rounded-lg border-b-4 border-l-4 border-amber-200  bg-white p-5 py-3 px-4 
     text-xl shadow-lg dark:bg-neutral-800 md:text-2xl lg:py-8"
      >
        <div className="flex w-full items-center justify-between pb-4">
          <h1 className="mb-3 flex flex-col items-start justify-between font-bold  text-black dark:text-white md:text-4xl">
            Detalle
            <span className="text-start text-xl text-amber-400 ">Categoría | Rubro Artículo </span>
          </h1>

          <Link to={`/employee/Categorias`} className="shadow-md">
            <Button content="Volver" color="amarillo" type="button" />
          </Link>
        </div>
        <div className="flex flex-col gap-5">
          <h5 className="border-1  mb-2 flex justify-between  gap-1 rounded-lg rounded-l-xl border-b-2 border-l-2 border-amber-200  py-5 px-5  font-semibold leading-none text-red-500 shadow-md dark:border-amber-400 dark:bg-neutral-700 dark:text-red-200 ">
            <span className="text-neutral-900 dark:text-white ">Id:</span>
            {categoria.id}
          </h5>
          <h5 className="border-1  mb-2 flex justify-between  gap-1 rounded-lg rounded-l-xl border-b-2 border-l-2 border-amber-200  py-5 px-5  font-semibold leading-none text-red-500 shadow-md dark:border-amber-400 dark:bg-neutral-700 dark:text-red-200 ">
            <span className="text-neutral-900 dark:text-white ">Denominacion:</span>
            {categoria.denominacion}
          </h5>
          {categoria.RubroPadre != null && (
            <h5 className="border-1  mb-2 flex justify-between  gap-1 rounded-lg rounded-l-xl border-b-2 border-l-2 border-amber-200  py-5 px-5  font-semibold leading-none text-red-500 shadow-md dark:border-amber-400 dark:bg-neutral-700 dark:text-red-200 ">
              <span className="text-neutral-900 dark:text-white ">Id rubro padre:</span>
              {categoria.idRubroPadre}
            </h5>
          )}
        </div>
      </div>
      <ToastAlert />
    </div>
  );
};
