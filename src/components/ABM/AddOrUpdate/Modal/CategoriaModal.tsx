import { useState, useEffect } from 'react';
import { RubroArticulo } from '../../../../Interfaces/ABM/RubroArticulo';
import { getAllFathers } from '../../../../API/Requests/CategoriaRequests/CategoriaRequests';
import React from 'react';
import { ToastAlert, notify } from '../../../Toast/ToastAlert';
import { Button } from '../../../Botones/Button';
import { AxiosError } from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export interface CategoryModalProps {
  setRubroArticuloPadre?: React.Dispatch<React.SetStateAction<RubroArticulo>>;
  setRubroArticulo?: React.Dispatch<React.SetStateAction<RubroArticulo>>;
  id?: string | number;
}

export const CategoryModal = ({
  setRubroArticuloPadre: setRubroArticuloPadre,
  id,
  setRubroArticulo,
}: CategoryModalProps) => {
  const [categories, setCategories] = useState<RubroArticulo[]>([]);
  const [visible, toggleVisible] = useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleNextPage = () => {
    const totalItems = categories.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };
  const getPadresDeRubro = async () => {
    await getAccessTokenSilently()
      .then(async (accessToken) => {
        const data = await getAllFathers(accessToken);
        setCategories(data);
      })
      .catch((err) => {
        const error = err as AxiosError;
        notify(error.response?.data as string, 'error');
      });
  };

  useEffect(() => {
    getPadresDeRubro();
  }, []);

  const setCategoria = (categoria: RubroArticulo) => {
    setRubroArticulo !== undefined && setRubroArticulo(categoria);
  };

  const setFather = (categoria: RubroArticulo) => {
    id !== categoria.id
      ? setRubroArticuloPadre !== undefined &&
        setRubroArticuloPadre((prevCategoria) => ({
          ...prevCategoria,
          idRubroPadre: categoria.id,
          rubroPadre: categoria,
        }))
      : notify('Lo siento! Una Categoría no puede ser su padre.', 'error');
    toggleVisible(false);
  };
  const renderFilasCategorias = (categorias: RubroArticulo[]) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = categorias.slice(indexOfFirstItem, indexOfLastItem);

    return currentItems.map((categoria) => (
      <React.Fragment key={categoria.id}>
        <tr
          className="border-b border-b-neutral-200 odd:bg-neutral-100
             even:bg-neutral-100 hover:bg-neutral-200 dark:border-neutral-500 
              dark:border-b-neutral-400 dark:bg-neutral-500
              dark:text-neutral-100 dark:odd:bg-neutral-600 dark:even:bg-neutral-500 dark:hover:bg-neutral-700"
        >
           <td className="whitespace-nowrap  px-3 py-4 md:px-6 hidden md:block">{categoria.id}</td>
          <td className="whitespace-nowrap  px-3 py-4 md:px-6">{categoria.denominacion}</td>
          <td className="hidden whitespace-nowrap  px-3 py-4 md:block md:px-6">
            {categoria.idRubroPadre !== null ? categoria.idRubroPadre : 'No posee'}
          </td>
          <td className=" px-3 py-4 md:px-6">
            <div className="flex justify-end px-1">
              <Button
                callback={() => {
                  setRubroArticuloPadre !== undefined && setFather(categoria);
                  setRubroArticulo !== undefined && setCategoria(categoria);
                }}
                content="Seleccionar"
                type="button"
                fullsize={true}
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
      content="Ver categorias"
      type="button"
      color="amarillo"
      fullsize={true}
    />
  );
  const closeButton = <Button callback={() => toggleVisible(false)} content="x" type="button" />;
  return (
    <div className=" w-full">
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
        <div className='h-20 top-0 sm:hidden sm:h-0'></div>
        <div className=" flex h-full w-full items-start md:items-center justify-center  text-center  top-10 right-10 scroll-auto ">
          {/*Modal panel : This is where you put the pop-up's content, the div on top this coment is the wrapper */}
          <div
            className="  h-min transform overflow-hidden rounded-lg  bg-neutral-900 p-5 py-10
          text-left align-bottom shadow-2xl transition-all sm:top-auto sm:my-8 md:mx-32 lg:mx-52"
          >
            <div className="flex   gap-16">
              <h2 className="w-full flex-grow text-2xl text-neutral-100">
                Elige la categoria padre
              </h2>
              {closeButton}
            </div>
            <div className="overflow-hidden overflow-x-auto rounded-lg px-1 sm:-mx-6 sm:px-4 md:px-6 lg:-mx-8 lg:px-10">
              <div className="mt-3 overflow-hidden  rounded-lg text-left">
                <table className="min-w-full bg-neutral-100 text-left text-sm font-light dark:bg-neutral-900 ">
                  <thead className="rounded-t-md font-medium uppercase">
                    <tr className="rounded-t-md border-b-4 border-b-neutral-500 bg-neutral-100  dark:border-b-white dark:bg-neutral-800 ">
                    <th scope="col" className="px-6 py-4 text-neutral-900 dark:text-neutral-100 hidden md:block">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
                        Denominación
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-4 text-neutral-900 dark:text-neutral-100 md:block md:px-6"
                      >
                        ID Rubro Padre
                      </th>
                      <th
                        scope="col"
                        className=" px-3 py-4 text-center text-neutral-900 dark:text-neutral-100 md:px-6"
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
            <div className="flex w-full justify-end gap-5 mt-5 px-2">
              {currentPage !== 1 && (
                <Button
                  callback={() => handlePrevPage()}
                  content={<FontAwesomeIcon icon={faArrowLeft} />}
                  type="button"
                />
              )}
              <Button
                callback={() => handleNextPage()}
                content={<FontAwesomeIcon icon={faArrowRight} />}
                type="button"
                color='amarillo'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
