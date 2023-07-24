import axios, { AxiosError } from 'axios';
import { backend_url } from '../../../Utils/ConstUtils';
import { PedidoStatus } from '../../../Utils/PlanillaUtils';
import { notify } from '../../../components/Toast/ToastAlert';

export const anularPedido = async (id?: number) => {
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
      }
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    notify(error.response?.data as string, 'error');
  }
  return () => cancelToken.cancel();
};

export const getPedidos = async (estado: string | null) => {
  try {
    const response = await axios.get(`${backend_url}/pedidos/listar`, {
      params: {
        estado: estado,
      },
    });
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    console.log(error);
    notify('Ocurrio un error: ' + (error.response?.data as string), 'error');
  }
};

export const getPedido = async (id?: number) => {
  try {
    const response = await axios.get(`${backend_url}/pedidos/${id}/detalles`);
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    notify('Ocurrio un error: ' + (error.response?.data as string), 'error');
  }
};
