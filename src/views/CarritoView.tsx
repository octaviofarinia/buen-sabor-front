import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const CarritoView = () => {
  const carrito = [
    {
      id: 1,
      denominacion: 'Hamburguesa',
      descripcion: 'Una burga ',
      tiempoEstimadoCocina: 45,
      precioVenta: 1500.0,
      urlImagen: 'http://res.cloudinary.com/dxonpskcw/image/upload/v1685940959/productos/1.jpg',
      fechaBaja: null,
    },
    {
      id: 2,
      denominacion: 'Pancho',
      descripcion: 'Un pancho',
      tiempoEstimadoCocina: 25,
      precioVenta: 800.0,
      urlImagen: 'http://res.cloudinary.com/dxonpskcw/image/upload/v1686176934/productos/2.jpg',
      fechaBaja: '12/06/2023 - 02:54',
    },
  ];

  return (
    <div className="flex w-full flex-wrap px-5 py-24 md:w-10/12">
      <div className="relative mx-auto flex pt-10 pb-20 sm:items-center md:w-11/12">
        <div className="absolute inset-0 flex h-full w-6 items-center justify-center">
          <div className="pointer-events-none h-full w-1 bg-gray-200" />
        </div>
        <div className="title-font relative z-10 mt-10 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-medium text-white sm:mt-0">
          1
        </div>
        <div className="flex flex-grow flex-col items-start pl-6 sm:flex-row sm:items-center md:pl-8">
          <div className="inline-flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-500">
            <FontAwesomeIcon icon={faShoppingCart} size="2xl" />
          </div>
          <div className="mt-6 flex-grow sm:mt-0 sm:pl-6">
            <h2 className="title-font mb-1 text-xl font-medium text-gray-900">Tus productos</h2>
            {carrito.map((item)=>(
                <div>
<div className="p-4 lg:w-1/2">
  <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
    <img
      alt={item.denominacion.toString()}
      className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
      src={item.urlImagen.toString()}
    />
    <div className="flex-grow sm:pl-8">
      <h2 className="title-font font-medium text-lg text-gray-900">
      {item.denominacion}
      </h2>
      <h3 className="text-gray-500 mb-3">buen sabor</h3>
      <p className="mb-4">
       {item.descripcion}
      </p>
      <p className="mb-4">
       ${item.precioVenta}
      </p>
    </div>
  </div>
</div>

                </div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative mx-auto flex pb-20 sm:items-center md:w-11/12">
        <div className="absolute inset-0 flex h-full w-6 items-center justify-center">
          <div className="pointer-events-none h-full w-1 bg-gray-200" />
        </div>
        <div className="title-font relative z-10 mt-10 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-medium text-white sm:mt-0">
          2
        </div>
        <div className="flex flex-grow flex-col items-start pl-6 sm:flex-row sm:items-center md:pl-8">
          <div className="inline-flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-500">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="h-12 w-12"
              viewBox="0 0 24 24"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <div className="mt-6 flex-grow sm:mt-0 sm:pl-6">
            <h2 className="title-font mb-1 text-xl font-medium text-gray-900">The Catalyzer</h2>
            <p className="leading-relaxed">
              VHS cornhole pop-up, try-hard 8-bit iceland helvetica. Kinfolk bespoke try-hard cliche
              palo santo offal.
            </p>
          </div>
        </div>
      </div>
      <div className="relative mx-auto flex pb-20 sm:items-center md:w-11/12">
        <div className="absolute inset-0 flex h-full w-6 items-center justify-center">
          <div className="pointer-events-none h-full w-1 bg-gray-200" />
        </div>
        <div className="title-font relative z-10 mt-10 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-medium text-white sm:mt-0">
          3
        </div>
        <div className="flex flex-grow flex-col items-start pl-6 sm:flex-row sm:items-center md:pl-8">
          <div className="inline-flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-500">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="h-12 w-12"
              viewBox="0 0 24 24"
            >
              <circle cx={12} cy={5} r={3} />
              <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3" />
            </svg>
          </div>
          <div className="mt-6 flex-grow sm:mt-0 sm:pl-6">
            <h2 className="title-font mb-1 text-xl font-medium text-gray-900">The 400 Blows</h2>
            <p className="leading-relaxed">
              VHS cornhole pop-up, try-hard 8-bit iceland helvetica. Kinfolk bespoke try-hard cliche
              palo santo offal.
            </p>
          </div>
        </div>
      </div>
      <div className="relative mx-auto flex pb-10 sm:items-center md:w-11/12">
        <div className="absolute inset-0 flex h-full w-6 items-center justify-center">
          <div className="pointer-events-none h-full w-1 bg-gray-200" />
        </div>
        <div className="title-font relative z-10 mt-10 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-medium text-white sm:mt-0">
          4
        </div>
        <div className="flex flex-grow flex-col items-start pl-6 sm:flex-row sm:items-center md:pl-8">
          <div className="inline-flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-500">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="h-12 w-12"
              viewBox="0 0 24 24"
            >
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx={12} cy={7} r={4} />
            </svg>
          </div>
          <div className="mt-6 flex-grow sm:mt-0 sm:pl-6">
            <h2 className="title-font mb-1 text-xl font-medium text-gray-900">Neptune</h2>
            <p className="leading-relaxed">
              VHS cornhole pop-up, try-hard 8-bit iceland helvetica. Kinfolk bespoke try-hard cliche
              palo santo offal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
