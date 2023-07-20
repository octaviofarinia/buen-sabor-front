import axios from 'axios';
import { backend_url } from '../../../Utils/ConstUtils';

export const getAllFathers = async () => {
  try {
    const response = await axios.get(`${backend_url}/rubros-articulos/get-all-parents`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const getCategoryComplete = async (id: number) => {
  try {
    const response = await axios.get(`${backend_url}/rubros-articulos/${id}/complete`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
