import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getOne } from '../../../API/Requests/BaseRequests';
import { base_unidad } from '../../../Interfaces/ABM/InterfaceDelivery';
import { AxiosError } from 'axios';
import { ToastAlert, notify } from '../../Toast/ToastAlert';
import { Button } from '../../Botones/Button';
import { UnidadDeMedida } from '../../../Interfaces/ABM/UnidadDeMedida';
import { Loader } from '../../Loader/Loader';
import { useAuth0 } from '@auth0/auth0-react';

export const UnidadDeMedidaDetail = () => {
  const { id } = useParams();
  const [unidadDeMedida, setUnidadDeMedida] = useState<UnidadDeMedida>(base_unidad);
  const [loading, setLoading] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  const getRegisterData = async () => {
    setLoading(true);
    await getAccessTokenSilently()
      .then(async (accessToken) => {
        const response = await getOne({
          id: Number(id),
          token: accessToken,
          endpoint: 'unidades-medida',
        });
        setUnidadDeMedida(response);
        notify('Se cargo el registr', 'success');
      })
      .catch((err) => {
        const error = err as AxiosError;
        notify(error.response?.data as string, 'error');
      });
    setLoading(false);
  };
  useEffect(() => {
    getRegisterData();
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
          {' '}
          <div className="mb-6 w-full lg:mb-0 lg:py-6 lg:pr-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="title-font text-sm tracking-widest text-neutral-500 dark:text-neutral-100">
                  Unidad de Medida
                </h1>
                <h2 className="title-font mb-4 text-3xl font-medium text-amber-500 dark:text-white">
                  {unidadDeMedida.denominacion}
                </h2>
              </div>
              <Link to={`/employee/ABM/UnidadDeMedida`} className="shadow-md">
                <Button content="Volver" color="amarillo" type="button" />
              </Link>{' '}
            </div>

            <div className="flex flex-col gap-3 border-t border-neutral-200 py-2 dark:border-t-neutral-500">
              <p className="fontBebas flex w-full justify-between border-b-2 border-b-neutral-200 dark:border-b-neutral-500">
                <span className="text-neutral-500 dark:text-neutral-100">ID</span>
                <span className="ml-auto text-neutral-900 dark:text-neutral-300">
                  {unidadDeMedida.id}
                </span>
              </p>
              <p className="fontBebas flex w-full justify-between border-b-2 border-b-neutral-200 dark:border-b-neutral-500">
                <span className="text-neutral-500 dark:text-neutral-100">Abreviación</span>
                <span className="ml-auto text-neutral-900 dark:text-neutral-300">
                  {unidadDeMedida.abreviatura}
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
