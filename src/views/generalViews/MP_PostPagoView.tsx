import { useLocation, useNavigate } from 'react-router-dom';
import { Banner } from '../../components/Banner/Banner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClock, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { backend_url } from '../../Utils/ConstUtils';
import { Factura, Pedido } from '../../Interfaces/ClientSide/Pedido';
import CartConstants from '../../Utils/Constants/CartConstants';
import { useCart } from '../../context/CarritoProvider';
import { delayedRedirect } from '../../Utils/NavigationUtils';
import { notify } from '../../components/Toast/ToastAlert';
export const MP_PostPagoView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mpstatus = queryParams.get('status');
  const { resetCart } = useCart();
  const [timer, setTimer] = useState<number>(15);

  const getBanner = () => {
    switch (mpstatus) {
      case 'approved':
        return (
          <Banner
            color="green"
            icon={<FontAwesomeIcon icon={faCheck} size="lg" />}
            text={`El pago fue aprobado, generando el pedido, puedes volver al inicio. Seras redirigido en ${timer} segundos`}
            callback={() => {
              navigate('/');
            }}
            homeButton={true}
          />
        );
      case 'pending':
        return (
          <Banner
            color="amber"
            icon={<FontAwesomeIcon icon={faClock} size="lg" />}
            text={`El pago no ha sido aprobado aun, cuando se confirme se generará pedido, puedes volver al inicio. Seras redirigido en ${timer} segundos`}
            callback={() => {
              navigate('/');
            }}
            homeButton={true}
          />
        );
      case 'rejected':
        return (
          <Banner
            color="rose"
            icon={<FontAwesomeIcon icon={faXmark} size="lg" />}
            text={`El pago no fue aprobado, no se generó el pedido, puedes volver al inicio. Seras redirigido en ${timer} segundos`}
            callback={() => {
              navigate('/');
            }}
            homeButton={true}
          />
        );
    }
  };

  const generarPedido = async () => {
    let informacionPedidoString = localStorage.getItem('informacionPedido');
    let factura: Factura = {
      mpPaymentId: Number(queryParams.get('collection_id')),
      mpMerchantOrderId: Number(queryParams.get('merchant_order_id')),
      mpPreferenceId: queryParams.get('preference_id'),
      mpPaymentType: queryParams.get('payment_type'),
      formaPago: CartConstants.MERCADO_PAGO,
    };
    const cancelToken = axios.CancelToken.source();

    if (informacionPedidoString !== null) {
      let pedido: Pedido = JSON.parse(informacionPedidoString);
      pedido.factura = factura;
      console.log(mpstatus);
      if (mpstatus === 'approved') {
        try {
          const response = await axios.post(`${backend_url}/pedidos`, pedido, {
            cancelToken: cancelToken.token,
          });
          resetCart();

          localStorage.removeItem('informacionPedido');
        } catch (err) {
          console.log(err);
          if (axios.isCancel(err)) {
            notify('Ocurrio un error: ' + err.message, 'error');
          }
        }
      }
    }
    return () => cancelToken.cancel();
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
  return <div>{getBanner()}</div>;
};
