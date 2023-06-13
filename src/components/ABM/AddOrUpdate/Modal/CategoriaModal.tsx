import { useState, useEffect } from 'react';
import { Categoria } from '../../../../Interfaces/Categoria';
import { getAllFathers } from '../../API/SpecializedEndpoints/CategoriaRequests/CategoriaRequests';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ToastAlert, notify } from '../../../Toast/ToastAlert';
import { Button } from '../../../Botones/Button';

export interface CategoryModalProps {
  fatherSetter: React.Dispatch<React.SetStateAction<Categoria>>;
  id?: string | number;
}

export const CategoryModal = ({ fatherSetter, id }: CategoryModalProps) => {
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [visible, toggleVisible] = useState(false);

  useEffect(() => {
    getAllFathers({
      RegistersSetter: setCategories,
      id: null,
      IndividualRegisterSetter: null,
    });
  }, []);
  const setFather = (categoria: Categoria) => {
    id !== categoria.id
      ? fatherSetter(categoria)
      : notify('Lo siento! Una Categoría no puede ser su padre.', 'error');
    toggleVisible(false);
  };
  const renderFilasCategorias = (categorias: Categoria[]) => {
    return categorias.map((categoria) => (
      <React.Fragment key={categoria.id}>
        <tr
          className="border-b border-b-neutral-200 odd:bg-white
             even:bg-neutral-100 hover:bg-neutral-200 dark:border-neutral-500 
              dark:border-b-neutral-400 dark:bg-neutral-500
              dark:text-white dark:odd:bg-neutral-600 dark:even:bg-neutral-500 dark:hover:bg-neutral-700"
        >
          <td className="whitespace-nowrap px-6 py-4">{categoria.id}</td>
          <td className="whitespace-nowrap px-6 py-4">{categoria.denominacion}</td>
          <td className="whitespace-nowrap px-6 py-4">
            {categoria.idRubroPadre !== null ? categoria.idRubroPadre : 'No posee'}
          </td>
          <td className="px-6 py-4">
            <div className="flex justify-end">
              <Button callback={() => setFather(categoria)} content="Seleccionar" type="button" />
            </div>
          </td>
        </tr>
      </React.Fragment>
    ));
  };
  const openButton = (
    <Button
      callback={() => toggleVisible(true)}
      content="Ver categorias"
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
        } absolute inset-0 overflow-y-auto bg-neutral-400 bg-opacity-75 transition-opacity dark:bg-neutral-700 dark:bg-opacity-75 z-10`}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal={true}
      >
        <div className=" flex h-full w-full items-center justify-center px-4 pt-4 pb-20 text-center  ">
          {/*Modal panel : This is where you put the pop-up's content, the div on top this coment is the wrapper */}
          <div
            className="mx-52 h-min transform overflow-hidden  
          rounded-lg bg-neutral-900 p-5 text-left align-bottom shadow-2xl transition-all sm:my-8"
          >
            <div className="flex   gap-16">
              <h2 className="w-full flex-grow text-2xl text-white">Elige la categoria padre</h2>
              {closeButton}
            </div>
            <div className="overflow-hidden overflow-x-auto rounded-lg px-8 sm:-mx-6 lg:-mx-8 ">
              <div className="mt-3 overflow-hidden  rounded-lg text-left">
                <table className="min-w-full bg-white text-left text-sm font-light dark:bg-neutral-900 ">
                  <thead className="rounded-t-md font-medium uppercase">
                    <tr className="rounded-t-md border-b-4 border-b-neutral-500 bg-white  dark:border-b-white dark:bg-neutral-800 ">
                      <th scope="col" className="px-6 py-4 text-neutral-900 dark:text-white">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-4 text-neutral-900 dark:text-white">
                        Denominación
                      </th>
                      <th scope="col" className="px-6 py-4 text-neutral-900 dark:text-white">
                        ID Rubro Padre
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
                    {categories != (null || undefined) && renderFilasCategorias(categories)}
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
