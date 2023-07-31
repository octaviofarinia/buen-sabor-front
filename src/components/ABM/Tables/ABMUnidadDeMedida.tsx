import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBarcode,
  faEye,
  faPenToSquare,
  faPlus,
  faRuler,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAll, softDelete } from '../../../API/Requests/BaseRequests';
import { Loader } from '../../Loader/Loader';
import { AxiosError } from 'axios';
import { UnidadDeMedida } from '../../../Interfaces/ABM/UnidadDeMedida';
import { useAuth0 } from '@auth0/auth0-react';
import { ToastAlert, notify } from '../../Toast/ToastAlert';
import { Button } from '../../Botones/Button';

export const ABMUnidadDeMedida = () => {
  const [uMedida, setUmedida] = useState<UnidadDeMedida[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getAccessTokenSilently } = useAuth0();
  const getUnidadesDeMedida = async () => {
    setIsLoading(true);
    try {
      getAccessTokenSilently()
        .then(async (accessToken) => {
          const data = await getAll({ endpoint: 'unidades-medida', token: accessToken });
          setUmedida(data);
        })
        .catch((err) => {
          const error = err as AxiosError;
          notify(error.response?.data as string, 'error');
        });
    } catch (err) {
      const axiosError = err as AxiosError;
      console.log(axiosError.message);
    }

    setIsLoading(false);
  };
  const handleDeleteRegister = async (id?: number) => {
    await getAccessTokenSilently()
      .then(async (accessToken) => {
        await softDelete({
          endpoint: 'unidades-medida',
          token: accessToken,
          id: id,
        });
        getUnidadesDeMedida();
      })
      .catch((err) => {
        const error = err as AxiosError;
        notify(error.response?.data as string, 'error');
      });
  };

  useEffect(() => {
    getUnidadesDeMedida();
  }, []);

  return (
    <div className=" relative flex w-full flex-col gap-5 bg-neutral-100 px-5 pt-5 dark:bg-neutral-800 sm:px-8 md:px-16 ">
      {isLoading ? (
        <Loader
          texto="Cargando los ingredientes..."
          closeLoading={setIsLoading}
          showCloseLoading={true}
        />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h1 className="flex items-center gap-3 text-3xl font-extrabold uppercase text-black dark:text-neutral-100">
              <FontAwesomeIcon icon={faRuler} />
              Unidades de Medida
            </h1>
            <Link to={`/employee/ABM/UnidadDeMedida/newRegister`}>
              <Button
                content={<FontAwesomeIcon icon={faPlus} size="sm" />}
                type="button"
                color="violeta"
              />{' '}
            </Link>
          </div>

          {uMedida && uMedida.length != 0 ? (
            <div className=" mb-6 flex flex-col gap-y-1 overflow-hidden rounded-lg bg-neutral-900 shadow-2xl dark:shadow-md dark:shadow-neutral-700">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full table-fixed bg-neutral-900 text-left text-sm font-light">
                      <thead className="upperFcase font-medium">
                        <tr className="border-b-4 border-b-neutral-500 bg-neutral-900  text-neutral-100 dark:border-b-neutral-100">
                          <th className="px-6 py-4">ID</th>
                          <th className="px-6 py-4">Denominación</th>
                          <th className="px-6 py-4">Abreviatura</th>

                          <th className="px-6 py-4 text-center text-neutral-100"> Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {uMedida.map((unidad) => (
                          <tr
                            className={`border-b border-b-neutral-200 odd:bg-neutral-100 even:bg-neutral-100 hover:bg-neutral-200
                            dark:border-neutral-500 dark:border-b-neutral-700  dark:bg-neutral-800  dark:text-neutral-50
                             dark:hover:bg-neutral-900 ${
                               unidad.fechaBaja != null && 'bg-rose-200 hover:bg-rose-400'
                             }`}
                            key={unidad.id}
                          >
                            <td className="px-6 py-4 font-bold">{unidad.id}</td>
                            <td className="px-6 py-4">{unidad.denominacion}</td>
                            <td className="px-6 py-4">{unidad.abreviatura}</td>
                            <td className="px-6 py-4">
                              <div className="m-0 flex h-full items-center justify-center gap-16 p-0">
                                <Link to={`/employee/ABM/UnidadDeMedida/edit/${unidad.id}`}>
                                  <Button
                                    color="azul"
                                    type="button"
                                    content={
                                      <FontAwesomeIcon
                                        icon={faPenToSquare}
                                        size="sm"
                                        style={{ color: '#ffffff' }}
                                      />
                                    }
                                  />
                                </Link>
                                <Link to={`/employee/ABM/UnidadDeMedida/${unidad.id}`}>
                                  <Button
                                    color="verde"
                                    type="button"
                                    content={
                                      <FontAwesomeIcon
                                        icon={faEye}
                                        size="sm"
                                        style={{ color: '#ffffff' }}
                                      />
                                    }
                                  />
                                </Link>
                                <Button
                                  type="button"
                                  color="rojo"
                                  callback={() => {
                                    handleDeleteRegister(unidad.id);
                                  }}
                                  content={
                                    <FontAwesomeIcon
                                      icon={faTrashCan}
                                      size="sm"
                                      style={{ color: '#ffffff' }}
                                    />
                                  }
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <h2
              className="my-6 rounded-md bg-rose-700 p-2 text-center font-semibold text-zinc-100
    shadow-lg"
            >
              Ups! Aun no has agregado ningún registro.
            </h2>
          )}
        </>
      )}
      <ToastAlert />
    </div>
  );
};
