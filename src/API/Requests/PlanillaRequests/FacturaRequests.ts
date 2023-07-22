import axios, { AxiosError } from 'axios';
import { backend_url } from '../../../Utils/ConstUtils';

export const anularFactura = async (id?: number) => {
  const cancelToken = axios.CancelToken.source();

  try {
    if (id == undefined) {
      throw Error('Invalid id');
    }
    const response = await axios.post(`${backend_url}/facturas/anular?id=${id}`, {
      cancelToken: cancelToken.token,
    });
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    console.log(error, error.message, error.response);
  }
  return () => cancelToken.cancel();
};
