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
import { UnidadDeMedidaModal } from './Modal/UnidadDeMedidaModal';
import { UnidadDeMedida } from '../../../Interfaces/UnidadDeMedida';
import { CategoryModal } from './Modal/CategoriaModal';
import {
  createIngredienteRegister,
  getIngredienteRegister,
  updateIngredienteRegister,
} from '../API/SpecializedEndpoints/IngredienteRequests/IngredienteRequests';
import { handleChange, handleImageChange } from '../../../utils/FormUtils';
import { Button } from '../../Botones/Button';
import { ClipLoader } from 'react-spinners';
import { ToastAlert, notify } from '../../Toast/ToastAlert';
import { AxiosError } from 'axios';

export const IngredienteAddOrUpdate = () => {
  const { id } = useParams();
  const [ingrediente, setIngrediente] = useState<Ingrediente>(base_ingredient_object);
  const [categoria, setCategoria] = useState<Categoria>(base_category_object);
  const [unidadDeMedida, setUnidadDeMedida] = useState<UnidadDeMedida>(base_unidad_object);
  const [imagen, setImagen] = useState<File | null>(null);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let status = 0;
    setLoading(true);
    try {
      if (id) {
        const request = await updateIngredienteRegister({
          id: id,
          imagen: imagen,
          ingrediente: ingrediente,
        });
        status = request;
      } else {
        const request = await createIngredienteRegister({
          id: null,
          imagen: imagen,
          ingrediente: ingrediente,
        });
        status = request;
      }

      setLoading(false);
      status === (200 || 201) && notify('Exito', 'success');
      setTimeout(() => {
        navigate(`/employee/Ingredientes`);
      }, 2000);
    } catch (err) {
      const axiosError = err as AxiosError;
      console.log(axiosError);
      setLoading(false);
      notify('Algo salió mal! Status: ' + axiosError.response?.status, 'error');
    }
  }

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
      ingredienteData.status === 200 && setIngrediente(ingredienteData.data);
      setCategoria(ingredienteData.data.rubroArticulo);
      setUnidadDeMedida(ingredienteData.data.unidadMedida);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    id !== undefined && setPropsOfExistentIngredient();
  }, []);

  return (
    <div className="relative bg-white py-6 dark:bg-neutral-800 sm:py-8 lg:py-12 ">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8 lg:px-20">
        <div className="mb-5 flex w-full items-center justify-between ">
          <div className="flex flex-col ">
            <h2 className=" text-center text-2xl font-bold text-gray-800 dark:text-white  lg:text-4xl">
              {id === undefined ? (
                <>
                  <span className="block">Carga de registro </span>
                </>
              ) : (
                <>
                  <span>Edición de registro </span>
                </>
              )}
            </h2>{' '}
            <h3 className="mb-4 text-start  text-xl font-bold text-amber-400 md:mb-6 ">
              Ingrediente | Artículo - Insumo
            </h3>
          </div>
        </div>

        <form
          encType="multipart/form-data"
          className={`mx-auto grid max-w-2xl items-center gap-4 sm:grid-cols-3 lg:gap-10 ${styles} text-end dark:text-white`}
          onSubmit={(e) => handleSubmit(e)}
        >
          <label htmlFor="denominacion" className="lg:text-2xl">
            Denominación
          </label>
          <input
            name={'denominacion'}
            id={'denominacion'}
            className="col-span-2 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none
            ring-amber-400 transition duration-100 focus:ring dark:border-neutral-400 dark:bg-neutral-700 dark:text-white"
            onChange={(e) => handleChange(e, ingrediente, setIngrediente)}
            value={ingrediente.denominacion || ''}
            placeholder="Denominación..."
            required
          />
          <label htmlFor="precioCompra" className="lg:text-2xl">
            Precio de Compra
          </label>
          <input
            name={'precioCompra'}
            id={'precioCompra'}
            type="number"
            placeholder='Precio de Compra...'
            className="col-span-2 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none
            ring-amber-400 transition duration-100 focus:ring dark:border-neutral-400 dark:bg-neutral-700 dark:text-white"
            onChange={(e) => handleChange(e, ingrediente, setIngrediente)}
            value={ingrediente.precioCompra || ''}
            required
          />
          <label htmlFor="precioVenta" className="lg:text-2xl">
            Precio de Venta
          </label>
          <input
            name={'precioVenta'}
            id={'precioVenta'}
            type="number"
            className="col-span-2 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none
            ring-amber-400 transition duration-100 focus:ring dark:border-neutral-400 dark:bg-neutral-700 dark:text-white"
            onChange={(e) => handleChange(e, ingrediente, setIngrediente)}
            placeholder='Precio de Venta...'
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
            className="col-span-2 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none
            ring-amber-400 transition duration-100 focus:ring dark:border-neutral-400 dark:bg-neutral-700 dark:text-white"
            onChange={(e) => handleChange(e, ingrediente, setIngrediente)}
            placeholder='Stock Actual...'
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
            className="col-span-2 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none
            ring-amber-400 transition duration-100 focus:ring dark:border-neutral-400 dark:bg-neutral-700 dark:text-white"
            onChange={(e) => handleChange(e, ingrediente, setIngrediente)}
            value={ingrediente.stockMinimo || ''}
            placeholder='Stock Mínimo...'
            required
          />
          <label htmlFor="urlImagen" className="lg:text-2xl">
            Imagen del insumo
          </label>
          <div className="col-span-2 flex flex-col gap-3">
            {id !== undefined && (
              <img
                src={ingrediente.urlImagen?.toString()}
                alt={'img'}
                className="mx-auto h-72  w-full rounded-md border-4 border-amber-400 dark:border-neutral-400 mix-blend-multiply dark:mix-blend-normal object-cover
                "
              ></img>
            )}
            <input
              name="imagen"
              id="imagen"
              type="file"
              className="col-span-2 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none
              ring-amber-400 transition duration-100 focus:ring dark:border-neutral-400 dark:bg-neutral-700 dark:text-white"
              onChange={(e) => handleImageChange(e, imagen, setImagen)}
              {...(ingrediente.id === null ? { required: true } : {})}
            />
          </div>
          <label htmlFor="idRubroPadre" className="lg:text-2xl">
            Categoría
          </label>
          <div className="col-span-2 flex items-center gap-5 z-0">
            {categoria.id === null && (
              <CategoryModal
                fatherSetter={setCategoria}
                id={categoria.id !== null ? categoria.id : undefined}
              />
            )}
            {categoria.id !== null && (
              <span
                className="col-span-2 w-full rounded border bg-gray-50 px-3 py-2 text-start text-gray-800 outline-none
              ring-amber-400 transition duration-100 focus:ring dark:border-neutral-400 dark:bg-neutral-700 dark:text-white"
              >
                {categoria.denominacion}
              </span>
            )}
            {categoria.id !== null && (
              <Button
                callback={() => {
                  setCategoria(base_category_object);
                }}
                type="button"
                content="x"
                color="rojo"
              />
            )}
          </div>

          <label htmlFor="idUnidadDeMedida" className="lg:text-2xl">
            Unidad de medida
          </label>
          <div className="col-span-2 flex items-center gap-5 ">
            {unidadDeMedida.id === null && <UnidadDeMedidaModal fatherSetter={setUnidadDeMedida} />}
            {unidadDeMedida.id !== null && (
              <span
                className="col-span-2 w-full rounded border bg-gray-50 px-3 py-2 text-start text-gray-800 outline-none
              ring-amber-400 transition duration-100 focus:ring dark:border-neutral-400 dark:bg-neutral-700 dark:text-white"
              >
                {unidadDeMedida.denominacion}
              </span>
            )}
            {unidadDeMedida.id !== null && (
              <Button
                callback={() => {
                  setUnidadDeMedida(base_unidad_object);
                }}
                type="button"
                content="x"
                color="rojo"
              />
            )}
          </div>
          <div className="relative z-0 col-span-3 flex w-full gap-3">
            <Button callback={buildIngrediente} type="submit" content="add" fullsize={true} />
            {isLoading && (
              <div className="absolute -right-20 flex items-center">
                <ClipLoader size={45} aria-label="Loading Spinner" data-testid="loader" />
              </div>
            )}
          </div>
        </form>
        <ToastAlert />
      </div>
    </div>
  );
};
