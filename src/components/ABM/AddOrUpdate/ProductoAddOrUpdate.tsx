import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createRegister, getRegister, updateRegister } from '../API/APIHandler';
import { APIRouter } from '../API/APIRouter';
import styles from './AddOrUpdate.module.css';
import { UnidadDeMedida } from '../../../Interfaces/UnidadDeMedida';
import { base_product_object, base_unidad_object } from '../../../Interfaces/InterfaceDelivery';
import { Producto } from '../../../Interfaces/Producto';


export const ProductoAddOrUpdate = () => {
  const { RequestedEndpoint, id } = useParams();
  const [persistibleObject, setPersistibleObject] = useState<Producto>(base_product_object);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id) {
      await updateRegister({
        requestedEndpoint: APIRouter(RequestedEndpoint),
        persistenObject: persistibleObject,
        id: id,
        KeyTableDataSetter: null,
        TableDataSetter: null,
        RegisterSetter: null,
      });
    } else {
      await createRegister({
        requestedEndpoint: APIRouter(RequestedEndpoint),
        persistenObject: persistibleObject,
        KeyTableDataSetter: null,
        TableDataSetter: null,
        RegisterSetter: null,
        id: '',
      });
    }

    navigate(`/employee/Productos`);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPersistibleObject({
      ...persistibleObject,
      [e.target.name]: e.target.value,
    });
  }



  useEffect(() => {
    id !== undefined &&
    getRegister({
      id:id,
      KeyTableDataSetter:null,
      TableDataSetter:null,
      requestedEndpoint:"UnidadDeMedida",
      persistenObject:persistibleObject,
      RegisterSetter:setPersistibleObject
    })
  }, []);
  return (
    <div className="relative bg-white py-6 sm:py-8 lg:py-12 lg:pb-60 ">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Carga de Registro
          </h2>

          <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
            Completa el formulario para ingresar un nuevo registro de :{' '}
            <span className="text-amber-600">{RequestedEndpoint}</span>
          </p>
        </div>

        <form
          className={`mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:gap-10 ${styles} `}
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
            value={persistibleObject.denominacion || ''}
          />     
           <label htmlFor="abreviatura" className="lg:text-2xl">
            Abreviatura
          </label>
          <input
            name={'abreviatura'}
            id={'abreviatura'}
            className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            onChange={(e) => handleChange(e)}
            value={persistibleObject.abreviatura || ''}
          /> 
        </form>
      </div>
    </div>
  );
};
