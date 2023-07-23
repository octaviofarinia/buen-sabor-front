import { useState, useEffect } from 'react';
import React from 'react';
import { UnidadDeMedida } from '../../../../Interfaces/ABM/UnidadDeMedida';
import { Button } from '../../../Botones/Button';
import { ToastAlert } from '../../../Toast/ToastAlert';
import { getAll } from '../../../../API/Requests/BaseRequests';
export interface UnidadDeMedidaModalProps {
  fatherSetter: React.Dispatch<React.SetStateAction<UnidadDeMedida>>;
}

export const UnidadDeMedidaModal = ({ fatherSetter }: UnidadDeMedidaModalProps) => {
  const [unidadesDeMedida, setUnidadesDeMedida] = useState<UnidadDeMedida[]>([]);
  const [visible, toggleVisible] = useState(false);

  const getUnidadesDeMedida = async () => {
    try {
      const data = await getAll({ endpoint: 'unidades-medida' });
      setUnidadesDeMedida(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUnidadesDeMedida();
    return () => {};
  }, []);
  const setFather = (unidadDeMedida: UnidadDeMedida) => {
    fatherSetter(unidadDeMedida);
    toggleVisible(false);
  };
  const renderFilasUnidadDeMedida = (unidades: UnidadDeMedida[]) => {
    return unidades.map((unidad) => (
      <React.Fragment key={unidad.id}>
        <tr
          className="border-b border-b-neutral-200 odd:bg-neutral-100
             even:bg-neutral-100 hover:bg-neutral-200 dark:border-neutral-500 
              dark:border-b-neutral-400 dark:bg-neutral-500
              dark:text-neutral-100 dark:odd:bg-neutral-600 dark:even:bg-neutral-500 dark:hover:bg-neutral-700"
        >
          <td className="whitespace-nowrap px-6 py-4">{unidad.id}</td>
          <td className="whitespace-nowrap px-6 py-4">{unidad.denominacion}</td>
          <td className="whitespace-nowrap px-6 py-4">{unidad.abreviatura}</td>
          <td className="px-6 py-4">
            <div className="flex justify-end">
              <Button callback={() => setFather(unidad)} content="Seleccionar" type="button" />
            </div>
          </td>
        </tr>
      </React.Fragment>
    ));
  };
  const openButton = (
    <Button
      callback={() => toggleVisible(true)}
      content="Ver Unidades de Medida"
      type="button"
      color="amarillo"
      fullsize={true}
    />
  );
  const closeButton = <Button callback={() => toggleVisible(false)} content="x" type="button" />;
  return (
    <div className=" flex w-full">
      {openButton}
      <ToastAlert />
      <div
        className={`${
          visible ? 'visible' : 'hidden'
        } absolute inset-0 z-10 overflow-y-auto bg-neutral-400 bg-opacity-75 transition-opacity dark:bg-neutral-700 dark:bg-opacity-75 `}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal={true}
      >
        <div className=" flex h-full w-full items-center justify-center px-4 pt-4 pb-20 text-center ">
          {/*Modal panel : This is where you put the pop-up's content, the div on top this coment is the wrapper */}
          <div
            className="mx-52 h-min transform overflow-hidden  
          rounded-lg bg-neutral-900 p-5 text-left align-bottom shadow-2xl transition-all sm:my-8"
          >
            <div className="flex   gap-16">
              <h2 className="w-full flex-grow text-2xl text-neutral-100">Elige la unidad de medida</h2>
              {closeButton}
            </div>
            <div className="overflow-hidden overflow-x-auto rounded-lg px-8 sm:-mx-6 lg:-mx-8 ">
              <div className="mt-3 overflow-hidden  rounded-lg text-left">
                <table className="min-w-full bg-neutral-100text-left text-sm font-light dark:bg-neutral-900 ">
                  <thead className="rounded-t-md font-medium uppercase">
                    <tr className="rounded-t-md border-b-4 border-b-neutral-500 bg-neutral-100 dark:border-b-white dark:bg-neutral-800 ">
                      <th scope="col" className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
                        Denominación
                      </th>
                      <th scope="col" className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
                        Abreviatura
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-center text-neutral-900 dark:text-neutral-100"
                      >
                        Seleccionar
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {unidadesDeMedida != (null || undefined) &&
                      renderFilasUnidadDeMedida(unidadesDeMedida)}
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
