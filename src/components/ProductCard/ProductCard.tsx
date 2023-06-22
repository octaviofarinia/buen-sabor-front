import { Link } from 'react-router-dom';
import { Producto } from '../../Interfaces/ABM/Producto';
import { Button } from '../Botones/Button';

interface ProductCardProps {
  producto: Producto;
}
const agregarAlCarrito = () => {
  console.log('agregar al carrito');
};
export const ProductCard = ({ producto }:ProductCardProps) => {
  return (
    <div className="">
      <Link
        to={`/Productos/Detalle/${producto.id}`}
        className="group relative mb-2 block h-80 overflow-hidden rounded-lg bg-gray-100 dark:bg-neutral-900 lg:mb-3"
      >
        <img
          src={producto.urlImagen || ''}
          loading="lazy"
          alt={producto.denominacion?.toString()}
          className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
        />
      </Link>

      <div className="flex flex-col gap-3  py-2 text-neutral-800  transition duration-100  dark:text-white lg:text-lg xl:text-3xl">
        <h5 className="hover:text-amber-400">{producto.denominacion}</h5>

        <div className="flex items-end justify-between gap-2 ">
          <h6 className="hover:text-red-600">${producto.precioVenta}</h6>
          <Button
            color="amarillo"
            type="button"
            content="Agregar al carrito"
            callback={() => agregarAlCarrito}
          />
        </div>
      </div>
    </div>
  );
};
