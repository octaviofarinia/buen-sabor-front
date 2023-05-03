import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { interfaceRouter } from '../../Interfaces/InterfaceRouter';
export const NewRegister = () => {
  const { Name } = useParams();
  const [persistibleObject, setPersistibleObject] = useState([]);
  useEffect(() => {
    setPersistibleObject(interfaceRouter({ dataModel: Name }));
   
  }, []);
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Carga de Registro
          </h2>

          <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
            Completa el formulario para ingresar un nuevo registro de :{' '}
            <span className="text-amber-600">{Name}</span>
          </p>
        </div>

        <form className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
          {persistibleObject!=(null||undefined) ?  Object.keys(persistibleObject).map((key) => (
            <div>
              <label
                for="first-name"
                className="mb-2 inline-block text-md text-slate-900 sm:text-base font-bold capitalize"
              >
                {key}
              </label>
              <input
                name="first-name"
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>
          )):""}
        </form>
      </div>
    </div>
  );
};
