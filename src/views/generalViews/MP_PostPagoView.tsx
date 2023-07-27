import { useLocation, useNavigate } from 'react-router-dom';
import { Banner } from '../../components/Banner/Banner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClock, faFaceDizzy, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { backend_url } from '../../Utils/ConstUtils';
import { Factura, Pedido } from '../../Interfaces/ClientSide/Pedido';
import CartConstants from '../../Utils/Constants/CartConstants';
import { useCart } from '../../context/CarritoProvider';
import { delayedRedirect } from '../../Utils/NavigationUtils';
import { notify } from '../../components/Toast/ToastAlert';
import { useAuth0 } from '@auth0/auth0-react';
export const MP_PostPagoView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mpstatus = queryParams.get('status');
  const { resetCart } = useCart();
  const [timer, setTimer] = useState<number>(15);
  const { getAccessTokenSilently } = useAuth0();
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
            homeButton={false}
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
            homeButton={false}
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
            homeButton={false}
          />
        );
      default:
        return (
          <Banner
            color={'red'}
            icon={<FontAwesomeIcon icon={faFaceDizzy} size="lg" />}
            text={`Ups. Ocurrio un error. De otra manera, no hay información de tu pedido aquí. Serás redirigido en ${timer} segundos`}
            homeButton={true}
            callback={() => {
              navigate('/');
            }}
          />
        );
    }
  };

  const generarPedido = async () => {
    if (localStorage.getItem('informacionPedido') !== null) {
      let informacionPedidoString = localStorage.getItem('informacionPedido');
      localStorage.removeItem('informacionPedido');

      let factura: Factura = {
        mpPaymentId: Number(queryParams.get('collection_id')),
        mpMerchantOrderId: Number(queryParams.get('merchant_order_id')),
        mpPreferenceId: queryParams.get('preference_id'),
        mpPaymentType: queryParams.get('payment_type'),
        formaPago: CartConstants.MERCADO_PAGO,
      };

      if (informacionPedidoString !== null) {
        let pedido: Pedido = JSON.parse(informacionPedidoString);
        pedido.factura = factura;

        console.log(informacionPedidoString);
        if (mpstatus === 'approved') {
          await getAccessTokenSilently()
            .then(async (accessToken) => {
              const response = await axios.post(`${backend_url}/pedidos`, pedido, {
                headers: { Authorization: 'Bearer ' + accessToken },
              });
              resetCart();
              if (response.status !== 200) {
                notify('Se genero tu pedido, pero algo salio mal. Por favor, contactanos', 'error');
              }
            })
            .catch((err) => {
              const error = err as AxiosError;
              notify(error.response?.data as string , 'error');
            });
        }
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
  return <div>{getBanner()}</div>;
};
