import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createRegister, getRegister, updateRegister } from '../API/APIHandler';
import { APIRouter } from '../API/APIRouter';
import styles from './AddOrUpdate.module.css';
import { UnidadDeMedida } from '../../../Interfaces/UnidadDeMedida';
import { base_unidad_object } from '../../../Interfaces/InterfaceDelivery';

export const UnidadDeMedidaAddOrUpdate = () => {
  const { RequestedEndpoint, id } = useParams();
  const [unidadDeMedida, setUnidadDeMedida] = useState<UnidadDeMedida>(base_unidad_object);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id) {
      await updateRegister({
        requestedEndpoint: APIRouter(RequestedEndpoint),
        persistenObject: unidadDeMedida,
        id: id,
        KeyTableDataSetter: null,
        TableDataSetter: null,
        RegisterSetter: null,
      });
    } else {
      await createRegister({
        requestedEndpoint: APIRouter(RequestedEndpoint),
        persistenObject: unidadDeMedida,
        KeyTableDataSetter: null,
        TableDataSetter: null,
        RegisterSetter: null,
        id: '',
      });
    }

    navigate(`/employee/UnidadDeMedida`);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUnidadDeMedida({
      ...unidadDeMedida,
      [e.target.name]: e.target.value,
    });
  }

  const setPropsOfExistentUnidadDeMedida = async () => {
    try {
      const data = await getRegister({
        id: id,
        KeyTableDataSetter: null,
        TableDataSetter: null,
        requestedEndpoint: APIRouter('UnidadDeMedida'),
        persistenObject: unidadDeMedida,
        RegisterSetter: setUnidadDeMedida,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    id !== undefined && setPropsOfExistentUnidadDeMedida();
  }, []);
  return (
    <div className="relative bg-white py-6 sm:py-8 lg:py-12 lg:pb-60 ">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Carga de Registro
          </h2>

          <p className="max-w-screen-md mx-auto text-center text-gray-500 md:text-lg">
            Completa el formulario para ingresar un nuevo registro de :{' '}
            <span className="text-amber-600">{RequestedEndpoint}</span>
          </p>
        </div>

        <form
          className={`max-w-4xl mx-auto grid gap-4 sm:grid-cols-2 lg:gap-10 ${styles} `}
          onSubmit={(e) => handleSubmit(e)}
        >
          <label htmlFor="denominacion" className="lg:text-2xl">
            Denominacion
          </label>
          <input
            name={'denominacion'}
            id={'denominacion'}
            className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            onChange={(e) => handleChange(e)}
            value={unidadDeMedida.denominacion || ''}
            required
          />
          <label htmlFor="abreviatura" className="lg:text-2xl">
            Abreviatura
          </label>
          <input
            name={'abreviatura'}
            id={'abreviatura'}
            className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            onChange={(e) => handleChange(e)}
            value={unidadDeMedida.abreviatura || ''}
            required
          />
          <button
            type="submit"
            className="col-start-2 inline-block h-full rounded bg-black px-6 py-2 text-xs font-medium uppercase leading-normal text-white shadow-black transition
                     duration-150 ease-in-out hover:bg-gray-700 hover:shadow-gray-700 focus:bg-gray-800 focus:shadow-gray-800 focus:outline-none focus:ring-0 active:bg-gray-800
                     active:shadow-gray-800 dark:bg-white dark:text-black dark:shadow-white dark:hover:bg-gray-300 dark:hover:shadow-gray-300 dark:focus:bg-gray-100 dark:focus:shadow-gray-100
                     dark:active:bg-gray-100 dark:active:shadow-gray-100"
          >
            <h5 className="lg:text-lg">Agregar</h5>
          </button>
        </form>
      </div>
    </div>
  );
};
