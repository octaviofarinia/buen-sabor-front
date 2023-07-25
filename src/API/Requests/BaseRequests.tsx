import axios, { AxiosError } from 'axios';
import { debounce, throttle } from 'lodash';

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

export const update = async ({ endpoint, object, id, token }: RequestInterface) => {
  try {
    if (object === undefined) {
      throw new Error('object is undefined');
    } else {
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
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const save = async ({ endpoint, object, token }: RequestInterface) => {
  try {
    if (object === undefined) {
      throw new Error('object is undefined');
    } else {
      const response = await axios.post(`${backend_url}/${endpoint}`, object, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      return response;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// DEBOUNCED FUNCTIONS

export const THROTTLE_DELAY_SAVE_UPDATE = 2000;
export const DEBOUNCE_DELAY_GET = 500;
export const throttleConfig = { leading: true, trailing: false };

export const getAllDebounced = debounce(getAll, DEBOUNCE_DELAY_GET);
export const softDeleteDebounced = debounce(softDelete, DEBOUNCE_DELAY_GET);
export const hardDeleteDebounced = debounce(hardDelete, DEBOUNCE_DELAY_GET);
export const getOneDebounced = debounce(getOne, DEBOUNCE_DELAY_GET);
export const saveThrottled = throttle(save, THROTTLE_DELAY_SAVE_UPDATE,throttleConfig);
export const updateThrottled = throttle(update, THROTTLE_DELAY_SAVE_UPDATE,throttleConfig);
