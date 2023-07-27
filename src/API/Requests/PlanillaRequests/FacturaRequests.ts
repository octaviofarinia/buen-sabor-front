import axios, { AxiosError } from 'axios';
import { backend_url } from '../../../Utils/ConstUtils';
import { PedidoStatus } from '../../../Utils/PlanillaUtils';

export const anularFactura = async (token: string, id: number | null) => {
  try {
    if (id === null) {
      throw Error('Invalid id');
    }
    const response = await axios.put(backend_url + '/pedidos/cambiar-estado', null, {
      params: {
        id: id,
        estado: PedidoStatus.NOTA_CREDITO,
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
};
