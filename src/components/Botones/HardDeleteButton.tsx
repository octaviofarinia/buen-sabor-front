import { useState, useEffect } from 'react';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import { hardDelete } from '../../API/APIHandler';
import { useNavigate } from 'react-router-dom';
import { APIRouter } from '../../API/APIRouter';

export const HardDeleteButton = ({
  id,
  requestedEndpoint,
}: {
  id: string;
  requestedEndpoint: string | undefined;
}) => {
  const [visible, toggleVisible] = useState(false);
  const navigate = useNavigate();
  const handleDelete = async() => {
    await hardDelete({ id: id, requestedEndpoint: APIRouter(requestedEndpoint) });
    navigate(`/employee/${requestedEndpoint}`);
  };
  const openButton = (
    <button
      onClick={() => toggleVisible(!visible)}
      type="button"
      className="flex flex-col items-center gap-1 rounded bg-red-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-red-800 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-red-800 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-red-900 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:bg-rose-600 dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:bg-red-700 dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
    >
      <FontAwesomeIcon icon={faTriangleExclamation} size="xl" />
      <h5 className=" md:text-lg">Borrar</h5>
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
      <FontAwesomeIcon icon={faXmark} size="lg" />
    </button>
  );
  return (
    <div className="flex  pl-5">
      {openButton}
      <div
        className={`${
          visible ? 'visible' : 'hidden'
        } absolute inset-0 overflow-y-auto bg-neutral-400 bg-opacity-75 transition-opacity`}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal={true}
      >
        <div className=" flex h-full w-1/2  items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0 lg:mx-auto">
          <span className="sm: hidden sm:inline-block sm:align-middle" aria-hidden="true">
            ​
          </span>
          {/*Modal panel : This is where you put the pop-up's content, the div on top this coment is the wrapper */}
          <div
            className="inset-0 mx-auto flex h-1/3 transform flex-col justify-between gap-5 overflow-hidden
          rounded-lg bg-neutral-900 p-5 text-left align-bottom shadow-2xl transition-all sm:my-8 sm:max-w-lg
           sm:align-middle lg:p-6"
          >
            <div className="flex w-full justify-between ">
              <h2 className="text-2xl text-white">¿Estas seguro de querer eliminar el registro?</h2>
              {closeButton}
            </div>
            <div className="flex w-full items-center justify-center gap-5">
              <button
                onClick={() => handleDelete()}
                type="button"
                className="flex flex-col items-center gap-1 rounded bg-red-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase 
                leading-normal text-white  transition duration-150 ease-in-out
                 hover:bg-red-800  active:bg-red-900 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)]
                   dark:bg-rose-600 dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)]
                    dark:hover:bg-red-700"
              >
                sí, deseo borrar el registro
              </button>
              <button
                onClick={() => toggleVisible(!visible)}
                type="button"
                className="inline-block rounded bg-neutral-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-black transition
              duration-150 ease-in-out hover:bg-gray-700 hover:shadow-gray-700 focus:bg-gray-800 focus:shadow-gray-800 focus:outline-none focus:ring-0 active:bg-gray-800
              active:shadow-gray-800 dark:bg-white dark:text-black dark:shadow-white dark:hover:bg-gray-300 dark:hover:shadow-gray-300 dark:focus:bg-gray-100 dark:focus:shadow-gray-100
              dark:active:bg-gray-100 dark:active:shadow-gray-100"
              >
                NO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
