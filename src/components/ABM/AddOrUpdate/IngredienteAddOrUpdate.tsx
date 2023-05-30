import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './AddOrUpdate.module.css';
import {
  base_category_object,
  base_ingredient_object,
  base_unidad_object,
} from '../../../Interfaces/InterfaceDelivery';
import { Ingrediente } from '../../../Interfaces/Ingrediente';
import { Categoria } from '../../../Interfaces/Categoria';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { UnidadDeMedidaModal } from './UnidadDeMedidaModal';
import { UnidadDeMedida } from '../../../Interfaces/UnidadDeMedida';
import { CategoryModal } from './CategoriaModal';
import {
  createIngredienteRegister,
  getIngredienteRegister,
  updateIngredienteRegister,
} from '../API/SpecializedEndpoints/IngredienteRequests/IngredienteRequests';

export const IngredienteAddOrUpdate = () => {
  const { id } = useParams();
  const [ingrediente, setIngrediente] = useState<Ingrediente>(base_ingredient_object);
  const [categoria, setCategoria] = useState<Categoria>(base_category_object);
  const [unidadDeMedida, setUnidadDeMedida] = useState<UnidadDeMedida>(base_unidad_object);
  const [imagen, setImagen] = useState<File | null>(null);

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id) {
      await updateIngredienteRegister({
        id: id,
        imagen: imagen,
        ingrediente: ingrediente,
      });
    } else {
      await createIngredienteRegister({
        id: null,
        imagen: imagen,
        ingrediente: ingrediente,
      });
    }

    navigate(`/employee/Ingredientes`);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIngrediente({
      ...ingrediente,
      [e.target.name]: e.target.value,
    });
  }
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setImagen(selectedFile);
    }
  };
  const buildIngrediente = () => {
    if (categoria.id !== null && ingrediente !== null) {
      ingrediente.idRubroArticulo = categoria.id;
    }
    if (unidadDeMedida.id !== null && ingrediente !== null) {
      ingrediente.idUnidadMedida = unidadDeMedida.id;
    }
  
  };

  const setPropsOfExistentIngredient = async () => {
    try {
      const ingredienteData = await getIngredienteRegister(id);
      ingredienteData.status === 200 && 
      setIngrediente(ingredienteData.data);
      setCategoria(ingredienteData.data.rubroArticulo);
      setUnidadDeMedida(ingredienteData.data.unidadMedida)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    id !== undefined && setPropsOfExistentIngredient();
  }, []);

  return (
    <div className="relative bg-white py-6 sm:py-8 lg:py-12 lg:pb-60 ">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Carga de Registro
          </h2>

          <h3 className="max-w-screen-md mx-auto text-center text-gray-500 md:text-lg">
            Completa el formulario para ingresar un nuevo registro de :{' '}
            <span className="text-amber-600">Ingredientes</span>
          </h3>
        </div>

        <form
          encType="multipart/form-data"
          className={`max-w-4xl mx-auto grid gap-4 sm:grid-cols-2 lg:gap-10 ${styles} `}
          onSubmit={(e) => handleSubmit(e)}
        >
          <label htmlFor="denominacion" className="lg:text-2xl">
            Denominacion
          </label>
          <input
            name={'denominacion'}
            id={'denominacion'}
            type="text"
            className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            onChange={(e) => handleChange(e)}
            value={ingrediente.denominacion || ''}
            required
          />
          <label htmlFor="precioCompra" className="lg:text-2xl">
            Precio Compra
          </label>
          <input
            name={'precioCompra'}
            id={'precioCompra'}
            type="number"
            className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            onChange={(e) => handleChange(e)}
            value={ingrediente.precioCompra || ''}
            required
          />
          <label htmlFor="precioVenta" className="lg:text-2xl">
            Precio Venta
          </label>
          <input
            name={'precioVenta'}
            id={'precioVenta'}
            type="number"
            className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            onChange={(e) => handleChange(e)}
            value={ingrediente.precioVenta || ''}
            required
          />
          <label htmlFor="stockActual" className="lg:text-2xl">
            Stock Actual
          </label>
          <input
            name={'stockActual'}
            id={'stockActual'}
            type="number"
            className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            onChange={(e) => handleChange(e)}
            value={ingrediente.stockActual || ''}
            required
          />
          <label htmlFor="stockMinimo" className="lg:text-2xl">
            Stock Mínimo
          </label>
          <input
            name={'stockMinimo'}
            id={'stockMinimo'}
            type="number"
            className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            onChange={(e) => handleChange(e)}
            value={ingrediente.stockMinimo || ''}
            required
          />
          <label htmlFor="urlImagen" className="lg:text-2xl">
            Imagen del insumo
          </label>
          <div className="flex flex-col">
            {id !== undefined && (
              <img
                src={ingrediente.urlImagen?.toString()}
                alt={'img'}
                className="max-w-7.5 mix-blend-multiply"
              ></img>
            )}
            <input
              name="imagen"
              id="imagen"
              type="file"
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              onChange={(e) => handleImageChange(e)}
            />
          </div>

          <div
            className={`flex items-center justify-between gap-5 ${
              categoria.id === null  && 'col-span-2'
            }`}
          >
            <label htmlFor="idRubroArticulo" className="lg:text-2xl">
              Categoría
            </label>
            <CategoryModal fatherSetter={setCategoria} />
            {categoria.id !== null && (
              <button
                onClick={() => setCategoria(base_category_object)}
                type="button"
                className="inline-block h-full rounded bg-black px-6 py-1 text-xs font-medium uppercase leading-normal text-white shadow-black transition
                     duration-150 ease-in-out hover:bg-gray-700 hover:shadow-gray-700 focus:bg-gray-800 focus:shadow-gray-800 focus:outline-none focus:ring-0 active:bg-gray-800
                     active:shadow-gray-800 dark:bg-white dark:text-black dark:shadow-white dark:hover:bg-gray-300 dark:hover:shadow-gray-300 dark:focus:bg-gray-100 dark:focus:shadow-gray-100
                     dark:active:bg-gray-100 dark:active:shadow-gray-100"
              >
                <FontAwesomeIcon icon={faXmark} size="lg" style={{ color: '#ffffff' }} />
              </button>
            )}
          </div>
          {categoria.id !== null && (
            <span className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring">
              {categoria.denominacion}
            </span>
          )}
          <input
            name={'id'}
            id={'idRubroArticulo'}
            className="hidden"
            onChange={(e) => handleChange(e)}
            value={categoria?.id || 0}
            required
          />
          <div
            className={`flex items-center justify-between gap-5 ${
              unidadDeMedida.id === null ? 'col-span-2' : 'col-span-1'
            }`}
          >
            <label htmlFor="idunidadDeMedida" className="lg:text-2xl">
              Unidad de Medida
            </label>
            <UnidadDeMedidaModal fatherSetter={setUnidadDeMedida} />
            {unidadDeMedida.id !== null && (
              <button
                onClick={() => setUnidadDeMedida(base_unidad_object)}
                type="button"
                className="inline-block h-full rounded bg-black px-6 py-1 text-xs font-medium uppercase leading-normal text-white shadow-black transition
                     duration-150 ease-in-out hover:bg-gray-700 hover:shadow-gray-700 focus:bg-gray-800 focus:shadow-gray-800 focus:outline-none focus:ring-0 active:bg-gray-800
                     active:shadow-gray-800 dark:bg-white dark:text-black dark:shadow-white dark:hover:bg-gray-300 dark:hover:shadow-gray-300 dark:focus:bg-gray-100 dark:focus:shadow-gray-100
                     dark:active:bg-gray-100 dark:active:shadow-gray-100"
              >
                <FontAwesomeIcon icon={faXmark} size="lg" style={{ color: '#ffffff' }} />
              </button>
            )}
          </div>
          {unidadDeMedida.id !== null && (
            <span className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring">
              {unidadDeMedida.denominacion}
            </span>
          )}
          <input
            name={'idunidadDeMedida'}
            id={'idunidadDeMedida'}
            className="hidden"
            onChange={(e) => handleChange(e)}
            value={unidadDeMedida?.id || 0}
            required
          />
          <button
            onClick={() => buildIngrediente()}
            type="submit"
            className="col-start-2 inline-block h-full w-full rounded bg-black px-6 py-2 text-xs font-medium uppercase leading-normal text-white shadow-black transition
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
