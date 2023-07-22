import axios, { AxiosError } from 'axios';

import { backend_url } from '../../Utils/ConstUtils';
import { Base } from '../BaseAPIInterface';


interface RequestInterface {
  endpoint: string;
  id?: number;
  object?: Base;
}
export const getAll = async ({ endpoint }: RequestInterface) => {
  try {
    const response = await axios.get(`${backend_url}/${endpoint}`);
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    console.log(error.message, error.request, error.response);
  }
};

export const softDelete = async ({ id, endpoint }: RequestInterface) => {
  return await axios.delete(`${backend_url}/${endpoint}/${id}`);
};

export const hardDelete = async ({ id, endpoint }: RequestInterface) => {
  console.log('Hard Delete', `${backend_url}/${endpoint}/hard_delete/${id}`);
  return await axios.delete(`${backend_url}/${endpoint}/hard_delete/${id}`);
};

export const getOne = async ({ id, endpoint }: RequestInterface) => {
  try {
    const response = await axios.get(`${backend_url}/${endpoint}/${id}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const save = async ({ endpoint, object }: RequestInterface) => {
  try {
    const response = await axios.post(`${backend_url}/${endpoint}`, object);
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const update = async ({ endpoint, object, id }: RequestInterface) => {
  try {
    const res = await axios.put(`${backend_url}/${endpoint}/${id}`, {
      ...object,
      id: id,
    });
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
