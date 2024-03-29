import axios from 'axios';
import { backend_url } from '../../../Utils/ConstUtils';

export const getAllFathers = async (token: string) => {
  try {
    const response = await axios.get(`${backend_url}/rubros-articulos/get-all-parents`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const getCategoryComplete = async (id: number, token: string) => {
  try {
    const response = await axios.get(`${backend_url}/rubros-articulos/${id}/complete`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    return response.data;
  } catch (err) {
    console.error(err);
  }
};
