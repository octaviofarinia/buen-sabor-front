import { useEffect, useState } from 'react';
import { ProductCard } from '../components/ProductCard/ProductCard';
import axios, { AxiosError } from 'axios';
import { ToastAlert, notify } from '../components/Toast/ToastAlert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSadTear, faHand, faSearch } from '@fortawesome/free-solid-svg-icons';
import { simpleHandleChange } from '../Utils/FormUtils';
import { MoonLoader } from 'react-spinners';
import { useLocation } from 'react-router-dom';
import { backend_url } from '../Utils/ConstUtils';
import { Button } from '../components/Botones/Button';
import { ArticuloManufacturado } from '../Interfaces/ABM/ArticuloManufacturado';

export const ProductsView = () => {
  const [productos, setProductos] = useState<ArticuloManufacturado[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filtro = queryParams.get('filtro');

  const getProductos = async (filtro: string | null) => {
    setLoading(true);
    const cancelToken = axios.CancelToken.source();
    axios
      .get(backend_url + '/articulos-manufacturados/listar', {
        params: { filtro: filtro },
        cancelToken: cancelToken.token,
      })
      .then((res) => {
        setProductos(res.data);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          notify('Se cancelo la request', 'success');
        } else {
          notify('Ocurrio un error', 'error');
        }
      });
    setLoading(false);
    return () => cancelToken.cancel();
  };

  useEffect(() => {
    getProductos(filtro);
    return () => {};
  }, []);

  return loading ? (
    <div className="flex justify-center p-20">
      <MoonLoader size={120} color="#FBBF24" />
    </div>
  ) : (
    <div className="bg-neutral-100 pb-6 dark:bg-neutral-800">
      <div className="mx-auto max-w-screen-2xl overflow-hidden md:px-8">
        <div className="mb-6 flex w-full items-end justify-center gap-4">
          {productos.length === 0 ? (
            <div className="bg-normal-50 w-full pt-6 sm:pt-8 lg:pt-12">
              <div className="mx-auto max-w-screen-2xl p-4 md:px-8">
                <div
                  className={`relative flex flex-col flex-wrap rounded-lg bg-rose-500 p-8 shadow-lg sm:flex-nowrap sm:items-center sm:justify-center sm:gap-3 sm:pr-8 md:gap-6 md:px-8`}
                >
                  <h2 className="text-xl text-neutral-100 md:text-2xl">
                    Lo sentimos! No tenemos el producto que buscas!{' '}
                    <FontAwesomeIcon icon={faFaceSadTear} size="lg" />
                  </h2>
                  <Button
                    content={
                      <p>
                        Mostrar todos los productos <FontAwesomeIcon icon={faHand} size="xl" />
                      </p>
                    }
                    type="button"
                    color="negro"
                    textSize="text-lg"
                    callback={() => {
                      getProductos(null);
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex w-full flex-col p-3">
              <div className="flex flex-col justify-between gap-3 sm:flex-row">
                <h2 className="pt-4 text-4xl font-bold text-neutral-800 dark:text-neutral-100">
                  Nuestra selección
                </h2>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full rounded border bg-neutral-100 px-3 py-2 pl-8 text-neutral-800 outline-none
              ring-amber-400 transition duration-100 focus:ring focus:ring-amber-400 dark:border-neutral-400 dark:bg-neutral-700 dark:text-white sm:w-auto"
                    placeholder="Filtrar..."
                    onChange={(e) => simpleHandleChange(e, inputValue, setInputValue)}
                  />
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="absolute top-3 left-2 text-neutral-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-5 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3">
                {productos
                  .filter((product) =>
                    product.denominacion?.toLowerCase().includes(inputValue || '')
                  )
                  .map((product) => (
                    <ProductCard producto={product} key={product.id} />
                  ))}
              </div>

              <ToastAlert />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
