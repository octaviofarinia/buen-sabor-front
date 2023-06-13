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
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-lg px-4 md:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* images - start */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={producto.urlImagen !== null ? producto.urlImagen : ''}
                  loading="lazy"
                  alt={producto.denominacion !== null ? producto.denominacion : ''}
                  className="h-full w-full object-cover object-center"
                />
                {/* <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
                  En venta
                </span> */}
              </div>
              {/* <div className="grid grid-cols-2 gap-4">
                <div className="overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src="https://images.unsplash.com/flagged/photo-1571366992791-2ad2078656cb?auto=format&q=75&fit=crop&w=250"
                    loading="lazy"
                    alt="Photo by Himanshu Dewangan"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src="https://images.unsplash.com/flagged/photo-1571366992968-15b65708ee76?auto=format&q=75&fit=crop&w=250"
                    loading="lazy"
                    alt="Photo by Himanshu Dewangan"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div> */}
            </div>
            {/* images - end */}
            {/* content - start */}
            <div className="md:py-8">
              {/* name - start */}
              <div className="mb-2 md:mb-3">
                <h5 className="mb-0.5 inline-block text-xl text-amber-400">El Buen Sabor</h5>
                <h2 className="text-2xl font-bold text-neutral-800 dark:text-white lg:text-3xl">
                  {producto.denominacion}
                </h2>
              </div>
              {/* name - end */}
              {/* price - start */}
              <div className="mb-4">
                <div className="flex items-end gap-2">
                  <h2 className="text-xl font-bold text-gray-800 md:text-2xl">
                    ${producto.precioVenta}
                  </h2>
                </div>
              </div>
              {/* price - end */}
              {/* shipping notice - start */}
              <div className="mb-6 flex items-center gap-2 text-gray-500">
                <FontAwesomeIcon icon={faClock} />
                <span className="text-sm">
                  Tiempo estimado de demora: {producto.tiempoEstimadoCocina}
                </span>
              </div>
              {/* shipping notice - end */}
              {/* buttons - start */}
              <div className="flex gap-2.5">
                <Button
                  color="amarillo"
                  type="button"
                  callback={() => {}}
                  content="Agregar al carrito"
                />
              </div>
              {/* buttons - end */}
              {/* description - start */}
              <div className="mt-10 ">
                <div className="mb-3 text-lg font-semibold text-neutral-800 dark:text-white">
                  <h5 className="text-2xl">Descripción</h5>
                </div>
                <p className="text-neutral-500 dark:text-zinc-400">{producto.descripcion}</p>
              </div>
              {/* description - end */}
            </div>
            {/* content - end */}
          </div>
        </div>
      </div>

      <ToastAlert />
    </div>
  );
};
