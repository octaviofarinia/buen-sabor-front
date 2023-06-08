import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './AddOrUpdate.module.css';
import { base_ingredient_object, base_product_object } from '../../../Interfaces/InterfaceDelivery';
import { Ingrediente } from '../../../Interfaces/Ingrediente';
import { Producto } from '../../../Interfaces/Producto';
import { IngredienteModal } from './Modal/IngredienteModal';
import TablaIngredientes from './TablaIngredientes';
import { DetalleProducto } from '../../../Interfaces/DetalleProducto';
import {
  updateProducto,
  getProductoRegister,
  createProducto,
} from '../API/SpecializedEndpoints/ProductoRequests/ProductoRequests';
import { getDetalles } from '../API/SpecializedEndpoints/ProductoRequests/DetalleProductoRequests';
import { handleChange, handleImageChange } from '../../../Utils/FormUtils';
import { Button } from '../../Botones/Button';
import { ClipLoader } from 'react-spinners';
import { ToastAlert, notify } from '../../Toast/ToastAlert';
import { AxiosError } from 'axios';

export const ProductoAddOrUpdate = () => {
  const { id } = useParams();
  const [imagen, setImagen] = useState<File | null>(null);
  const [detalle, setDetalle] = useState<DetalleProducto[]>([]);
  const [cantidad, setCantidad] = useState(0);
  const [producto, setProducto] = useState<Producto>(base_product_object);
  const [ingrediente, setIngrediente] = useState<Ingrediente>(base_ingredient_object);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let status = 0;
    setLoading(true);
    try {
      if (id) {
        console.log('put');
        const request = await updateProducto({
          producto: producto,
          detalles: detalle,
          imagen: imagen,
          id: id,
        });
        status = request;
      } else {
        console.log('post');
        const request = await createProducto({
          producto: producto,
          detalles: detalle,
          imagen: imagen,
        });
        status = request;
      }
      setLoading(false);
      status === (200 || 201) && notify('Exito', 'success');
      setTimeout(() => {
        navigate(`/employee/Productos`);
      }, 2000);
    } catch (err) {
      const axiosError = err as AxiosError;
      console.log(axiosError);
      setLoading(false);
      notify('Algo salió mal! Status: ' + axiosError.response?.status, 'error');
    }
  }

  function handleIngredientesList(e: React.ChangeEvent<HTMLInputElement>) {
    setIngrediente({
      ...ingrediente,
      [e.target.name]: e.target.value,
    });
  }

  const confirmarIngrediente = () => {
    const nuevoDetalle: DetalleProducto = {
      idArticuloInsumo: ingrediente.id,
      denominacion: ingrediente.denominacion,
      cantidad: cantidad,
    };
    setDetalle([...detalle, nuevoDetalle]);
    notify('Se agrego el ingrediente', 'success');
    setCantidad(0);
    setIngrediente(base_ingredient_object);
  };

  const setPropsOfExistentProduct = async () => {
    try {
      const productoData = await getProductoRegister(id);
      const detalleData = await getDetalles({ id: id });

      detalleData.status === 200 && setDetalle(detalleData.data);
      productoData.status === 200 && setProducto(productoData.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    id !== undefined && setPropsOfExistentProduct();
  }, []);

  return (
    <div className="relative bg-white py-6 dark:bg-neutral-800 sm:py-8 lg:py-12 ">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8 lg:px-20">
        <div className="mb-5 flex w-full items-center justify-between ">
          <div className="flex flex-col ">
            <h2 className=" text-start text-2xl font-bold text-gray-800 dark:text-white  lg:text-4xl">
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
              Producto | Artículo - Manufacturado
            </h3>
          </div>
        </div>

        <form
          encType="multipart/form-data"
          className={`mx-auto grid w-11/12 items-center gap-4 sm:grid-cols-3 lg:gap-10 ${styles} text-end dark:text-white`}
          onSubmit={(e) => handleSubmit(e)}
        >
          <label htmlFor="denominacion" className="lg:text-2xl">
            Denominacion
          </label>
          <input
            name={'denominacion'}
            id={'denominacion'}
            type="text"
            className="col-span-2 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none
            ring-amber-400 transition duration-100 focus:ring dark:border-neutral-400 dark:bg-neutral-700 dark:text-white"
            onChange={(e) => handleChange(e, producto, setProducto)}
            placeholder="Denominación"
            value={producto.denominacion || ''}
            required
          />
          <label htmlFor="descripcion" className="lg:text-2xl">
            Descripcion
          </label>
          <input
            name={'descripcion'}
            id={'descripcion'}
            type="text"
            className="col-span-2 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none
            ring-amber-400 transition duration-100 focus:ring dark:border-neutral-400 dark:bg-neutral-700 dark:text-white"
            onChange={(e) => handleChange(e, producto, setProducto)}
            value={producto.descripcion || ''}
            placeholder="Descripción..."
            required
          />
          <label htmlFor="tiempoEstimadoCocina" className="lg:text-2xl">
            Tiempo estimado (Min)
          </label>
          <input
            name={'tiempoEstimadoCocina'}
            id={'tiempoEstimadoCocina'}
            type="number"
            className="col-span-2 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none
            ring-amber-400 transition duration-100 focus:ring dark:border-neutral-400 dark:bg-neutral-700 dark:text-white"
            onChange={(e) => handleChange(e, producto, setProducto)}
            placeholder="Tiempo Estimado..."
            value={producto.tiempoEstimadoCocina || ''}
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
            onChange={(e) => handleChange(e, producto, setProducto)}
            placeholder="Precio de Venta..."
            value={producto.precioVenta || ''}
            required
          />

          <label htmlFor="urlImagen" className="lg:text-2xl">
            Imagen del producto
          </label>
          <div className="col-span-2 flex flex-col gap-3">
            {id !== undefined && (
              <img
                src={producto.urlImagen?.toString()}
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
              ring-amber-400 transition duration-100 focus:ring dark:border-neutral-400 dark:bg-neutral-700 dark:text-white"
              onChange={(e) => handleImageChange(e, imagen, setImagen)}
              {...(producto.id === null ? { required: true } : {})}
            />
          </div>

          <label htmlFor="idRubroArticulo" className="lg:text-2xl">
            Ingredientes
          </label>
          <div className="z-0 col-span-2 flex items-center gap-5">
            {ingrediente.id === null && <IngredienteModal fatherSetter={setIngrediente} />}
            {ingrediente.id !== null && (
              <div className="col-span-2 flex w-full gap-3">
                <span
                  className="flex w-full items-center rounded border bg-gray-50 px-3 py-2 text-start text-gray-800
            outline-none ring-amber-400 transition duration-100 focus:ring dark:border-neutral-400 dark:bg-neutral-700 dark:text-white"
                >
                  {ingrediente.denominacion}
                </span>
                <input
                  name={'cantidad'}
                  id={'cantidad'}
                  type="number"
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none
                  ring-amber-400 transition duration-100 focus:ring dark:border-neutral-400 dark:bg-neutral-700 dark:text-white"
                  onChange={(e) => {
                    setCantidad(Number(e.target.value));
                  }}
                  placeholder="Cantidad..."
                  value={cantidad || ''}
                  required
                />
                <input
                  name={'id'}
                  id={'idRubroArticulo'}
                  className="hidden"
                  onChange={(e) => handleIngredientesList(e)}
                  value={ingrediente?.id || 0}
                  required
                />
                {ingrediente.id !== null && (
                  <Button
                    callback={() => {
                      setIngrediente(base_ingredient_object);
                    }}
                    type="button"
                    content="x"
                    color="rojo"
                  />
                )}

                {ingrediente.id !== null && (
                  <Button
                    callback={() => {
                      confirmarIngrediente();
                    }}
                    type="button"
                    content="Confirmar Ingrediente"
                  />
                )}
              </div>
            )}
          </div>

          <div className="relative z-0 col-span-2 col-start-2 flex w-full gap-3">
            <Button callback={() => {}} type="submit" content="add" fullsize={true} />
            {isLoading && (
              <div className="absolute -right-20 flex items-center">
                <ClipLoader size={45} aria-label="Loading Spinner" data-testid="loader" />
              </div>
            )}
          </div>
        </form>
        {detalle.length > 0 && <TablaIngredientes detalles={detalle} setDetalle={setDetalle} />}
        <ToastAlert />
      </div>
    </div>
  );
};
