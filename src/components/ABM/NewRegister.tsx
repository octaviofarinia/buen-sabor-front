import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { interfaceRouter } from '../../Interfaces/InterfaceRouter';
import { createRegister, updateRegister } from './API_Calls';
import { APIRouter } from './APIRouter';
export const NewRegister = ({ registerData }) => {
  const { Name, id } = useParams();
  const [persistibleObject, setPersistibleObject] = useState({});

  const navigate = useNavigate();

  function filterObjectByInterface<T>(
    obj: any,
    interfaceReference: T
  ): Partial<T> {
    const keys = Object.keys(interfaceReference) as Array<keyof T>;
    let result: Partial<T> = {};

    keys.forEach((key) => {
      if (key in obj) {
        result[key] = obj[key];
      } else {
        result[key] = null;
      }
    });

    return result;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id) {
      updateRegister({
        endpoint: APIRouter({ dataModel: Name }),
        persistenObject: persistibleObject,
        id: id,
      });
    } else {
      createRegister({
        endpoint: APIRouter({ dataModel: Name }),
        persistenObject: persistibleObject,
      });
    }

    navigate(`/employee/${Name}`, { replace: true });
  }

  function handleChange(e: React.FormEvent<HTMLFormElement>) {
    setPersistibleObject({
      ...persistibleObject,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    if (
      registerData &&
      typeof registerData === 'object' &&
      Object.keys(registerData).length !== 0
    ) {
      setPersistibleObject(
        filterObjectByInterface(
          registerData,
          interfaceRouter({ dataModel: Name })
        )
      );
    } else {
      setPersistibleObject(interfaceRouter({ dataModel: Name }));
    }
  }, [registerData]);

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

        <form
          className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2"
          onSubmit={(e) => handleSubmit(e)}
        >
          {persistibleObject != (null || undefined)
            ? Object.keys(persistibleObject).map((key) => (
                <div key={key}>
                  <label
                    htmlFor={key}
                    className="text-md mb-2 inline-block font-bold capitalize text-slate-900 sm:text-base"
                  >
                    {key}
                  </label>
                  <input
                    name={key}
                    id={key}
                    className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                    onChange={(e) => handleChange(e)}
                    value={persistibleObject[key] || ''}
                  />
                </div>
              ))
            : ''}
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};
