import { useNavigate } from 'react-router-dom';
import { Banner } from '../../components/Banner/Banner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faWarning } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { backend_url } from '../../Utils/ConstUtils';
import { Factura, Pedido } from '../../Interfaces/ClientSide/Pedido';
import CartConstants from '../../Utils/constants/CartConstants';
import { useCart } from '../../context/CarritoProvider';
import { ToastAlert, notify } from '../../components/Toast/ToastAlert';
import { delayedRedirect } from '../../Utils/NavigationUtils';
export const PostPagoView = () => {
  const navigate = useNavigate();
  const { resetCart } = useCart();
  const [status, setStatus] = useState<boolean>(true);
  const [timer, setTimer] = useState<number>(15);

  const generarPedido = async () => {
    let informacionPedidoString = localStorage.getItem('informacionPedido');
    let factura: Factura = {
      mpPaymentId: null,
      mpMerchantOrderId: null,
      mpPreferenceId: null,
      mpPaymentType: null,
      formaPago: CartConstants.EFECTIVO,
    };
    const cancelToken = axios.CancelToken.source();
    if (informacionPedidoString !== null) {
      let pedido: Pedido = JSON.parse(informacionPedidoString);
      pedido.factura = factura;
      console.log(pedido);
      await axios
        .post(`${backend_url}/pedidos`, pedido, {
          cancelToken: cancelToken.token,
        })
        .then(() => {
          localStorage.removeItem('informacionPedido');
          resetCart();
          setStatus(true);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            notify('Ocurrio un error: ' + err.message, 'error');
            setStatus(false);
          }
        });
    }
    return () => cancelToken.cancel();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    const timeout = delayedRedirect(() => navigate('/'), 15000);
    generarPedido();
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
        callback={() => {
          navigate('/');
        }}
        homeButton={true}
      />
      <ToastAlert />
    </div>
  );
};
