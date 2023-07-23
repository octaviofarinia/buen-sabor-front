import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBarcode,
  faEye,
  faPenToSquare,
  faPlus,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAll, softDelete } from '../../../API/Requests/BaseRequests';
import { Loader } from '../../Loader/Loader';
import { AxiosError } from 'axios';
import { UnidadDeMedida } from '../../../Interfaces/ABM/UnidadDeMedida';

export const ABMUnidadDeMedida = () => {
  const [uMedida, setUmedida] = useState<UnidadDeMedida[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUnidadesDeMedida = async () => {
    setIsLoading(true);
    try {
      const data = await getAll({ endpoint: 'unidades-medida' });
      setUmedida(data);
    } catch (err) {
      const axiosError = err as AxiosError;
      console.log(axiosError.message);
    }

    setIsLoading(false);
  };
  const handleDeleteRegister = (id?: number) => {
    softDelete({
      endpoint: 'unidades-medida',
      id: id,
    }).then(() => {
      getUnidadesDeMedida();
    });
  };

  useEffect(() => {
    getUnidadesDeMedida();
  }, []);

  return (
    <div className=" relative flex w-full flex-col gap-5 bg-neutral-100 px-5 pt-5 dark:bg-neutral-800 sm:px-8 md:px-16 ">
      {isLoading && (
        <Loader
          texto="Cargando los ingredientes..."
          closeLoading={setIsLoading}
          showCloseLoading={true}
        />
      )}
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-3 text-3xl font-extrabold uppercase text-black dark:text-neutral-100">
          <FontAwesomeIcon icon={faBarcode} />
          Rubros de los Artículos | Categorías
        </h1>
        <Link
          to={`/employee/ABM/UnidadDeMedida/newRegister`}
          className="inline-block rounded bg-sky-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-100 shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-sky-800 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-sky-800 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:bg-cyan-600  dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:bg-cyan-700 dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
        >
          <FontAwesomeIcon icon={faPlus} size="lg" style={{ color: '#ffffff' }} />
        </Link>
      </div>

      {uMedida && uMedida.length != 0 ? (
        <div className=" mb-6 flex flex-col gap-y-1 overflow-hidden rounded-lg bg-neutral-900 shadow-2xl dark:shadow-neutral-800">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full table-fixed bg-neutral-900 text-left text-sm font-light">
                  <thead className="font-medium uppercase">
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
                        className="border-b border-b-neutral-200 odd:bg-neutral-100 even:bg-neutral-100 hover:bg-neutral-200 dark:border-neutral-500 dark:border-b-neutral-400 dark:bg-neutral-500 dark:text-neutral-100 dark:odd:bg-neutral-600 dark:even:bg-neutral-500 dark:hover:bg-neutral-700"
                        key={unidad.id}
                      >
                        <td className="px-6 py-4 font-bold">{unidad.id}</td>
                        <td className="px-6 py-4">{unidad.denominacion}</td>
                        <td className="px-6 py-4">{unidad.abreviatura}</td>
                        <td className="px-6 py-4">
                          <div className="m-0 flex h-full items-center justify-center gap-16 p-0">
                            <Link to={`/employee/ABM/UnidadDeMedida/edit/${unidad.id}`}>
                              <button
                                type="button"
                                className="inline-block rounded bg-cyan-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-100 shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-cyan-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-cyan-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-cyan-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:bg-blue-600 dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.3)] dark:hover:bg-blue-700 dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.1),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.1),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.1),0_4px_18px_0_rgba(84,180,211,0.1)]"
                              >
                                <FontAwesomeIcon
                                  icon={faPenToSquare}
                                  size="lg"
                                  style={{ color: '#ffffff' }}
                                />
                              </button>
                            </Link>
                            <Link to={`/employee/ABM/UnidadDeMedida/${unidad.id}`}>
                              <button
                                type="button"
                                className="inline-block rounded bg-green-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-100 shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-green-800 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-green-800 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-green-900 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:bg-emerald-600 dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:bg-emerald-700 dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                              >
                                <FontAwesomeIcon
                                  icon={faEye}
                                  size="lg"
                                  style={{ color: '#ffffff' }}
                                />
                              </button>
                            </Link>

                            <button
                              type="button"
                              className="inline-block rounded bg-red-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-100 shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-red-800 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-red-800 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-red-900 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:bg-rose-600 dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:bg-red-700 dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                              onClick={() => {
                                handleDeleteRegister(unidad.id);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faTrashCan}
                                size="lg"
                                style={{ color: '#ffffff' }}
                              />
                            </button>
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
    </div>
  );
};
