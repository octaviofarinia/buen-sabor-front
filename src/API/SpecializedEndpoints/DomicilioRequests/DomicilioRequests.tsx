import axios from 'axios';
import { backend_url } from '../../../Utils/ConstUtils';
import { Domicilio } from '../../../Interfaces/Domicilio';

export const postDomicilio = async (domicilio: Domicilio) => {
  const response = await axios.post(`${backend_url}/domicilios`, domicilio);
  return response;
};
