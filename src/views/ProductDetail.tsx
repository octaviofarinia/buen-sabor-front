import { useEffect, useState } from 'react';
import { Producto } from '../Interfaces/Producto';
import { AxiosError } from 'axios';
import { ToastAlert, notify } from '../components/Toast/ToastAlert';
import { getProductoRegister } from '../components/ABM/API/SpecializedEndpoints/ProductoRequests/ProductoRequests';
import { useNavigate, useParams } from 'react-router-dom';
import { base_product_object } from '../Interfaces/InterfaceDelivery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../components/Botones/Button';

export const ProductDetailView = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState<Producto>(base_product_object);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const getProducto = async () => {
    setLoading(true);
    try {
      const response = await getProductoRegister(id);
      setProducto(response.data);
      setLoading(false);
    } catch (err) {
      const AxiosError = err as AxiosError;
      setLoading(false);
      notify('No se pudo cargar el producto: Volviendo al Inicio', 'error');
      notify('Status: ' + AxiosError.response?.status, 'error');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  useEffect(() => {
    getProducto();
    console.log('Producto');
  }, []);
  return (
    <div className="bg-white pb-6 dark:bg-neutral-800">
      <section className="body-font overflow-hidden text-neutral-600 dark:text-white">
        <div className="container mx-auto px-5 py-24">
          <div className="mx-auto flex flex-wrap lg:w-4/5">
            <div className="mb-6 w-full lg:mb-0 lg:w-1/2 lg:py-6 lg:pr-10">
              <h2 className="title-font text-sm tracking-widest text-neutral-500 dark:text-zinc-200">el buen sabor</h2>
              <h1 className="title-font mb-4 text-3xl font-medium text-neutral-900 dark:text-white">
                {producto.denominacion}
              </h1>
              <div className="mb-4 flex">
                <a className="flex-grow border-b-2 border-amber-400 py-2 px-1 text-lg text-amber-400">
                  Descripción
                </a>
              </div>
              <p className="mb-4 leading-relaxed">
                {producto.descripcion}
              </p>
              <div className="flex border-t border-neutral-200 py-2">
                <span className="text-neutral-500 dark:text-zinc-200">Tiempo estimado</span>
                <span className="ml-auto text-neutral-900 dark:text-zinc-100">{producto.tiempoEstimadoCocina} minutos</span>
              </div>
              <div className="flex border-t border-neutral-200 py-2">
                <span className="text-neutral-500 dark:text-zinc-200">Precio</span>
                <span className="ml-auto text-neutral-900 dark:text-zinc-100">${producto.precioVenta}</span>
              </div>
              <div className="mb-6 flex border-t border-b border-neutral-200 py-2">
                <span className="text-neutral-500 dark:text-zinc-200">Cantidad</span>
                <span className="ml-auto text-neutral-900 dark:text-zinc-100">1</span>
              </div>
              <div className="flex justify-between">
              <h5 className="title-font text-2xl font-medium text-neutral-900 dark:text-zinc-100">${producto.precioVenta}</h5>
                <Button content='Agregar al carrito' color='amarillo' type='button' callback={()=>{}}/>
              </div>
            </div>
            <img
              alt="ecommerce"
              className="h-64 w-full rounded object-cover object-center  lg:h-auto lg:w-1/2"
              src={producto.urlImagen?.toString()}
            />
          </div>
        </div>
      </section>
      <ToastAlert />
    </div>
  );
};
