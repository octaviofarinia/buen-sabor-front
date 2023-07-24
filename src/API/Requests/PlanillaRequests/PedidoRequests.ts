import axios, { AxiosError } from 'axios';
import { backend_url } from '../../../Utils/ConstUtils';
import { PedidoStatus } from '../../../Utils/PlanillaUtils';
import { notify } from '../../../components/Toast/ToastAlert';

export const anularPedido = async (token: string, id?: number) => {
  const cancelToken = axios.CancelToken.source();

  try {
    if (id == undefined) {
      throw Error('Invalid id');
    }
    const response = await axios.put(
      backend_url + '/pedidos/cambiar-estado',
      { cancelToken: cancelToken.token },
      {
        params: {
          id: id,
          estado: PedidoStatus.CANCELADO,
        },
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    notify(error.response?.data as string, 'error');
  }
  return () => cancelToken.cancel();
};

export const getPedidos = async (estado: string | null, token: string) => {
  try {
    const response = await axios.get(`${backend_url}/pedidos/listar`, {
      params: {
        estado: estado,
      },
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    console.log(error);
    notify('Ocurrio un error: ' + (error.response?.data as string), 'error');
  }
};

export const getPedido = async (token: string, id?: number) => {
  try {
    const response = await axios.get(`${backend_url}/pedidos/${id}/detalles`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    notify('Ocurrio un error: ' + (error.response?.data as string), 'error');
  }
};

export const getPedidosDelivery = async (token: string) => {
  const pendienteEnvio = await getPedidos(PedidoStatus.PENDIENTE_ENVIO, token);
  const en_camino = await getPedidos(PedidoStatus.EN_CAMINO, token);
  return [...pendienteEnvio, ...en_camino];
};

export const getPedidosCajero = async (token: string) => {
  const pagadosCajero = await getPedidos(PedidoStatus.PAGADO, token);
  const pendientesPagoCajero = await getPedidos(PedidoStatus.PENDIENTE_PAGO, token);
  return [...pendientesPagoCajero, ...pagadosCajero];
};

export const getPedidosCocinero=async (token: string) => {
  const pagados = await getPedidos(PedidoStatus.PAGADO, token);
  const pendientesCocinero = await getPedidos(PedidoStatus.PENDIENTE_PAGO, token);
  const preparacion = await getPedidos(PedidoStatus.PREPARACION, token);
  return [...pagados, ...pendientesCocinero,...preparacion];

}