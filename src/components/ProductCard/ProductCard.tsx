import { Link } from 'react-router-dom';
import { Producto } from '../../Interfaces/ABM/Producto';
import { Button } from '../Botones/Button';
import { CartContext } from '../../context/CarritoProvider';
import { useContext } from 'react';
import { ToastAlert, notify } from '../Toast/ToastAlert';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
interface ProductCardProps {
  producto: Producto;
}

export const ProductCard = ({ producto }: ProductCardProps) => {
  const carritoContext = useContext(CartContext);
  const { user } = useAuth0();

  useEffect(() => {
    return () => {};
  }, [user]);
  return (
    <div className="">
      <Link
        to={`/Productos/Detalle/${producto.id}`}
        className="group relative mb-2 block h-80 overflow-hidden rounded-lg bg-neutral-50 dark:bg-neutral-900 lg:mb-3"
      >
        <img
          src={producto.urlImagen || ''}
          loading="lazy"
          alt={producto.denominacion?.toString()}
          className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
        />
      </Link>

      <div className="flex flex-col gap-3  py-2 text-lg  text-neutral-800 transition  duration-100 dark:text-white lg:text-xl xl:text-2xl">
        <h5 className="hover:text-amber-400">{producto.denominacion}</h5>

        <div className="flex items-end justify-between gap-2 text-lg lg:text-xl xl:text-2xl">
          <h6 className="hover:text-red-600">${producto.precioVenta}</h6>
          <Button
            color="amarillo"
            type="button"
            content="Agregar al carrito"
            callback={ () => {
             carritoContext.addToCart({ idArticuloManufacturado: producto.id, cantidad: 1 });
              user?.sub !==undefined && notify('Se agrego ' + producto.denominacion + ' al carrito', 'success');
            }}
            textSize="text-lg"
          />
        </div>
      </div>
    </div>
  );
};
