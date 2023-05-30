import { useState, useEffect } from 'react';
import { Categoria } from '../../../Interfaces/Categoria';
import { getAllFathers } from '../API/SpecializedEndpoints/CategoriaRequests/CategoriaRequests';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faXmark } from '@fortawesome/free-solid-svg-icons';
export interface CategoryModalProps {
  fatherSetter: React.Dispatch<React.SetStateAction<Categoria>>;
}

export const CategoryModal = ({ fatherSetter }: CategoryModalProps) => {
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
    fatherSetter(categoria);
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
          <td className="whitespace-nowrap px-6 py-4">{categoria.idRubroPadre!==null ? categoria.idRubroPadre:"No posee"}</td>
          <td>
            <button
              onClick={() => setFather(categoria)}
              type="button"
              className="inline-block rounded bg-black px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-black transition
              duration-150 ease-in-out hover:bg-gray-700 hover:shadow-gray-700 focus:bg-gray-800 focus:shadow-gray-800 focus:outline-none focus:ring-0 active:bg-gray-800
              active:shadow-gray-800 dark:bg-white dark:text-black dark:shadow-white dark:hover:bg-gray-300 dark:hover:shadow-gray-300 dark:focus:bg-gray-100 dark:focus:shadow-gray-100
              dark:active:bg-gray-100 dark:active:shadow-gray-100"
            >
              <FontAwesomeIcon icon={faXmark} size="lg" />
            </button>
          </td>
        </tr>
        
      </React.Fragment>
    ));
  };
  const openButton = (
    <button
      onClick={() => toggleVisible(!visible)}
      type="button"
      className="inline-block w-full rounded bg-amber-400  pb-2 pt-2.5 text-xs font-medium uppercase 
              leading-normal text-white shadow-amber-400
               transition duration-150 ease-in-out hover:bg-amber-500 hover:shadow-amber-500
                focus:bg-amber-600 focus:shadow-amber-600 focus:outline-none focus:ring-0 active:bg-amber-600 active:shadow-amber-600"
    >
      <h5 className=" md:text-lg">Ver categorías</h5>
    </button>
  );
  const closeButton = (
    <button
      onClick={() => toggleVisible(!visible)}
      type="button"
      className="inline-block rounded bg-black px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-black transition
              duration-150 ease-in-out hover:bg-gray-700 hover:shadow-gray-700 focus:bg-gray-800 focus:shadow-gray-800 focus:outline-none focus:ring-0 active:bg-gray-800
              active:shadow-gray-800 dark:bg-white dark:text-black dark:shadow-white dark:hover:bg-gray-300 dark:hover:shadow-gray-300 dark:focus:bg-gray-100 dark:focus:shadow-gray-100
              dark:active:bg-gray-100 dark:active:shadow-gray-100"
    >
      <FontAwesomeIcon icon={faXmark} size="lg" style={{ color: '#ffffff' }} />
    </button>
  );
  return (
    <div className='flex w-1/2 pl-5'>
      {openButton}
      <div
        className={`${
          visible ? 'visible' : 'hidden'
        } absolute inset-0 overflow-y-auto bg-neutral-400 bg-opacity-75 transition-opacity`}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal={true}
      >
        <div className="min- flex items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <span className="sm: hidden sm:inline-block sm:align-middle" aria-hidden="true">
            ​
          </span>
          {/*Modal panel : This is where you put the pop-up's content, the div on top this coment is the wrapper */}
          <div
            className="inline-block transform overflow-hidden rounded-lg  
          bg-neutral-900 p-5 text-left align-bottom shadow-2xl transition-all sm:my-8 sm:w-full 
          sm:max-w-xl sm:align-middle lg:p-6"
          >
            <div className="flex w-full justify-between ">
              <h2 className="text-2xl text-white">Elige la categoria padre</h2>
              {closeButton}
            </div>
            <div className="overflow-hidden overflow-x-auto rounded-lg px-8 sm:-mx-6 lg:-mx-8 ">
              <div className="mt-3 overflow-hidden  rounded-lg text-left">
                <table className="min-w-full bg-white text-left text-sm font-light dark:bg-neutral-900 ">
                  <thead className="rounded-t-md font-medium uppercase">
                    <tr className="rounded-t-md border-b-4 border-b-neutral-500 bg-white  dark:border-b-white dark:bg-neutral-900 ">
                      <th scope="col" className="px-6 py-4 text-neutral-900 dark:text-white">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-4 text-neutral-900 dark:text-white">
                        Denominación
                      </th>
                      <th scope="col" className="px-6 py-4 text-neutral-900 dark:text-white">
                        ID Rubro Padre
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
