import { Link, useParams } from 'react-router-dom';
import { RubroArticulo } from '../../../Interfaces/ABM/RubroArticulo';
import { useEffect, useState } from 'react';
import { APIRouter } from '../../../API/APIRouter';
import { ApiProps, getOne } from '../../../API/Requests/BaseRequests';
import { base_category, base_unidad } from '../../../Interfaces/ABM/InterfaceDelivery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { AxiosError } from 'axios';
import { ToastAlert, notify } from '../../Toast/ToastAlert';
import { Button } from '../../Botones/Button';
import { UnidadDeMedida } from '../../../Interfaces/ABM/UnidadDeMedida';
import { Loader } from '../../Loader/Loader';

export const UnidadDeMedidaDetail = () => {
  const { id } = useParams();
  const [unidadDeMedida, setUnidadDeMedida] = useState<UnidadDeMedida>(base_unidad);
  const [loading, setLoading] = useState(false);

  const getRegisterData = async () => {
    setLoading(true);
    try {
      const response = await getOne({
        id: Number(id),
        endpoint: 'unidades-medida',
      });
      setUnidadDeMedida(response);
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
      {loading &&<Loader texto="Cargando registros" closeLoading={setLoading} />}

      <div
        className="mx-auto my-10  w-full max-w-4xl rounded-lg border-b-4 border-l-4 border-amber-200  bg-white p-5 py-3 px-4 
     text-xl shadow-lg dark:bg-neutral-800 md:text-2xl lg:py-8"
      >
        <div className="flex w-full items-center justify-between pb-4">
          <h1 className="mb-3 flex flex-col items-start justify-between font-bold  text-black dark:text-white md:text-4xl">
            Detalle
            <span className="text-start text-xl text-amber-400 ">Unidad de Medida</span>
          </h1>

          <Link to={`/employee/UnidadDeMedida`} className="shadow-md">
            <Button content="Volver" color="amarillo" type="button" />
          </Link>
        </div>
        <div className="flex flex-col gap-5">
          <h5 className="border-1  mb-2 flex justify-between  gap-1 rounded-lg rounded-l-xl border-b-2 border-l-2 border-amber-200  py-5 px-5  font-semibold leading-none text-red-500 shadow-md dark:border-amber-400 dark:bg-neutral-700 dark:text-red-200 ">
            <span className="text-neutral-900 dark:text-white ">Id:</span>
            {unidadDeMedida.id}
          </h5>
          <h5 className="border-1  mb-2 flex justify-between  gap-1 rounded-lg rounded-l-xl border-b-2 border-l-2 border-amber-200  py-5 px-5  font-semibold leading-none text-red-500 shadow-md dark:border-amber-400 dark:bg-neutral-700 dark:text-red-200 ">
            <span className="text-neutral-900 dark:text-white ">Denominacion:</span>
            {unidadDeMedida.denominacion}
          </h5>
          <h5 className="border-1  mb-2 flex justify-between  gap-1 rounded-lg rounded-l-xl border-b-2 border-l-2 border-amber-200  py-5 px-5  font-semibold leading-none text-red-500 shadow-md dark:border-amber-400 dark:bg-neutral-700 dark:text-red-200 ">
            <span className="text-neutral-900 dark:text-white ">Denominacion:</span>
            {unidadDeMedida.abreviatura}
          </h5>
        </div>
      </div>
      <ToastAlert />
    </div>
  );
};
