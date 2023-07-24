import axios, { AxiosError } from 'axios';

import { backend_url } from '../../Utils/ConstUtils';
import { Base } from '../BaseAPIInterface';

interface RequestInterface {
  endpoint: string;
  id?: number;
  object?: Base;
  token: string;
}
export const getAll = async ({ endpoint, token }: RequestInterface) => {
  try {
    const response = await axios.get(`${backend_url}/${endpoint}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    console.log(error.message, error.request, error.response);
  }
};

export const softDelete = async ({ id, endpoint, token }: RequestInterface) => {
  return await axios.delete(`${backend_url}/${endpoint}/${id}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};

export const hardDelete = async ({ id, endpoint, token }: RequestInterface) => {
  return await axios.delete(`${backend_url}/${endpoint}/hard_delete/${id}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};

export const getOne = async ({ id, endpoint, token }: RequestInterface) => {
  try {
    const response = await axios.get(`${backend_url}/${endpoint}/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const save = async ({ endpoint, object, token }: RequestInterface) => {
  try {
    console.log(token);

    const response = await axios.post(`${backend_url}/${endpoint}`, object, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const update = async ({ endpoint, object, id, token }: RequestInterface) => {
  try {
    console.log(token);
    const res = await axios.put(
      `${backend_url}/${endpoint}/${id}`,
      {
        ...object,
        id: id,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
