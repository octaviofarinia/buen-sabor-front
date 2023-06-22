import {
  faCreditCard,
  faMotorcycle,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Button } from '../components/Botones/Button';
import { handleChange } from '../Utils/FormUtils';
import { ToastAlert, notify } from '../components/Toast/ToastAlert';

interface CarritoInterface {
  medioDePago: 'EFECTIVO' | 'MERCADO_PAGO';
  metodoDeEnvio: 'RETIRO' | 'DELIVERY';

}

export const CarritoView = () => {
  const [informacionPedido, setInformacionPedido] = useState<CarritoInterface>({
    medioDePago: 'EFECTIVO',
    metodoDeEnvio: 'RETIRO',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(informacionPedido);
  };
  const carrito = [
    {
      id: 1,
      denominacion: 'Hamburguesa',
      descripcion: 'Una burga ',
      tiempoEstimadoCocina: 45,
      precioVenta: 1500.0,
      urlImagen: 'http://res.cloudinary.com/dxonpskcw/image/upload/v1685940959/productos/6.jpg',
      fechaBaja: null,
    },
    {
      id: 2,
      denominacion: 'Pancho',
      descripcion: 'Un pancho',
      tiempoEstimadoCocina: 25,
      precioVenta: 800.0,
      urlImagen: 'http://res.cloudinary.com/dxonpskcw/image/upload/v1686176934/productos/5.jpg',
      fechaBaja: '12/06/2023 - 02:54',
    },
  ];

  return (
    <form
      className="flex w-full flex-wrap bg-zinc-100 px-5   py-24 dark:bg-neutral-800"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="relative mx-auto flex w-full pt-10 pb-20 sm:items-center md:w-11/12">
        <div className="absolute inset-0 flex h-full w-6 items-center justify-center">
          <div className="pointer-events-none h-full w-1 bg-neutral-200" />
        </div>
        <div className="title-font relative z-10 mt-10 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-medium text-zinc-100 sm:mt-0">
          1
        </div>
        <div className="flex flex-grow flex-col items-start pl-6 sm:flex-row sm:items-center md:pl-8">
          <div className="inline-flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-500">
            <FontAwesomeIcon icon={faShoppingCart} size="2xl" />
          </div>
          <div className="mt-6 w-full flex-grow sm:mt-0 sm:pl-6">
            <h2 className="title-font mb-1 border-b-4 border-amber-400 text-3xl font-medium text-neutral-900 dark:text-zinc-100 xl:w-1/2">
              Tus productos
            </h2>
            {carrito.map((item) => (
              <div className="mb-1 lg:w-1/2" key={item.id}>
                <div className="flex h-full flex-col items-center justify-center border-b-2 border-neutral-200 p-3 text-center sm:flex-row sm:justify-start sm:text-left ">
                  <img
                    alt={item.denominacion.toString()}
                    className="mb-4 h-48 w-48 flex-shrink-0 rounded-lg object-cover object-center sm:mb-0"
                    src={item.urlImagen.toString()}
                  />
                  <div className="h-48 flex-grow sm:pl-8">
                    <div className="flex h-full flex-col ">
                      <div>
                        <h2 className="title-font text-3xl font-medium text-neutral-900 dark:text-zinc-100">
                          {item.denominacion}
                        </h2>
                        <h3 className="mb-3 text-xl text-amber-500 dark:text-zinc-100">
                          buen sabor
                        </h3>
                        <p className="mb-4 dark:text-zinc-100">{item.descripcion}</p>
                      </div>
                      <div className=" mt-auto">
                        <h5 className="mb-4 text-2xl font-bold dark:text-zinc-100">
                          ${item.precioVenta}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative mx-auto flex w-full pb-20 sm:items-center md:w-11/12">
        <div className="absolute inset-0 flex h-full w-6 items-center justify-center">
          <div className="pointer-events-none h-full w-1 bg-neutral-200" />
        </div>
        <div className="title-font relative z-10 mt-10 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-medium text-zinc-100 sm:mt-0">
          2
        </div>
        <div className="flex flex-grow flex-col items-start pl-6 sm:flex-row sm:items-center md:pl-8">
          <div className="inline-flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-500">
            <FontAwesomeIcon icon={faCreditCard} size="2xl" />
          </div>
          <div className="mt-6 w-full  flex-grow sm:mt-0 sm:pl-6">
            <h2 className="title-font mb-1 border-b-4 border-amber-400 text-3xl font-medium text-neutral-900 dark:text-zinc-100 xl:w-1/2">
              Medio de pago
            </h2>

            <div className="flex flex-col items-start justify-center gap-6 p-4 text-2xl md:justify-start md:p-8">
              <div className="flex flex-col  gap-2 rounded-full border-4 border-amber-300 py-2 px-4 sm:flex-row md:gap-3">
                <label className="flex items-center gap-3 dark:text-zinc-100">
                  <input
                    type="radio"
                    value="EFECTIVO"
                    name="medioDePago"
                    defaultChecked
                    onChange={(e) => handleChange(e, informacionPedido, setInformacionPedido)}
                    className="h-4 w-4 border-neutral-300 bg-neutral-100 text-amber-400 focus:rounded-full focus:ring-2 focus:ring-amber-500 dark:border-neutral-600 dark:bg-neutral-700 dark:ring-offset-neutral-800 dark:focus:ring-amber-400"
                  />
                  <p>Efectivo</p>
                </label>

                <label className="flex items-center gap-3 dark:text-zinc-100">
                  <input
                    type="radio"
                    value="MERCADO_PAGO"
                    name="medioDePago"
                    className="h-4 w-4 border-neutral-300 bg-neutral-100 text-amber-400 focus:rounded-full focus:ring-2 focus:ring-amber-500 dark:border-neutral-600 dark:bg-neutral-700 dark:ring-offset-neutral-800 dark:focus:ring-amber-400"
                    onChange={(e) => handleChange(e, informacionPedido, setInformacionPedido)}
                  />
                  <p>Mercado Pago</p>
                </label>
              </div>
              {informacionPedido.medioDePago === 'MERCADO_PAGO' && (
                <div>
                  <img
                    src="https://imgmp.mlstatic.com/org-img/banners/ar/medios/785X40.jpg"
                    title="Mercado Pago - Medios de pago"
                    alt="Mercado Pago - Medios de pago"
                    width="785"
                    height="40"
                    className="hidden md:block"
                  />
                  <img
                    src="https://imgmp.mlstatic.com/org-img/banners/ar/medios/120X240.jpg"
                    title="Mercado Pago - Medios de pago"
                    alt="Mercado Pago - Medios de pago"
                    width="120"
                    height="240"
                    className="block md:hidden "
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="relative mx-auto flex w-full pb-20 sm:items-center md:w-11/12">
        <div className="absolute inset-0 flex h-full w-6 items-center justify-center">
          <div className="pointer-events-none h-full w-1 bg-neutral-200" />
        </div>
        <div className="title-font relative z-10 mt-10 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-medium text-zinc-100 sm:mt-0">
          3
        </div>
        <div className="flex flex-grow flex-col items-start pl-6 sm:flex-row sm:items-center md:pl-8">
          <div className="inline-flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-500">
            <FontAwesomeIcon icon={faMotorcycle} size="2xl" />
          </div>
          <div className="mt-6 flex-grow sm:mt-0 sm:pl-6">
            <h2 className="title-font mb-1 border-b-4 border-amber-400 text-3xl font-medium text-neutral-900 dark:text-zinc-100 xl:w-1/2">
              Método de Envio
            </h2>
            <div className="flex items-center justify-center gap-6 p-4 text-2xl md:justify-start md:p-8">
              <div className="flex flex-col  gap-2 rounded-full border-4 border-amber-300 py-2 px-4 sm:flex-row md:gap-3">
                <label className="flex items-center gap-3 dark:text-zinc-100">
                  <input
                    type="radio"
                    value="RETIRO"
                    name="metodoDeEnvio"
                    defaultChecked
                    onChange={(e) => handleChange(e, informacionPedido, setInformacionPedido)}
                    className="h-4 w-4 border-neutral-300 bg-neutral-100 text-amber-400 focus:rounded-full focus:ring-2 focus:ring-amber-500 dark:border-neutral-600 dark:bg-neutral-700 dark:ring-offset-neutral-800 dark:focus:ring-amber-400"
                  />
                  <p>Retiro</p>
                </label>

                <label className="flex items-center gap-3 dark:text-zinc-100">
                  <input
                    type="radio"
                    value="DELIVERY"
                    name="metodoDeEnvio"
                    className="h-4 w-4 border-neutral-300 bg-neutral-100 text-amber-400 focus:rounded-full focus:ring-2 focus:ring-amber-500 dark:border-neutral-600 dark:bg-neutral-700 dark:ring-offset-neutral-800 dark:focus:ring-amber-400"
                    onChange={(e) => handleChange(e, informacionPedido, setInformacionPedido)}
                  />
                  <p>Delivery</p>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative mx-auto flex w-full pb-10 sm:items-center md:w-11/12">
        <div className="absolute inset-0 flex h-full w-6 items-center justify-center">
          <div className="pointer-events-none h-full w-1 bg-neutral-200" />
        </div>
        <div className="title-font relative z-10 mt-10 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-medium text-zinc-100 sm:mt-0">
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
            <h2 className="title-font mb-1 text-xl font-medium text-neutral-900">Neptune</h2>
            <p className="leading-relaxed">
              VHS cornhole pop-up, try-hard 8-bit iceland helvetica. Kinfolk bespoke try-hard cliche
              palo santo offal.
            </p>
            <Button
              callback={() => handleSubmit}
              color="rojo"
              fullsize={true}
              type="submit"
              content="Confirmar pedido"
            />
          </div>
        </div>
      </div>
      <ToastAlert />
    </form>
  );
};
