import { useLocation, useNavigate } from 'react-router-dom';
import { Banner } from '../components/Banner/Banner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClock, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import axios from 'axios';
import { backend_url } from '../Utils/ConstUtils';
import { MPfactura, Pedido } from '../Interfaces/Pedido';
export const MP_PostPagoView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get('status');

  const getBanner = () => {
    switch (status) {
      case 'approved':
        return (
          <Banner
            color="green"
            icon={<FontAwesomeIcon icon={faCheck} size="lg" />}
            text={`El pago fue aprobado, generando el pedido, puedes volver al inicio. Seras redirigido en 15 segundos`}
            callback={() => {
              navigate('/');
            }}
          />
        );
      case 'pending':
        return (
          <Banner
            color="amber"
            icon={<FontAwesomeIcon icon={faClock} size="lg" />}
            text={`El pago no ha sido aprobado aun, cuando se confirme se generará pedido, puedes volver al inicio. Seras redirigido en 15 segundos`}
            callback={() => {
              navigate('/');
            }}
          />
        );
      case 'rejected':
        return (
          <Banner
            color="rose"
            icon={<FontAwesomeIcon icon={faXmark} size="lg" />}
            text={`El pago no fue aprobado, no se generó el pedido, puedes volver al inicio. Seras redirigido en 15 segundos`}
            callback={() => {
              navigate('/');
            }}
          />
        );
    }
  };

  const generarPedido = async () => {
    let informacionPedidoString = localStorage.getItem('informacionPedido');

    let mpStatus: MPfactura = {
      mpPaymentId: Number(queryParams.get('collection_id')),
      mpMerchantOrderId: Number(queryParams.get('merchant_order_id')),
      mpPreferenceId: queryParams.get('preference_id'),
      mpPaymentType: queryParams.get('payment_type'),
    };
    if (informacionPedidoString !== null) {
      let pedido: Pedido = JSON.parse(informacionPedidoString);
      pedido.factura = mpStatus;
      console.log(pedido);
      if (status === 'approved') {
        await axios
          .post(`${backend_url}/pedidos`, pedido)
          .then((res) => {
            console.log(res.status);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  };

  useEffect(() => {
    generarPedido();
  }, []);
  return <div>{getBanner()}</div>;
};
