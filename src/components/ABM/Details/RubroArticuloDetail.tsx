import { Link, useParams } from 'react-router-dom';
import { RubroArticulo } from '../../../Interfaces/ABM/RubroArticulo';
import { useEffect, useState } from 'react';
import { getOne } from '../../../API/Requests/BaseRequests';
import { base_category } from '../../../Interfaces/ABM/InterfaceDelivery';
import { AxiosError } from 'axios';
import { ToastAlert, notify } from '../../Toast/ToastAlert';
import { Button } from '../../Botones/Button';
import { Loader } from '../../Loader/Loader';
import { useAuth0 } from '@auth0/auth0-react';

export const RubroArticuloDetail = () => {
  const { id } = useParams();
  const [categoria, setCategoria] = useState<RubroArticulo>(base_category);
  const [loading, setLoading] = useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const getRegistroRubro = async () => {
    setLoading(true);
    await getAccessTokenSilently()
      .then(async (accessToken) => {
        const response = await getOne({
          id: Number(id),
          endpoint: 'rubros-articulos',
          token: accessToken,
        });
        setCategoria(response);
        notify('Se cargo el registro', 'success');
      })
      .catch((error) => {
        const axiosErr = error as AxiosError;

        notify('Ocurrió un error: ' + axiosErr.response?.status, 'error');
      });
    setLoading(false);
  };
  useEffect(() => {
    getRegistroRubro();
  }, []);

  return (
    <div className="flex w-full px-5 lg:px-0">
      {loading && <Loader texto="Cargando registros" closeLoading={setLoading} />}
      <div
        className="mx-auto my-10  w-full max-w-4xl rounded-lg border-b-4 border-l-4 border-amber-200  bg-neutral-100 p-5 py-3 px-4 
     text-xl shadow-lg dark:bg-neutral-800 md:text-2xl lg:py-8"
      >
        <div className="flex w-full items-center justify-between pb-4">
          <h1 className="mb-3 flex flex-col items-start justify-between font-bold  text-neutral-900 dark:text-white md:text-4xl">
            Detalle
            <span className="text-start text-xl text-amber-400 ">Categoría | Rubro Artículo </span>
          </h1>

          <Link to={`/employee/ABM/RubroArticulos`} className="shadow-md">
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
          {categoria.rubroPadre != null && (
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
