import {  useNavigate } from 'react-router-dom';
import { Banner } from '../components/Banner/Banner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import axios from 'axios';
import { backend_url } from '../Utils/ConstUtils';
import { Pedido } from '../Interfaces/Pedido';
export const PostPagoView = () => {
  const navigate = useNavigate();

  const generarPedido = async () => {
    let informacionPedidoString = localStorage.getItem('informacionPedido');

    if (informacionPedidoString !== null) {
      let pedido: Pedido = JSON.parse(informacionPedidoString);
      pedido.factura = null;
      
      await axios
        .post(`${backend_url}/pedidos`, pedido)
        .then((res) => {
          console.log(res.status);
          localStorage.removeItem('informacionPedido');
          localStorage.removeItem('buenSaborCart');
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  useEffect(() => {
    generarPedido();
  }, []);
  return (
    <div>
      {' '}
      <Banner
        color="green"
        icon={<FontAwesomeIcon icon={faCheck} size="lg" />}
        text={`Listo. Generando el pedido, puedes volver al inicio. Recuerda abonar el pedido al recibirlo. Seras redirigido en 15 segundos`}
        callback={() => {
          navigate('/');
        }}
      />
    </div>
  );
};
