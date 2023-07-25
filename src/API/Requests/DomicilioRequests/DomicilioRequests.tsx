import axios, { Axios } from 'axios';
import { backend_url } from '../../../Utils/ConstUtils';
import { Domicilio } from '../../../Interfaces/ClientSide/Domicilio';

export const postDomicilio = async (domicilio: Domicilio, token: string) => {
  const response = await axios.post(`${backend_url}/domicilios`, domicilio, {
    headers: { Authorization: 'Bearer ' + token },
  });
  return response;
};

export const getDomicilios = async (userId: string, token: string) => {
  const response = await axios.get(`${backend_url}/domicilios/listar`, {
    headers: { auth0Id: userId, Authorization: 'Bearer ' + token },
  });
  return response;
};
