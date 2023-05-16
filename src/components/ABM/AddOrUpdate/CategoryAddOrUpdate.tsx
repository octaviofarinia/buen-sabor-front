import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createRegister, getRegister, updateRegister } from '../API/APIHandler';
import { APIRouter } from '../API/APIRouter';
import { Categoria } from '../../../Interfaces/Categoria';
import { base_category_object } from '../../../Interfaces/InterfaceDelivery';
export const CategoryAddOrUpdate = () => {
  const { RequestedEndpoint, id } = useParams();
  const [persistibleObject, setPersistibleObject] = useState<Categoria>(base_category_object);

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id) {
      const response = await updateRegister({
        requestedEndpoint: APIRouter(RequestedEndpoint ),
        persistenObject: persistibleObject,
        id: id,
        KeyTableDataSetter: null,
        TableDataSetter: null,
        RegisterSetter:null
      });
    } else {
      const response = await createRegister({
        requestedEndpoint: APIRouter(RequestedEndpoint),
        persistenObject: persistibleObject,
        KeyTableDataSetter: null,
        TableDataSetter: null,
        RegisterSetter:null,
        id:'',
      });
    }

    navigate(`/employee/${RequestedEndpoint}`);
  }

  function handleChange(e: React.FormEvent<HTMLFormElement>) {
    setPersistibleObject({
      ...persistibleObject,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
     id != undefined && (
        getRegister({
            requestedEndpoint: APIRouter(RequestedEndpoint),
            RegisterSetter: setPersistibleObject,
            id: id,
            KeyTableDataSetter: null,
            TableDataSetter: null,
            persistenObject: null,
        }));
  },);

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
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
