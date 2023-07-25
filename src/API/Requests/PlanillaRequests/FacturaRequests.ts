import axios, { AxiosError } from 'axios';
import { backend_url } from '../../../Utils/ConstUtils';
import { PedidoStatus } from '../../../Utils/PlanillaUtils';

export const anularFactura = async (token: string, id?: number) => {
  const cancelToken = axios.CancelToken.source();

  try {
    if (id == undefined) {
      throw Error('Invalid id');
    }
    const response = await axios.put(backend_url + '/pedidos/cambiar-estado', null, {
      params: {
        id: id,
        estado: PedidoStatus.NOTA_CREDITO,
        cancelToken: cancelToken.token,
      },
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    console.log(error, error.message, error.response);
  }
  return () => cancelToken.cancel();
};
