import {
  faCheckCircle,
  faCreditCard,
  faMotorcycle,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState, useContext } from 'react';
import { Button } from '../components/Botones/Button';
import { handleChange, handleSelectChange } from '../Utils/FormUtils';
import { ToastAlert } from '../components/Toast/ToastAlert';
import { Domicilio } from '../Interfaces/Domicilio';
import { useAuth0 } from '@auth0/auth0-react';
import { getDomicilios } from '../API/SpecializedEndpoints/DomicilioRequests/DomicilioRequests';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { calcularSubtotal, calcularTiempoEspera } from '../Utils/CalculosUtils';
import { useCart } from '../context/CarritoProvider';

interface CarritoInterface {
  medioDePago: 'EFECTIVO' | 'MERCADO_PAGO';
  metodoDeEnvio: 'RETIRO' | 'DELIVERY';
  domicilioId?: number;
}

export const CarritoView = () => {
  const { cart } = useCart();
  const { user } = useAuth0();
  const navigate = useNavigate();
  const [domicilios, setDomicilios] = useState<Domicilio[]>([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(false);
  const [informacionPedido, setInformacionPedido] = useState<CarritoInterface>({
    medioDePago: 'EFECTIVO',
    metodoDeEnvio: 'RETIRO',
    domicilioId: undefined,
  });

  const getDomiciliosUsuario = async () => {
    const response = await getDomicilios(user?.sub != undefined ? user?.sub : '');
    setDomicilios(response.data);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    informacionPedido.domicilioId = Number(selectedOption);
  };

  useEffect(() => {
    console.log(user?.sub)
    getDomiciliosUsuario();
  }, [user]);
  return cart.length !== 0 ? (
    <div className="grid grid-cols-3">
      <form
        className="col-span-3 flex w-full flex-wrap bg-zinc-100 px-5 py-5 dark:bg-neutral-800 xl:col-span-2"
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
              <h2 className="title-font mb-1 border-b-4 border-amber-400 text-3xl font-medium text-neutral-900 dark:text-zinc-100 ">
                Tus productos
              </h2>

              {cart.map((item) => (
                <div className="mb-1 " key={item.id}>
                  <div className="flex h-full flex-col items-center justify-center border-b-2 border-neutral-200 p-3 text-center sm:flex-row sm:justify-start sm:text-left ">
                    <img
                      alt={item.denominacion != null ? item.denominacion.toString() : ''}
                      className="mb-4 h-48 w-48 flex-shrink-0 rounded-lg object-cover object-center sm:mb-0"
                      src={item.urlImagen != null ? item.urlImagen.toString() : ''}
                    />
                    <div className=" flex-grow sm:pl-8">
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
          <div className="flex flex-grow flex-col items-start pl-6 sm:flex-row sm:items-center ">
            <div className="inline-flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-500">
              <FontAwesomeIcon icon={faCreditCard} size="2xl" />
            </div>
            <div className="mt-6 w-full flex-grow sm:mt-0 sm:pl-6">
              <h2 className="title-font mb-1 border-b-4 border-amber-400 text-3xl font-medium text-neutral-900 dark:text-zinc-100 ">
                Medios de pago
              </h2>

              <div className="flex flex-col items-start justify-center gap-6 p-4 text-2xl ">
                <div className="flex flex-col  gap-2 rounded-full border-4 border-amber-300 py-2 px-4 sm:flex-row md:gap-3">
                  <label className="flex items-center gap-3 dark:text-zinc-100">
                    <input
                      type="radio"
                      value="EFECTIVO"
                      name="medioDePago"
                      required
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
                      required
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
            <div className="mt-6 w-full flex-grow sm:mt-0 sm:pl-6">
              <h2 className="title-font mb-1 border-b-4 border-amber-400 text-3xl font-medium text-neutral-900 dark:text-zinc-100 ">
                Método de Envio
              </h2>
              <div className="flex flex-col items-start justify-center gap-6 p-4 text-2xl ">
                <div className="flex flex-col  gap-2 rounded-full border-4 border-amber-300 py-2 px-4 sm:flex-row md:gap-3">
                  <label className="flex items-center gap-3 dark:text-zinc-100">
                    <input
                      type="radio"
                      value="RETIRO"
                      name="metodoDeEnvio"
                      defaultChecked
                      required
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
                      required
                      className="h-4 w-4 border-neutral-300 bg-neutral-100 text-amber-400 focus:rounded-full focus:ring-2 focus:ring-amber-500 dark:border-neutral-600 dark:bg-neutral-700 dark:ring-offset-neutral-800 dark:focus:ring-amber-400"
                      onChange={(e) => handleChange(e, informacionPedido, setInformacionPedido)}
                    />
                    <p>Delivery</p>
                  </label>
                  {loading && (
                    <div className="absolute -right-20 flex items-center">
                      <ClipLoader size={45} aria-label="Loading Spinner" data-testid="loader" />
                    </div>
                  )}
                </div>
                {informacionPedido.metodoDeEnvio === 'DELIVERY' && (
                  <div className="flex flex-col px-4 md:gap-3">
                    <h2 className="text-xl text-neutral-800 dark:text-zinc-100">
                      Selecciona tu domicilio
                    </h2>
                    <select
                      name="domicilio"
                      required
                      className="focus:shadow-outline block w-full appearance-none rounded border border-neutral-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-neutral-500 focus:outline-none"
                      value={selectedOption}
                      onChange={(e) => handleSelectChange(e, selectedOption, setSelectedOption)}
                    >
                      {domicilios.map((domicilio) => (
                        <option key={domicilio.id}
                        
                        value={domicilio.id?.toString()}>
                          {domicilio.calle + ' ' + domicilio.numero}
                        </option>
                      ))}
                    </select>
                    <h2 className="text-xl text-neutral-800 dark:text-zinc-100">
                      O agrega uno nuevo
                    </h2>
                    <Button
                      type="button"
                      content="Agrega un domicilio"
                      color="rojo"
                      callback={() => navigate('/Domicilio')}
                    />
                  </div>
                )}
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
              <FontAwesomeIcon icon={faCheckCircle} size="2xl" />
            </div>
            <div className="mt-6 w-full flex-grow sm:mt-0 sm:pl-6">
              <h2 className="title-font mb-1 border-b-4 border-amber-400 text-3xl font-medium text-neutral-900 dark:text-zinc-100 ">
                Confirmación de Pedido
              </h2>
              <div className="w-full ">
                <h3 className="title-font my-3 text-xl font-medium text-neutral-900 dark:text-zinc-100">
                  Información del pedido
                </h3>
                <div className="flex border-t border-neutral-200 py-2">
                  <span className="text-neutral-500 dark:text-zinc-200">
                    Tiempo estimado de entrega
                  </span>
                  <span className="ml-auto text-neutral-900 dark:text-zinc-100">
                    {calcularTiempoEspera(cart)} minutos
                  </span>
                </div>
                <div className="flex border-t border-neutral-200 py-2">
                  <span className="text-neutral-500 dark:text-zinc-200">Subtotal</span>
                  <span className="ml-auto text-neutral-900 dark:text-zinc-100">
                    ${calcularSubtotal(cart)}
                  </span>
                </div>
                <div className="flex border-t border-neutral-200 py-2">
                  <Button
                    callback={() => handleSubmit}
                    color="rojo"
                    fullsize={true}
                    type="submit"
                    textSize="text-2xl"
                    content="Confirmar pedido y pagar"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastAlert />
      </form>
      <div className="col-span-1 hidden h-full  bg-zinc-100  px-5 py-5 text-neutral-500 dark:bg-neutral-800 xl:block ">
        <div className="flex w-full flex-col items-center justify-center">
          <img src={'/logoBlack.png'} alt="logo" />
          <h2 className="text-center text-4xl text-neutral-900 dark:text-zinc-100">
            ¡Gracias por elegirnos!
          </h2>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center gap-4 py-5 px-5">
      <ToastAlert />
      <h2 className="flex-auto rounded-md bg-rose-500 p-8 text-center text-4xl text-zinc-100">
        Ups! Aun no has agregado nada
      </h2>
      <Button
        content="Volver al inicio"
        callback={() => navigate('/')}
        textSize="text-2xl xl:text-4xl"
        type="button"
      />
    </div>
  );
};
