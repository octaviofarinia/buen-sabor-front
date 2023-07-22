import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { save, update } from '../../../API/Requests/BaseRequests';
import { RubroArticulo } from '../../../Interfaces/ABM/RubroArticulo';
import { base_category } from '../../../Interfaces/ABM/InterfaceDelivery';
import { CategoryModal } from './Modal/CategoriaModal';
import { getCategoryComplete } from '../../../API/Requests/CategoriaRequests/CategoriaRequests';
import { ToastAlert, notify } from '../../Toast/ToastAlert';
import { Button } from '../../Botones/Button';
import { ClipLoader } from 'react-spinners';
import { AxiosError } from 'axios';

export const RubroArticuloAddOrUpdate = () => {
  const { id } = useParams();
  const [categoria, setCategoria] = useState<RubroArticulo>(base_category);
  const [categoryFather, setCategoryFather] = useState<RubroArticulo>(base_category);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let status = 0;
    setLoading(true);
    try {
      if (id) {
        const request = await update({
          endpoint: 'rubros-articulos',
          object: categoria,
          id: Number(id),
        });
        status = request.status;
      } else {
        const request = await save({
          endpoint: 'rubros-articulos',
          object: categoria,
        });
        status = request.status;
      }
      setLoading(false);
      status === (200 || 201) ? notify('Exito', 'success') : notify('Algo salió mal!', 'error');
      setTimeout(() => {
        navigate(`/employee/ABM/RubroArticulos`);
      }, 2000);
    } catch (error) {
      const AxiosError = error as AxiosError;
      console.log(AxiosError);
      setLoading(false);
      notify('Algo salió mal! Request Status: ' + AxiosError.response?.status, 'error');
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  }

  const buildPersistibleObject = () => {
    categoryFather.id !== null &&
      categoria.id == categoryFather.id &&
      (categoria.rubroPadre = categoryFather.rubroPadre),
      (categoria.idRubroPadre = categoryFather.id);
    notify('Se cargo el registro ', 'success');
    setLoading(false);
  };

  const setPropsOfExistentCategoria = async () => {
    try {
      const response = await getCategoryComplete(Number(id));
      setCategoria(response)
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    id !== undefined && setPropsOfExistentCategoria();
  }, []);
  return (
    <div className="relative min-h-600 bg-white py-6 dark:bg-neutral-800 sm:py-8 lg:py-12 ">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8 lg:px-20">
        <div className="mb-10 flex w-full items-center justify-between md:mb-16">
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
              Categoría | Rubro - Artículo
            </h3>
          </div>
        </div>

        <form
          className={`mx-auto grid max-w-2xl items-center gap-4 text-end dark:text-white sm:grid-cols-3 lg:gap-10`}
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
            onChange={(e) => handleChange(e)}
            value={categoria.denominacion || ''}
            placeholder="Denominación..."
            required
          />

          <label htmlFor="idRubroPadre" className="lg:text-2xl">
            ID de Categoría padre
          </label>
          <div className="col-span-2 flex items-center gap-5">
            {categoryFather.id === null && (
              <CategoryModal
                fatherSetter={setCategoryFather}
                id={categoria.id !== null ? categoria.id : undefined}
              />
            )}
            {categoryFather.id !== null && (
              <span
                className="col-span-2 w-full rounded border bg-gray-50 px-3 py-2 text-start text-gray-800 outline-none
              ring-amber-400 transition duration-100 focus:ring dark:border-neutral-400 dark:bg-neutral-700 dark:text-white"
              >
                {categoryFather.denominacion}
              </span>
            )}
            {categoryFather.id !== null && (
              <Button
                callback={() => {
                  setCategoryFather(base_category);
                }}
                type="button"
                content="x"
                color="rojo"
              />
            )}
          </div>

          <input
            name={'idRubroPadre'}
            id={'idRubroPadre'}
            className="hidden"
            onChange={(e) => handleChange(e)}
            value={categoryFather?.id || 0}
          />
          <div className="relative z-0 col-span-3 flex w-full gap-3">
            <Button callback={buildPersistibleObject} type="submit" content="add" fullsize={true} />
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
