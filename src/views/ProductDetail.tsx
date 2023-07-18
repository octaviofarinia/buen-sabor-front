import { useEffect, useState } from 'react';
import { Producto } from '../Interfaces/ABM/Producto';
import { ToastAlert, notify } from '../components/Toast/ToastAlert';
import { getProductoRegister } from '../API/SpecializedEndpoints/ProductoRequests/ProductoRequests';
import { useNavigate, useParams } from 'react-router-dom';
import { base_product } from '../Interfaces/ABM/InterfaceDelivery';
import { Button } from '../components/Botones/Button';
import { useCart } from '../context/CarritoProvider';
import { delayedRedirect } from '../Utils/NavigationUtils';

export const ProductDetailView = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState<Producto>(base_product);
  const carritoContext = useCart();
  const navigate = useNavigate();
  const getProducto = async () => {
    try {
      const response = await getProductoRegister(id);
      setProducto(response.data);
    } catch (err) {
      notify('Ocurrio un error. Redirigiendo al inicio', 'error');
      delayedRedirect(() => navigate('/'), 5000);
    }
  };

  useEffect(() => {
    return () => {
      getProducto();
    };
  }, []);
  return (
    <div className="bg-white pb-6 dark:bg-neutral-800 px-5 ">
      <section className="body-font overflow-hidden text-neutral-600 dark:text-white">
        <div className="container mx-auto py-24">
          <div className="mx-auto flex flex-wrap lg:w-4/5 justify-center ">
            <div className="mb-6 w-full lg:mb-0 lg:w-1/2 lg:py-6 lg:pr-10">
              <h2 className="title-font text-sm tracking-widest text-neutral-500 dark:text-zinc-200">
                el buen sabor
              </h2>
              <h1 className="title-font mb-4 text-3xl font-medium text-neutral-900 dark:text-white">
                {producto.denominacion}
              </h1>
              <div className="mb-4 flex">
                <a className="flex-grow border-b-2 border-amber-400 py-2 px-1 text-lg text-amber-400">
                  Descripción
                </a>
              </div>
              <p className="mb-4 leading-relaxed">{producto.descripcion}</p>
              <div className="flex border-t border-neutral-200 py-2">
                <span className="text-neutral-500 dark:text-zinc-200">Tiempo estimado</span>
                <span className="ml-auto text-neutral-900 dark:text-zinc-100">
                  {producto.tiempoEstimadoCocina} minutos
                </span>
              </div>
              <div className="flex border-y border-neutral-200 py-2">
                <span className="text-neutral-500 dark:text-zinc-200">Precio Unitario</span>
                <span className="ml-auto text-neutral-900 dark:text-zinc-100">
                  ${producto.precioVenta}
                </span>
              </div>
              <div className="flex justify-between pt-2">
                <h5 className="title-font text-2xl font-medium text-neutral-900 dark:text-zinc-100">
                  ${producto.precioVenta}
                </h5>
                <Button
                  content="Agregar al carrito"
                  color="amarillo"
                  type="button"
                  callback={() => {
                    carritoContext.addToCart({ idArticuloManufacturado: producto.id, cantidad: 1 }),
                      notify('Se agrego ' + producto.denominacion + ' al carrito', 'success');
                  }}
                  textSize='text-lg lg:text-xl'
                />
              </div>
            </div>
            <img
              alt="ecommerce"
              className="h-64 max-w-xl rounded-lg object-cover object-center  md:h-auto lg:w-1/2"
              src={producto.urlImagen?.toString()}
            />
          </div>
        </div>
      </section>
      <ToastAlert />
    </div>
  );
};
