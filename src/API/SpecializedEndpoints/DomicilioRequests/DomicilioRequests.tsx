import axios, { Axios } from 'axios';
import { backend_url } from '../../../Utils/ConstUtils';
import { Domicilio } from '../../../Interfaces/Domicilio';

export const postDomicilio = async (domicilio: Domicilio) => {
  const response = await axios.post(`${backend_url}/domicilios`, domicilio);
  return response;
};

export const getDomicilios = async (userId: string) => {
  try {
    if (userId == undefined) {
      throw new Error();
    }

    const response = await axios.get(`${backend_url}/domicilios/listar`, {
      headers: { auth0Id: userId.toString() },
    });
    
    return response;
  } catch (err) {
    console.error(err);
  }
};
