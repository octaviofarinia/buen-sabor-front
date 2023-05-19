import { Link } from 'react-router-dom';
import { Producto } from '../../Interfaces/Producto';
interface ProductCardProp {
  producto: Producto;
}

export const ProductCard = ({ producto }: ProductCardProp) => {
  return (
    <div>
      <Link
        to="#"
        className="group relative mb-2 block h-80 overflow-hidden rounded-lg bg-gray-100 lg:mb-3"
      >
        <img
          src={producto.imgRoute != (null || undefined) ? producto.imgRoute : ''}
          loading="lazy"
          alt={producto.imgRoute != (null || undefined) ? producto.imgRoute : ''}
          className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
        />

        {producto.id === '1' && (
          <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
            Oferta
          </span>
        )}
      </Link>

      <div>
        <a
          href="#"
          className="hover:gray-800 mb-1 text-gray-500 transition duration-100 lg:text-lg"
        >
          {producto.nombre}
        </a>

        <div className="flex items-end gap-2">
          {producto.id === '1' ? (
            <span className="font-bold text-gray-800 lg:text-lg">
              ${Number(producto.precio) / 2}
            </span>
          ) : (
            <span className="font-bold text-gray-800 lg:text-lg">${producto.precio}</span>
          )}
          {producto.id === '1' && (
            <span className="mb-0.5 text-red-500 line-through">${producto.precio}</span>
          )}
        </div>
      </div>
    </div>
  );
};
