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
import { RubroArticulo } from '../../../Interfaces/ABM/RubroArticulo';
import { useAuth0 } from '@auth0/auth0-react';
import { ToastAlert, notify } from '../../Toast/ToastAlert';
import { Button } from '../../Botones/Button';

export const ABMRubroArticulos = () => {
  const [rubros, setRubros] = useState<RubroArticulo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getAccessTokenSilently } = useAuth0();
  const getRubroInsumo = async () => {
    setIsLoading(true);
    await getAccessTokenSilently()
      .then(async (accessToken) => {
        const response = await getAll({ endpoint: 'rubros-articulos', token: accessToken });
        setRubros(response);
      })
      .catch((err) => {
        const error = err as AxiosError;
        notify(error.response?.data as string, 'error');
      });

    setIsLoading(false);
  };
  const handleDeleteRegister = async (id?: number) => {
    await getAccessTokenSilently()
      .then(async (accessToken) => {
        await softDelete({
          endpoint: 'rubros-articulos',
          token: accessToken,
          id: id,
        });
        getRubroInsumo();
      })
      .catch((err) => {
        const error = err as AxiosError;
        notify(error.response?.data as string, 'error');
      });
  };

  useEffect(() => {
    getRubroInsumo();
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
            <h1 className="flex items-center gap-3 text-3xl font-extrabold uppercase text-black dark:text-white">
              <FontAwesomeIcon icon={faBarcode} />
              Rubros de los Artículos | Categorías
            </h1>
            <Link to={`/employee/ABM/RubroArticulos/newRegister`}>
              <Button
                content={<FontAwesomeIcon icon={faPlus} size="sm" />}
                type="button"
                color="violeta"
              />
            </Link>
          </div>

          {rubros && rubros.length != 0 ? (
            <div className=" mb-6 flex flex-col gap-y-1 overflow-hidden rounded-lg bg-neutral-900 shadow-2xl dark:shadow-neutral-800">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full table-fixed bg-neutral-900 text-left text-sm font-light">
                      <thead className="font-medium uppercase">
                        <tr className="border-b-4 border-b-neutral-500 bg-neutral-900  text-white dark:border-b-white">
                          <th className="px-6 py-4">ID</th>
                          <th className="px-6 py-4">Denominación</th>
                          <th className="px-6 py-4">Id rubro padre</th>
                          <th className="px-6 py-4">Denominacion rubro padre</th>
                          <th className="px-6 py-4 text-center text-white"> Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rubros.map((rubro) => (
                          <tr
                            className={`border-b border-b-neutral-200 odd:bg-neutral-100 even:bg-neutral-100 hover:bg-neutral-200
                          dark:border-neutral-500 dark:border-b-neutral-400 dark:bg-neutral-500 dark:text-neutral-100 dark:odd:bg-neutral-600
                           dark:even:bg-neutral-700 dark:hover:bg-neutral-700 ${
                             rubro.fechaBaja != undefined && 'bg-rose-400'
                           }`}
                            key={rubro.id}
                          >
                            <td className="px-6 py-4 font-bold">{rubro.id}</td>
                            <td className="px-6 py-4">{rubro.denominacion}</td>
                            <td className="px-6 py-4">
                              {rubro?.rubroPadre?.id ? (
                                rubro.rubroPadre.id
                              ) : (
                                <span className=" text-rose-500">No posee</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              {rubro.rubroPadre?.denominacion ? (
                                rubro.rubroPadre.denominacion
                              ) : (
                                <span className=" text-rose-500">No posee</span>
                              )}
                            </td>

                            <td className="px-6 py-4">
                              <div className="m-0 flex h-full items-center justify-center gap-16 p-0">
                                <Link to={`/employee/ABM/RubroArticulos/edit/${rubro.id}`}>
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
                                <Link to={`/employee/ABM/RubroArticulos/${rubro.id}`}>
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
                                    handleDeleteRegister(rubro.id);
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
