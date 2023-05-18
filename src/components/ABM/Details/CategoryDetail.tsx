import { Link, useParams } from 'react-router-dom';
import { Categoria } from '../../../Interfaces/Categoria';
import { useEffect, useState } from 'react';
import { APIRouter } from '../API/APIRouter';
import { ApiProps, getRegister } from '../API/APIHandler';
import { base_category_object } from '../../../Interfaces/InterfaceDelivery';
import { DetailCard } from './DetailCard/DetailCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

export const CategoryDetail = () => {
  const { RequestedEndpoint, id } = useParams();
  const [registerData, setRegisterData] = useState<Categoria>(base_category_object);

  const getRegisterData = () => {
    const apiProps: ApiProps<Categoria> = {
      KeyTableDataSetter: null,
      TableDataSetter: null,
      requestedEndpoint: APIRouter(RequestedEndpoint),
      RegisterSetter: setRegisterData,
      persistenObject: null,
      id: id,
    };
    getRegister(apiProps);
  };
  useEffect(() => {
    getRegisterData();
  });
  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-2xl py-8 px-4 lg:py-16 text-xl md:text-2xl">
        <h2 className="text-amber-400 flex justify-between md:text-3xl mb-3 items-start">{RequestedEndpoint}
        <Link to={`/employee/${RequestedEndpoint}`}>
                <button
                  type="button"
                  className="inline-block rounded bg-amber-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase 
                  leading-normal text-white shadow-amber-400
                   transition duration-150 ease-in-out hover:bg-amber-500 hover:shadow-amber-500
                    focus:bg-amber-600 focus:shadow-amber-600 focus:outline-none focus:ring-0 active:bg-amber-600 active:shadow-amber-600"
                                    >
                  <FontAwesomeIcon icon={faArrowLeftLong} size="lg" style={{ color: '#ffffff' }} />
                </button>
              </Link>
        </h2>
        <h2 className="mb-2  flex gap-1 font-semibold leading-none text-neutral-500 dark:text-zinc-300 ">
          <span className='text-neutral-900 dark:text-white '>Id:</span>{registerData.id}
        </h2>
        <h2 className="mb-2  flex gap-1 font-semibold leading-none text-neutral-500 dark:text-zinc-300 ">
          <span className='text-neutral-900 dark:text-white '>Denominacion:</span>{registerData.denominacion}
        </h2>
        {registerData.idRubroPadre!= null && <h2 className="mb-2  flex gap-1 font-semibold leading-none text-neutral-500 dark:text-zinc-300 ">
          <span className='text-neutral-900 dark:text-white '>Id rubro padre:</span>{registerData.idRubroPadre}
        </h2>}
        
      </div>
    </section>
    </div>
  );
};
