import { ChangeEvent, useEffect, useState } from 'react';
import { Producto } from '../Interfaces/ABM/Producto';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { AxiosError } from 'axios';
import { ToastAlert, notify } from '../components/Toast/ToastAlert';
import { getAllProductos } from '../API/SpecializedEndpoints/ProductoRequests/ProductoRequests';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { simpleHandleChange } from '../Utils/FormUtils';

export const Products = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [inputValue, setInputValue] = useState('');
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

  const filteredProducts = productos.filter(
    (product) =>
      product.denominacion !== null &&
      product.denominacion.toLowerCase().includes(inputValue.toLowerCase())
  );
  return (
    <div className="bg-white pb-6 dark:bg-neutral-800">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="pt-4 text-4xl font-bold text-gray-800 dark:text-gray-100">
            Nuestra selección
          </h2>
          <div className="relative">
            <input
              type="text"
              className="rounded border bg-gray-50 px-3 py-2 pl-8 text-gray-800
            outline-none ring-amber-400 transition duration-100 focus:ring focus:ring-amber-400 dark:border-neutral-400 dark:bg-neutral-700 dark:text-white"
              placeholder="Filtrar..."
              onChange={(e) => simpleHandleChange(e, inputValue, setInputValue)}
            />
            <FontAwesomeIcon icon={faSearch} className="absolute  top-3 left-2 text-neutral-400" />
          </div>
        </div>
        <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 ">
          {filteredProducts.map((product) => (
            <ProductCard producto={product} key={product.id} />
          ))}
        </div>
      </div>
      <ToastAlert />
    </div>
  );
};
