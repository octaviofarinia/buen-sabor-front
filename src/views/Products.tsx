import { useEffect, useState } from 'react';
import { Producto } from '../Interfaces/Producto';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { AxiosError } from 'axios';
import { ToastAlert, notify } from '../components/Toast/ToastAlert';
import { getAllRegisters } from '../components/ABM/API/APIHandler';
import { APIRouter } from '../components/ABM/API/APIRouter';
import { getAllProductos } from '../components/ABM/API/SpecializedEndpoints/ProductoRequests/ProductoRequests';
import { useNavigate } from 'react-router-dom';

export const Products = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const getProductos = async () => {
    setLoading(true);
    try {
      const response = await getAllProductos();

      setProductos(response.data);
      setLoading(false);
    } catch (err) {
      const AxiosError = err as AxiosError;
      setLoading(false);
      notify('Ocurrio un error: Volviendo al Inicio', 'error');
      notify('Status: ' + AxiosError.response?.status, 'error');
     
      
    }
  };

  useEffect(() => {
    getProductos();
  }, []);
  return (
    <div className="bg-white pb-6 dark:bg-neutral-800">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="pt-4 text-4xl font-bold text-gray-800 dark:text-gray-100">
            Nuestra selección
          </h2>
        </div>
        <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 ">
          {productos.map((producto) => (
            <ProductCard producto={producto} key={producto.id} />
          ))}
        </div>
      </div>
      <ToastAlert />
    </div>
  );
};
