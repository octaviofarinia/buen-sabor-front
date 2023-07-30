import { useState, useEffect } from 'react';
import React from 'react';
import { ArticuloInsumo } from '../../../../Interfaces/ABM/ArticuloInsumo';
import { Button } from '../../../Botones/Button';
import { ToastAlert, notify } from '../../../Toast/ToastAlert';
import { getAll, getAllActive } from '../../../../API/Requests/BaseRequests';
import { useAuth0 } from '@auth0/auth0-react';
import { AxiosError } from 'axios';
export interface IngredienteModalProps {
  setInsumo: React.Dispatch<React.SetStateAction<ArticuloInsumo>>;
}

export const IngredienteModal = ({ setInsumo: setInsumo }: IngredienteModalProps) => {
  const [ingredientes, setIngredientes] = useState<ArticuloInsumo[]>([]);
  const [visible, toggleVisible] = useState(false);
  const { getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    getIngredientes();
  }, []);
  const getIngredientes = async () => {
    await getAccessTokenSilently()
      .then(async (accessToken) => {
        const data = await getAllActive({ endpoint: 'articulos-insumo', token: accessToken });
        setIngredientes(data);
      })
      .catch((err) => {
        const error = err as AxiosError;
        notify(error.message, 'error');
      });
  };
  const getSetInsumo = (ingrediente: ArticuloInsumo) => {
    setInsumo(ingrediente);
    toggleVisible(false);
  };
  const renderFilasIngredientes = (ingredientes: ArticuloInsumo[]) => {
    return ingredientes.map((ingrediente) => (
      <React.Fragment key={ingrediente.id}>
        <tr
          className="border-b border-b-neutral-200 odd:bg-neutral-100
             even:bg-neutral-100 hover:bg-neutral-200 dark:border-neutral-500 
              dark:border-b-neutral-400 dark:bg-neutral-500
              dark:text-white dark:odd:bg-neutral-600 dark:even:bg-neutral-500 dark:hover:bg-neutral-700"
        >
          <td className="whitespace-nowrap px-6 py-4 hidden md:block">{ingrediente.id}</td>
          <td className="whitespace-nowrap px-6 py-4">{ingrediente.denominacion}</td>
          <td className="px-6 py-4">
            <div className="flex justify-end">
              <Button
                callback={() => getSetInsumo(ingrediente)}
                content="Seleccionar"
                type="button"
              />
            </div>
          </td>
        </tr>
      </React.Fragment>
    ));
  };
  const openButton = (
    <Button
      callback={() => toggleVisible(true)}
      content="Ver Ingredientes"
      type="button"
      color="amarillo"
      fullsize={true}
    />
  );
  const closeButton = <Button callback={() => toggleVisible(false)} content="x" type="button" />;
  return (
    <div className=" flex w-full ">
      {openButton}
      <ToastAlert />
      <div
        className={`${
          visible ? 'visible' : 'hidden'
        } fixed inset-0 z-10 overflow-y-auto bg-neutral-400 bg-opacity-75 transition-opacity dark:bg-neutral-700 dark:bg-opacity-75`}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal={true}
      >
        {' '}
        <div className="top-0 h-20 sm:hidden sm:h-0"></div>
        <div className=" top-10 right-10 flex h-full w-full items-start  justify-center  scroll-auto text-center md:items-center ">
          {/*Modal panel : This is where you put the pop-up's content, the div on top this coment is the wrapper */}
          <div
            className="  h-min transform overflow-hidden rounded-lg  bg-neutral-900 p-5 py-10
        text-left align-bottom shadow-2xl transition-all sm:top-auto sm:my-8 md:mx-32 lg:mx-52"
          >
            <div className="flex   gap-16">
              <h2 className="w-full flex-grow text-2xl text-neutral-100">
                Elige el ingrediente
              </h2>
              {closeButton}
            </div>
            <div className="overflow-hidden overflow-x-auto rounded-lg px-1 sm:-mx-6 sm:px-4 md:px-6 lg:-mx-8 lg:px-10">
              <div className="mt-3 overflow-hidden  rounded-lg text-left">
                <table className="min-w-full bg-neutral-100 text-left text-sm font-light dark:bg-neutral-900 ">
                  <thead className="rounded-t-md font-medium uppercase">
                    <tr className="rounded-t-md border-b-4 border-b-neutral-500 bg-neutral-100  dark:border-b-white dark:bg-neutral-800 ">
                      <th scope="col" className="px-6 py-4 text-neutral-900 dark:text-white  hidden md:block">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-4 text-neutral-900 dark:text-white">
                        Denominación
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-center text-neutral-900 dark:text-white"
                      >
                        Seleccionar
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredientes != (null || undefined) && renderFilasIngredientes(ingredientes)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
