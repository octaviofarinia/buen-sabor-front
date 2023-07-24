import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  base_category,
  base_ingredient,
  base_unidad,
} from '../../../Interfaces/ABM/InterfaceDelivery';
import { ArticuloInsumo } from '../../../Interfaces/ABM/ArticuloInsumo';
import { RubroArticulo } from '../../../Interfaces/ABM/RubroArticulo';
import { UnidadDeMedidaModal } from './Modal/UnidadDeMedidaModal';
import { UnidadDeMedida } from '../../../Interfaces/ABM/UnidadDeMedida';
import { CategoryModal } from './Modal/CategoriaModal';
import {
  createIngredienteRegister,
  updateIngredienteRegister,
} from '../../../API/Requests/IngredienteRequests/IngredienteRequests';
import { handleChange, handleImageChange } from '../../../Utils/FormUtils';
import { Button } from '../../Botones/Button';
import { ClipLoader } from 'react-spinners';
import { ToastAlert, notify } from '../../Toast/ToastAlert';
import { AxiosError } from 'axios';
import { HardDeleteButton } from '../../Botones/HardDeleteButton';
import { getOne } from '../../../API/Requests/BaseRequests';
import { useAuth0 } from '@auth0/auth0-react';

export const IngredienteAddOrUpdate = () => {
  const { id } = useParams();
  const [ingrediente, setIngrediente] = useState<ArticuloInsumo>(base_ingredient);
  const [categoria, setCategoria] = useState<RubroArticulo>(base_category);
  const [unidadDeMedida, setUnidadDeMedida] = useState<UnidadDeMedida>(base_unidad);
  const [imagen, setImagen] = useState<File | null>(null);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    ingrediente.idRubroArticulo = categoria.id;
    ingrediente.rubroArticulo = categoria;
    ingrediente.idUnidadMedida = unidadDeMedida.id;
    ingrediente.unidadMedida = unidadDeMedida;
    if (id) {
      await getAccessTokenSilently()
        .then(async (accessToken) => {
          await updateIngredienteRegister({
            id: id,
            imagen: imagen,
            token: accessToken,
            ingrediente: ingrediente,
          });
          notify('Exito', 'success');
        })
        .catch((err) => {
          const axiosError = err as AxiosError;
          notify(axiosError.message, 'error');
        });
    } else {
      await getAccessTokenSilently()
        .then(async (accessToken) => {
          await createIngredienteRegister({
            id: null,
            imagen: imagen,
            token: accessToken,
            ingrediente: ingrediente,
          });
          notify('Exito', 'success');
        })
        .catch((err) => {
          const axiosError = err as AxiosError;
          notify(axiosError.message, 'error');
          console.log(axiosError);
        });
    }

    setTimeout(() => {
      navigate(`/employee/ABM/Ingredientes`);
    }, 2000);

    setLoading(false);
  }

  const setPropsOfExistentIngredient = async () => {
    try {
      await getAccessTokenSilently()
        .then(async (accessToken) => {
          const ingredienteData = await getOne({
            id: Number(id),
            endpoint: 'articulos-insumo',
            token: accessToken,
          });
          setIngrediente(ingredienteData);
          setCategoria(ingredienteData.rubroArticulo);
          setUnidadDeMedida(ingredienteData.unidadMedida);
          notify('Se cargo el registro', 'success');
        })
        .catch((err) => {
          const axiosError = err as AxiosError;
          notify(axiosError.message, 'error');
        });

      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    id !== undefined && setPropsOfExistentIngredient();
  }, []);

  return (
    <div className="relative bg-neutral-100 py-6 dark:bg-neutral-800 sm:py-8 lg:py-12 ">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8 lg:px-20">
        <div className="mb-5 flex w-full items-center justify-between ">
          <div className="flex flex-col ">
            <h2 className=" text-center text-2xl font-bold text-gray-800 dark:text-neutral-100  lg:text-4xl">
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
          {id !== undefined && <HardDeleteButton id={Number(id)} endpoint={'articulos-insumo'} />}
        </div>

        <form
          encType="multipart/form-data"
          className={`mx-auto grid max-w-2xl items-center gap-4 text-end dark:text-neutral-100 sm:grid-cols-3 lg:gap-10`}
          onSubmit={(e) => handleSubmit(e)}
        >
          <label htmlFor="denominacion" className="lg:text-2xl">
            Denominación
          </label>
          <input
            name={'denominacion'}
            id={'denominacion'}
            type="text"
            placeholder="Denominación..."
            className="col-span-2 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none
            ring-amber-400 transition duration-100 focus:ring dark:border-neutral-400 dark:bg-neutral-700 dark:text-neutral-100"
            onChange={(e) => handleChange(e, ingrediente, setIngrediente)}
            value={ingrediente.denominacion || ''}
            required
          />
          <label htmlFor="precioCompra" className="lg:text-2xl">
            Precio de Compra
          </label>
          <input
            name={'precioCompra'}
            id={'precioCompra'}
            type="number"
            placeholder="Precio de Compra..."
            className="col-span-2 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none
            ring-amber-400 transition duration-100 focus:ring dark:border-neutral-400 dark:bg-neutral-700 dark:text-neutral-100"
            onChange={(e) => handleChange(e, ingrediente, setIngrediente)}
            value={ingrediente.precioCompra || ''}
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
            ring-amber-400 transition duration-100 focus:ring dark:border-neutral-400 dark:bg-neutral-700 dark:text-neutral-100"
            onChange={(e) => handleChange(e, ingrediente, setIngrediente)}
            placeholder="Stock Actual..."
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
            ring-amber-400 transition duration-100 focus:ring dark:border-neutral-400 dark:bg-neutral-700 dark:text-neutral-100"
            onChange={(e) => handleChange(e, ingrediente, setIngrediente)}
            value={ingrediente.stockMinimo || ''}
            placeholder="Stock Mínimo..."
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
                className="mx-auto h-72  w-full rounded-md border-4 border-amber-400 object-cover mix-blend-multiply dark:border-neutral-400 dark:mix-blend-normal
                "
              ></img>
            )}
            
            <input
              name="imagen"
              id="imagen"
              type="file"
              className="col-span-2 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none
            ring-amber-400 transition duration-100 focus:ring dark:border-neutral-400 dark:bg-neutral-700 dark:text-neutral-100"
              onChange={(e) => handleImageChange(e, imagen, setImagen)}
              {...(ingrediente.id === null ? { required: true } : {})}
            />
          </div>
          <label htmlFor="idRubroPadre" className="col-span-1 lg:text-2xl">
            Categoría
          </label>
          <div className="col-span-2 flex items-center gap-5">
            {categoria.id == null && (
              <>
                <label>No posee</label>
                <CategoryModal setRubroArticulo={setCategoria} id={categoria.id} />
              </>
            )}
            {categoria.id != null && (
              <>
                <span
                  className="col-span-2 w-full rounded border bg-neutral-100 px-3 py-2 text-start text-neutral-800 outline-none
              ring-amber-400 transition duration-100 focus:ring dark:border-neutral-400 dark:bg-neutral-700 dark:text-neutral-100"
                >
                  {categoria.denominacion}
                </span>
                <Button
                  callback={() => {
                    setCategoria(base_category);
                  }}
                  type="button"
                  content="x"
                  color="rojo"
                />
              </>
            )}
          </div>

          <label htmlFor="idRubroPadre" className="col-span-1 lg:text-2xl">
            Unidad de Medida
          </label>
          <div className="col-span-2 flex items-center gap-5">
            {unidadDeMedida.id == null && (
              <>
                <label>No posee</label>
                <UnidadDeMedidaModal setUnidadMedida={setUnidadDeMedida} id={unidadDeMedida.id} />
              </>
            )}
            {unidadDeMedida.id != null && (
              <>
                <span
                  className="col-span-2 w-full rounded border bg-neutral-100 px-3 py-2 text-start text-neutral-800 outline-none
              ring-amber-400 transition duration-100 focus:ring dark:border-neutral-400 dark:bg-neutral-700 dark:text-neutral-100"
                >
                  {unidadDeMedida.denominacion}
                </span>
                <Button
                  callback={() => {
                    setUnidadDeMedida(base_unidad);
                  }}
                  type="button"
                  content="x"
                  color="rojo"
                />
              </>
            )}
          </div>
          <div className="relative z-0 col-span-3 flex w-full gap-3">
            <Button callback={() => {}} type="submit" content="add" fullsize={true} />
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
