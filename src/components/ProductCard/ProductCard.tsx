import React from 'react';
import { Link } from 'react-router-dom';
import { Producto } from '../../Interfaces/Producto';

interface ProductCardProps {
  producto: Producto;
}

export const ProductCard: React.FC<ProductCardProps> = ({ producto }) => {
  return (
    <div>
      <Link
        to="#"
        className="group relative mb-2 block h-80 overflow-hidden rounded-lg bg-gray-100 dark:bg-neutral-900 lg:mb-3"
      >
        <img
          src={producto.imgRoute || ''}
          loading="lazy"
          alt={producto.imgRoute || ''}
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
          className="hover:gray-800 mb-1 text-gray-500 dark:text-gray-300 transition duration-100 lg:text-lg"
        >
          {producto.nombre}
        </a>

        <div className="flex items-end gap-2">
          {producto.id === '1' ? (
            <span className="font-bold text-gray-800 dark:text-white lg:text-lg">
              ${Number(producto.precio) / 2}
            </span>
          ) : (
            <span className="font-bold text-gray-800 dark:text-white lg:text-lg">${producto.precio}</span>
          )}
          {producto.id === '1' && (
            <span className="mb-0.5 text-red-500 dark:text-red-400 line-through">
              ${producto.precio}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
