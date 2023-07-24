import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getOne, save, update } from '../../../API/Requests/BaseRequests';
import { UnidadDeMedida } from '../../../Interfaces/ABM/UnidadDeMedida';
import { base_unidad } from '../../../Interfaces/ABM/InterfaceDelivery';
import { HardDeleteButton } from '../../Botones/HardDeleteButton';
import { Button } from '../../Botones/Button';
import { ToastAlert, notify } from '../../Toast/ToastAlert';
import { ClipLoader } from 'react-spinners';
import { AxiosError } from 'axios';
import { handleChange } from '../../../Utils/FormUtils';
import { useAuth0 } from '@auth0/auth0-react';

export const UnidadDeMedidaAddOrUpdate = () => {
  const { id } = useParams();
  const [unidadDeMedida, setUnidadDeMedida] = useState<UnidadDeMedida>(base_unidad);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        getAccessTokenSilently()
          .then(async (accessToken) => {
            await update({
              endpoint: 'unidades-medida',
              object: unidadDeMedida,
              id: Number(id),
              token: accessToken,
            });
          })
          .catch((err) => {
            const error = err as AxiosError;
            notify(error.response?.data as string, 'error');
          });
      } else {
        getAccessTokenSilently()
          .then(async (accessToken) => {
            await save({
              endpoint: 'unidades-medida',
              object: unidadDeMedida,
              token: accessToken,
            });

            notify('Exito', 'success');
          })
          .catch((err) => {
            const error = err as AxiosError;
            notify(error.response?.data as string, 'error');
          });
        setTimeout(() => {
          navigate(`/employee/ABM/UnidadDeMedida`);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const setPropsOfExistentUnidadDeMedida = async () => {
    try {
      getAccessTokenSilently()
        .then(async (accessToken) => {
          const response = await getOne({
            id: Number(id),
            token: accessToken,
            endpoint: 'unidades-medida',
          });
          setUnidadDeMedida(response);
        })
        .catch((err) => {
          const error = err as AxiosError;
          notify(error.response?.data as string, 'error');
        });
      notify('Se cargó el registro correctamente', 'success');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id !== (undefined && Number(id) > 0)) {
      setPropsOfExistentUnidadDeMedida();
    }
  }, [id]);

  return (
    <div className="relative bg-neutral-100 py-6 dark:bg-neutral-800 sm:py-8 lg:py-12 ">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8 lg:px-20">
        <div className="mb-10 flex w-full items-center justify-between md:mb-16">
          <div className="flex flex-col ">
            <h2 className=" text-center text-2xl font-bold text-neutral-800 dark:text-neutral-100  lg:text-4xl">
              {id === undefined ? (
                <>
                  <span className="block">Carga de registro </span>
                </>
              ) : (
                <>
                  <span>Edición de registro </span>
                </>
              )}
            </h2>{' '}
            <h3 className="mb-4 text-start  text-xl font-bold text-amber-400 md:mb-6 ">
              Unidad de Medida
            </h3>
          </div>
          {id !== undefined && <HardDeleteButton id={Number(id)} endpoint={'unidades-medida'} />}
        </div>

        <form
          className={`mx-auto grid max-w-2xl  gap-4 text-end dark:text-neutral-100  sm:grid-cols-3 lg:gap-10`}
          onSubmit={(e) => handleSubmit(e)}
        >
          <label htmlFor="denominacion" className="lg:text-2xl">
            Denominacion
          </label>
          <input
            name={'denominacion'}
            id={'denominacion'}
            className="col-span-2 w-full rounded border bg-neutral-50 px-3 py-2 text-neutral-800 outline-none
            ring-amber-400 transition duration-100 focus:ring dark:border-neutral-400 dark:bg-neutral-700 dark:text-neutral-100"
            onChange={(e) => handleChange(e, unidadDeMedida, setUnidadDeMedida)}
            value={unidadDeMedida.denominacion || ''}
            placeholder="Denominación..."
            required
          />
          <label htmlFor="abreviatura" className="lg:text-2xl">
            Abreviatura
          </label>
          <input
            name={'abreviatura'}
            id={'abreviatura'}
            className="col-span-2 w-full rounded border bg-neutral-50 px-3 py-2 text-neutral-800 outline-none
            ring-amber-400 transition duration-100 focus:ring dark:border-neutral-400 dark:bg-neutral-700 dark:text-neutral-100"
            onChange={(e) => handleChange(e, unidadDeMedida, setUnidadDeMedida)}
            value={unidadDeMedida.abreviatura || ''}
            placeholder="Denominacion..."
            required
          />
          <div className="relative z-0 col-span-3 flex w-full gap-3">
            <Button type="submit" content="add" fullsize={true} />
            {isLoading && (
              <div className="absolute -right-20 flex items-center">
                <ClipLoader size={45} aria-label="Loading Spinner" data-testid="loader" color="" />
              </div>
            )}
          </div>
        </form>
        <ToastAlert />
      </div>
    </div>
  );
};
