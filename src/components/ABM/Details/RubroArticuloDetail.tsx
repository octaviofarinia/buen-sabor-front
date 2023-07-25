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
      {loading ? (
        <Loader texto="Cargando registros" closeLoading={setLoading} />
      ) : (
        <div
          className="mx-auto my-10  w-full max-w-4xl rounded-lg border-b-4 border-l-4 border-neutral-300 bg-neutral-100 p-5 py-3 px-4 text-xl shadow-lg 
dark:border-b-neutral-500 dark:border-l-neutral-500 dark:bg-neutral-700 md:text-2xl lg:py-8"
        >
          <div className="mb-6 w-full  lg:mb-0 lg:py-6 lg:pr-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="title-font text-sm tracking-widest text-neutral-500 dark:text-neutral-200">
                  Rubro Artículo
                </h1>
                <h2 className="title-font mb-4 text-3xl font-medium text-amber-500 dark:text-white">
                  {categoria.denominacion}
                </h2>
              </div>
              <Link to={`/employee/ABM/RubroArticulos`} className="shadow-md">
                <Button content="Volver" color="amarillo" type="button" />
              </Link>{' '}
            </div>

            <div className="flex flex-col gap-3 border-t border-neutral-200 py-2 dark:border-t-neutral-500">
              <p className="fontBebas flex w-full justify-between border-b-2 border-b-neutral-200 dark:border-b-neutral-500">
                <span className="text-neutral-500 dark:text-neutral-100">ID</span>
                <span className="ml-auto text-neutral-900 dark:text-neutral-300">
                  {categoria.id}
                </span>
              </p>
              <p className="fontBebas flex w-full justify-between border-b-2 border-b-neutral-200 dark:border-b-neutral-500">
                <span className="text-neutral-500 dark:text-neutral-100">
                  Categoria Rubro Padre
                </span>
                <span className="ml-auto text-neutral-900 dark:text-neutral-300">
                  {categoria.rubroPadre !== null ? categoria.rubroPadre.denominacion : 'No posee'}
                </span>
              </p>
            </div>
          </div>
          <ToastAlert />
        </div>
      )}
    </div>
  );
};
