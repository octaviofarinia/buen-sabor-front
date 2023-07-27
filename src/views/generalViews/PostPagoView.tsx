import { useNavigate } from 'react-router-dom';
import { Banner } from '../../components/Banner/Banner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faFaceDizzy, faWarning } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { backend_url } from '../../Utils/ConstUtils';
import { Factura, Pedido } from '../../Interfaces/ClientSide/Pedido';
import CartConstants from '../../Utils/Constants/CartConstants';
import { useCart } from '../../context/CarritoProvider';
import { ToastAlert, notify } from '../../components/Toast/ToastAlert';
import { delayedRedirect } from '../../Utils/NavigationUtils';
import { useAuth0 } from '@auth0/auth0-react';
export const PostPagoView = () => {
  const navigate = useNavigate();
  const { resetCart } = useCart();
  const [status, setStatus] = useState<boolean>(true);
  const [timer, setTimer] = useState<number>(15);
  const { getAccessTokenSilently } = useAuth0();

  const generarPedido = async () => {
    if (localStorage.getItem('informacionPedido') !== null) {
      let informacionPedidoString = localStorage.getItem('informacionPedido');
      localStorage.removeItem('informacionPedido');

      console.log(informacionPedidoString);
      let factura: Factura = {
        mpPaymentId: null,
        mpMerchantOrderId: null,
        mpPreferenceId: null,
        mpPaymentType: null,
        formaPago: CartConstants.EFECTIVO,
      };
      if (informacionPedidoString !== null) {
        let pedido: Pedido = JSON.parse(informacionPedidoString);
        pedido.factura = factura;
        await getAccessTokenSilently()
          .then(async (accessToken) => {
            await axios.post(`${backend_url}/pedidos`, pedido, {
              headers: {
                Authorization: 'Bearer ' + accessToken,
              },
            });
            resetCart();
            setStatus(true);
          })
          .catch((err) => {
            const error = err as AxiosError;
            notify(error.message, 'error');
          });
      }
    }
  };

  useEffect(() => {
    generarPedido();
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    const timeout = delayedRedirect(() => navigate('/'), 15000);
    return () => {
      clearInterval(interval);
      clearInterval(timeout);
    };
  }, []);
  return (
    <div>
      {localStorage.getItem('informacionPedido') === null ? (
        <Banner
          color={'rose'}
          icon={<FontAwesomeIcon icon={faFaceDizzy} size="lg" />}
          text={`Si no recibiste el mail de confirmación deberias contactarnos. De otra manera, no hay información de tu pedido aquí. Serás redirigido en ${timer} segundos`}
          homeButton={true}
        />
      ) : (
        <Banner
          color={status ? 'green' : 'rose'}
          icon={<FontAwesomeIcon icon={status ? faCheck : faWarning} size="lg" />}
          text={
            (status
              ? `Listo. Generando el pedido, puedes volver al inicio. Recuerda abonar el pedido al recibirlo.`
              : 'Ups. Ocurrio un error. ') + `Seras redirigido en ${timer} segundos`
          }
        />
      )}

      <ToastAlert />
    </div>
  );
};
