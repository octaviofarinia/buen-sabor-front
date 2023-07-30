import {
  faCreditCard,
  faFaceSadCry,
  faListCheck,
  faMinus,
  faMotorcycle,
  faPlus,
  faShoppingCart,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Button } from '../../components/Botones/Button';
import { handleChange } from '../../Utils/FormUtils';
import { ToastAlert, notify } from '../../components/Toast/ToastAlert';
import { Domicilio } from '../../Interfaces/ClientSide/Domicilio';
import { useAuth0 } from '@auth0/auth0-react';
import { getDomicilios } from '../../API/Requests/DomicilioRequests/DomicilioRequests';
import { useNavigate } from 'react-router-dom';
import {
  calcularCostoEstimado,
  calcularSubtotal,
  calcularTiempoEspera,
} from '../../Utils/CalculosUtils';
import { useCart } from '../../context/CarritoProvider';
import axios, { AxiosError } from 'axios';
import { backend_url } from '../../Utils/ConstUtils';
import { Wallet } from '@mercadopago/sdk-react';
import CartConstants from '../../Utils/Constants/CartConstants';
import { base_pedido } from '../../Interfaces/ABM/InterfaceDelivery';
import { getProductosDelCarrito } from '../../API/Requests/PedidoRequests/CarritoRequest';
import { ArticuloManufacturado } from '../../Interfaces/ABM/ArticuloManufacturado';
import { Pedido } from '../../Interfaces/ClientSide/Pedido';
import { useTheme } from '../../context/ThemeProvider';
import { faFaceSmileWink } from '@fortawesome/free-regular-svg-icons';
import { Banner } from '../../components/Banner/Banner';

export const CarritoView = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, addToCart, reduceAmountFromCart } = useCart();
  const { user } = useAuth0();
  const { isDarkMode } = useTheme();
  const { getAccessTokenSilently } = useAuth0();
  const [domicilios, setDomicilios] = useState<Domicilio[]>([]);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [informacionPedido, setInformacionPedido] = useState<Pedido>(base_pedido);
  const [cartItems, setCartItems] = useState<ArticuloManufacturado[]>([]);

  const savePedidoData = () => {
    informacionPedido.auth0Id = user?.sub;
    if (informacionPedido.tipoEnvio === CartConstants.RETIRO_EN_LOCAL) {
      informacionPedido.idDomicilioEntrega = null;
    }
    informacionPedido.productos = cart;
    informacionPedido.total = calcularCostoEstimado(cart);
    informacionPedido.tiempoEstimadoFinalizacion = calcularTiempoEspera(cartItems);
    localStorage.setItem('informacionPedido', JSON.stringify(informacionPedido));
  };
  const getDomiciliosUsuario = async () => {
    await getAccessTokenSilently()
      .then(async (accessToken) => {
        const response = await getDomicilios(user?.sub!, accessToken);
        setDomicilios(response.data);
        informacionPedido.idDomicilioEntrega = response.data[0].id;
      })
      .catch((err) => {
        const error = err as AxiosError;
        notify(error.response?.data as string, 'error');
      });
  };
  const mercadoPagoPayment = async () => {
    await getAccessTokenSilently()
      .then(async (accessToken) => {
        const res = await axios.post(backend_url + '/mercado-pago/create-preference', cart, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        });
        if (res.data.id) {
          setPreferenceId(res.data.id);
        }
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.error(error);
        }
      });
  };

  const obtenerProductosDelCarrito = async () => {
    await getAccessTokenSilently()
      .then(async (accessToken) => {
        if (user?.sub !== undefined && user.sub) {
          const productos = await getProductosDelCarrito(user?.sub, accessToken);
          setCartItems(productos);
        }
      })
      .catch((err) => {
        const error = err as AxiosError;
        notify(error.response?.data as string, 'error');
      });
  };

  const validateStock = async () => {
    if (user?.sub !== undefined) {
      const cancelTokenSource = axios.CancelToken.source();
      if (cart.length > 0) {
        const requestUrl = `${backend_url}/pedidos/validar-stock`;
        await getAccessTokenSilently()
          .then(async (accessToken) => {
            const response = await axios.put(requestUrl, cart, {
              cancelToken: cancelTokenSource.token,
              headers: { Authorization: 'Bearer ' + accessToken },
            });
            if (response.data) {
              setInformacionPedido((prevInformacionPedido) => ({
                ...prevInformacionPedido,
                validated: true,
              }));
              setPreferenceId(null);
              mercadoPagoPayment();
              notify('Stock suficiente para el pedido', 'success');
            }
          })
          .catch((err) => {
            if (axios.isCancel(err)) {
              console.log('Request canceled:', err.message);
            } else {
              console.log('Error en la solicitud:', err);
            }
          });
      }
    }
  };

  const sendUserData = async () => {
    if (user) {
      await getAccessTokenSilently()
        .then(async (accessToken) => {
          await axios.post(
            `${backend_url}/usuarios/post_register_save`,
            {
              auth0Id: user?.sub,
              username: user.name,
              email: user.email,
            },
            { headers: { Authorization: 'Bearer ' + accessToken } }
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  const generateLifecycle = () => {
    savePedidoData();
    getDomiciliosUsuario();
    obtenerProductosDelCarrito();
    validateStock();
    sendUserData();
  };
  useEffect(() => {
    generateLifecycle();
    return () => {};
  }, [cart.length, user]);

  return cart.length !== 0 ? (
    <>
      <section className="body-font bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100">
        <ToastAlert />

        <form
          onSubmit={(e) => {
            e.preventDefault(), savePedidoData();
          }}
          className="container mx-auto flex flex-wrap px-5 py-10"
          onChange={() => {
            savePedidoData();
          }}
        >
          <div className="flex w-full flex-col flex-wrap">
            <div className=" md:py-6 md:pr-10">
              <div className="relative flex w-full pb-12 ">
                <div className="absolute inset-0 flex h-full w-10 items-center justify-center">
                  <div className="pointer-events-none h-full w-1 bg-neutral-200" />
                </div>
                <div className="relative z-10 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-500 text-white">
                  <FontAwesomeIcon icon={faShoppingCart} />
                </div>
                <div className="flex-grow pl-4 xl:grid xl:grid-cols-6">
                  <div className="flex flex-col xl:col-span-4">
                    <h2 className="title-font md:texl-2xl mb-1 text-xl font-bold tracking-wider text-neutral-900 dark:text-neutral-100 lg:text-3xl ">
                      Tus productos
                    </h2>
                    {cartItems.map((item, index) => (
                      <div
                        className="mb-1 flex flex-col border-b-2 border-neutral-200 py-2 pr-3 dark:border-neutral-500 md:flex-row md:gap-4 "
                        key={(item?.id + (item.denominacion ?? '')).toString()}
                      >
                        <img
                          alt={item.denominacion != null ? item.denominacion.toString() : ''}
                          className="mx-auto mb-4 h-48 w-full flex-shrink-0 rounded-lg object-cover object-center sm:mb-0 sm:h-60 md:w-72 "
                          src={item.urlImagen != null ? item.urlImagen.toString() : ''}
                        />
                        <div className=" flex-grow sm:pl-8">
                          <div className="flex h-full flex-col ">
                            <div>
                              <h2 className="title-font md:texl-2xl text-xl font-medium text-neutral-900 dark:text-neutral-300">
                                {item.denominacion}
                              </h2>
                              <h3 className="mb-3 text-lg text-amber-500 dark:text-neutral-300 md:text-xl">
                                buen sabor
                              </h3>
                              <p className="mb-4 text-sm font-light text-neutral-500 dark:text-neutral-300">
                                "{item.descripcion}"
                              </p>
                            </div>
                            <div className=" mt-auto ">
                              <div className="flex items-center justify-center gap-5 pb-5 sm:justify-start">
                                <Button
                                  content={<FontAwesomeIcon icon={faMinus} size="sm" />}
                                  type="button"
                                  color="negro"
                                  callback={() => {
                                    reduceAmountFromCart(cart[index]);
                                    validateStock();
                                  }}
                                  textSize="text-sm md:text-lg"
                                />
                                <h5 className="whitespace-nowrap text-base font-bold dark:text-neutral-300 md:text-lg lg:text-2xl">
                                  Cantidad: {cart[index]?.cantidad}
                                </h5>
                                <Button
                                  content={<FontAwesomeIcon icon={faPlus} size="sm" />}
                                  type="button"
                                  color="negro"
                                  callback={() => {
                                    addToCart(cart[index]);
                                    validateStock();
                                  }}
                                  textSize="text-sm md:text-lg"
                                />
                              </div>
                              <h5 className="mb-4 whitespace-nowrap text-center text-lg font-bold dark:text-neutral-300 sm:text-start lg:text-2xl">
                                Precio unitario:{' '}
                                <span className="text-green-500">${item.precioVenta}</span>
                              </h5>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-center p-4 md:flex-col md:items-stretch ">
                          <Button
                            content={<FontAwesomeIcon icon={faTrashCan} size="lg" />}
                            type="button"
                            color="rojo"
                            callback={() => {
                              removeFromCart(cart[index]);
                            }}
                            fullsize={true}
                            fullheight={true}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="col-span-2 hidden h-auto max-h-28  bg-neutral-100  px-5 py-5 text-neutral-500 dark:bg-neutral-800 xl:block ">
                    <div className="flex w-full flex-col items-center justify-center">
                      {isDarkMode ? (
                        <img src={'/logoWhite.png'} alt="logo" />
                      ) : (
                        <img src={'/logoBlack.png'} alt="logo" />
                      )}
                    </div>

                    <h2 className="text-center text-4xl text-neutral-900 dark:text-neutral-300">
                      ¡Gracias por elegirnos!
                    </h2>
                  </div>
                </div>
              </div>
              <div className="relative flex w-full pb-12">
                <div className="absolute inset-0 flex h-full w-10 items-center justify-center">
                  <div className="pointer-events-none h-full w-1 bg-neutral-200" />
                </div>
                <div className="relative z-10 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-500 text-white">
                  <FontAwesomeIcon icon={faCreditCard} />
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="title-font md:texl-2xl mb-1 text-xl font-bold tracking-wider text-neutral-900 dark:text-neutral-100 lg:text-3xl">
                    Medio de pago
                  </h2>
                  <div className=" flex flex-col gap-3 py-5">
                    <label className="flex items-center gap-3 text-lg dark:text-neutral-300 md:text-xl  lg:text-2xl">
                      <input
                        type="radio"
                        value={CartConstants.EFECTIVO}
                        name="medioDePago"
                        required
                        defaultChecked={true}
                        onChange={(e) =>
                          setInformacionPedido((prevInfo) => ({
                            ...prevInfo, // Copy the previous state
                            medioDePago: CartConstants.EFECTIVO, // Update the medioDePago property
                          }))
                        }
                        className="h-4 w-4 border-neutral-300 bg-neutral-100 text-amber-400 focus:rounded-full focus:ring-2 focus:ring-amber-500 dark:border-neutral-600 dark:bg-neutral-700 dark:ring-offset-neutral-800 dark:focus:ring-amber-400"
                      />
                      <p>Efectivo</p>
                    </label>

                    <label className="flex items-center gap-3 text-lg dark:text-neutral-300 md:text-xl  lg:text-2xl">
                      <input
                        type="radio"
                        value={CartConstants.MERCADO_PAGO}
                        required
                        name="medioDePago"
                        className="h-4 w-4 border-neutral-300 bg-neutral-100 text-amber-400 focus:rounded-full focus:ring-2 focus:ring-amber-500 dark:border-neutral-600 dark:bg-neutral-700 dark:ring-offset-neutral-800 dark:focus:ring-amber-400"
                        onChange={(e) => {
                          setInformacionPedido((prevInfo) => ({
                            ...prevInfo, // Copy the previous state
                            medioDePago: CartConstants.MERCADO_PAGO, // Update the medioDePago property
                          }));
                        }}
                      />
                      <p>Mercado Pago</p>
                    </label>
                  </div>

                  {informacionPedido.medioDePago === CartConstants.MERCADO_PAGO && (
                    <div className="pt-3">
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
            <div className="relative flex w-full pb-12">
              <div className="absolute inset-0 flex h-full w-10 items-center justify-center">
                <div className="pointer-events-none h-full w-1 bg-neutral-200" />
              </div>
              <div className="relative z-10 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-500 text-white">
                <FontAwesomeIcon icon={faMotorcycle} />
              </div>
              <div className="flex-grow pl-4">
                <h2 className="title-font md:texl-2xl mb-1 text-xl font-bold tracking-wider text-neutral-900 dark:text-neutral-100 lg:text-3xl">
                  ¿Lo retirás o te lo enviamos? <FontAwesomeIcon icon={faFaceSmileWink} />
                </h2>
                <div className=" flex flex-col gap-3 py-4">
                  <label className="flex items-center gap-3 text-lg dark:text-neutral-300 md:text-xl  lg:text-2xl">
                    <input
                      type="radio"
                      value={CartConstants.RETIRO_EN_LOCAL}
                      name="tipoEnvio"
                      defaultChecked
                      required
                      onChange={(e) => handleChange(e, informacionPedido, setInformacionPedido)}
                      className="h-4 w-4 border-neutral-300 bg-neutral-100 text-amber-400 focus:rounded-full focus:ring-2 focus:ring-amber-500 dark:border-neutral-600 dark:bg-neutral-700 dark:ring-offset-neutral-800 dark:focus:ring-amber-400"
                    />
                    <p>Retiro</p>
                  </label>

                  <label className="flex items-center gap-3 text-lg dark:text-neutral-300 md:text-xl  lg:text-2xl">
                    <input
                      type="radio"
                      value={CartConstants.DELIVERY}
                      name="tipoEnvio"
                      required
                      className="h-4 w-4 border-neutral-300 bg-neutral-100 text-amber-400 focus:rounded-full focus:ring-2 focus:ring-amber-500 dark:border-neutral-600 dark:bg-neutral-700 dark:ring-offset-neutral-800 dark:focus:ring-amber-400"
                      onChange={(e) => handleChange(e, informacionPedido, setInformacionPedido)}
                    />
                    <p>Delivery</p>
                  </label>
                </div>
                {informacionPedido.tipoEnvio === CartConstants.DELIVERY && (
                  <div className="flex flex-col gap-3 pt-5">
                    {domicilios.length != 0 && (
                      <>
                        <h2 className="text-lg text-neutral-800 dark:text-neutral-300 md:text-xl">
                          Selecciona tu domicilio
                        </h2>
                        <select
                          name="domicilio"
                          required
                          className="focus:shadow-outline block w-full appearance-none rounded border border-neutral-400 bg-neutral-100 px-4 py-2 pr-8 leading-tight text-neutral-900 shadow hover:border-neutral-500 focus:outline-none"
                          onChange={(e) => {
                            informacionPedido.idDomicilioEntrega = Number(e.target.value);
                          }}
                        >
                          {domicilios.map((domicilio) => (
                            <option
                              key={domicilio.id}
                              value={domicilio.id?.toString()}
                              className="text-neutral-900 "
                            >
                              {domicilio.calle + ' ' + domicilio.numero}
                            </option>
                          ))}
                        </select>
                      </>
                    )}
                    <h2 className="text-lg text-neutral-800 dark:text-neutral-300 md:text-xl">
                      Agrega uno nuevo
                    </h2>
                    <Button
                      type="button"
                      content="Agrega un domicilio"
                      color="rojo"
                      callback={() => navigate('/Domicilio')}
                      textSize="text-lg md:text-xl"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="relative flex w-full pb-12">
              <div className="absolute inset-0 flex h-full w-10 items-center justify-center">
                <div className="pointer-events-none h-full w-1 bg-neutral-200" />
              </div>
              <div className="relative z-10 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-500 text-white">
                <FontAwesomeIcon icon={faListCheck} />
              </div>
              <div className="flex-grow pl-4 ">
                <h2 className="title-font md:texl-2xl mb-1 text-xl font-bold tracking-wider text-neutral-900 dark:text-neutral-100 lg:text-3xl ">
                  Resumen
                </h2>
                <div className="w-full ">
                  <h3 className="title-font my-3 text-lg font-medium text-neutral-600 dark:text-neutral-300 md:text-xl lg:text-2xl ">
                    Información del pedido
                  </h3>
                  <div className="flex w-full border-t border-neutral-200 py-2 ">
                    <span className="text-neutral-500 dark:text-neutral-200">
                      Tiempo estimado de entrega
                    </span>
                    <span className="ml-auto text-center text-neutral-900 dark:text-neutral-300">
                      {calcularTiempoEspera(cartItems)} minutos
                    </span>
                  </div>
                  <div className="flex border-t border-neutral-200 py-2">
                    <span className="text-neutral-500 dark:text-neutral-200">Subtotal</span>
                    <span className="ml-auto text-center text-neutral-900 dark:text-neutral-300">
                      ${calcularSubtotal(cartItems, cart)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {informacionPedido.validated ? (
              <div className="flex w-full flex-col py-2  transition-all duration-300 ease-in-out ">
                {informacionPedido.medioDePago !== CartConstants.MERCADO_PAGO ? (
                  <Button
                    color="rojo"
                    fullsize={true}
                    type="submit"
                    textSize="text-2xl"
                    content="Confirmar pedido y pagar"
                    callback={() => {
                      savePedidoData();
                      navigate('/PostPayment');
                    }}
                  />
                ) : preferenceId !== null ? (
                  <Wallet
                    initialization={{ preferenceId: preferenceId }}
                    customization={{ texts: { action: 'pay' } }}
                  />
                ) : (
                  <Banner
                    color="rose"
                    text="Lo sentimos, pero hay un problema generando el link de Mercado Pago"
                    icon={<FontAwesomeIcon icon={faFaceSadCry} />}
                  />
                )}
              </div>
            ) : (
              <div>
                <Banner
                  color="rose"
                  text="Lo sentimos, pero no tenemos stock para generar tu pedido"
                  icon={<FontAwesomeIcon icon={faFaceSadCry} />}
                />
              </div>
            )}
          </div>
        </form>
      </section>
    </>
  ) : (
    <div className="flex justify-center gap-4 py-5 px-5">
      <ToastAlert />
      <h2 className="flex-auto rounded-md bg-rose-500 p-8 text-center text-4xl text-neutral-100">
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
