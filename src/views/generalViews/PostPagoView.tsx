import { useNavigate } from 'react-router-dom';
import { Banner } from '../../components/Banner/Banner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faWarning } from '@fortawesome/free-solid-svg-icons';
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
    let informacionPedidoString = localStorage.getItem('informacionPedido');
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
          localStorage.removeItem('informacionPedido');
          resetCart();
          setStatus(true);
        })
        .catch((err) => {
          const error = err as AxiosError;
          notify(error.message, 'error');
        });
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
      {' '}
      <Banner
        color={status ? 'green' : 'rose'}
        icon={<FontAwesomeIcon icon={status ? faCheck : faWarning} size="lg" />}
        text={
          (status
            ? `Listo. Generando el pedido, puedes volver al inicio. Recuerda abonar el pedido al recibirlo.`
            : 'Ups. Ocurrio un error. ') + `Seras redirigido en ${timer} segundos`
        }
      />
      <ToastAlert />
    </div>
  );
};
