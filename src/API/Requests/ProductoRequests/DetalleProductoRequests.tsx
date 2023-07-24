import axios from 'axios';
import { DetalleProducto } from '../../../Interfaces/ABM/DetalleProducto';
import { backend_url } from '../../../Utils/ConstUtils';

interface DetalleProductoRequestProps {
  detalle?: DetalleProducto;
  id?: string | number | null;
  token: string;
}
export const getDetalles = async ({ id, token }: DetalleProductoRequestProps) => {
  const url = `${backend_url}/articulos-manufacturados/${id}/detalles`;
  try {
    const response = await axios.get(url, {
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

export const createDetalle = async ({ detalle, token }: DetalleProductoRequestProps) => {
  try {
    const url = `${backend_url}/detalles-articulos-manufacturados`;
    const response = await axios.post(url, detalle, {
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

export const updateDetalle = async ({ detalle, token }: DetalleProductoRequestProps) => {
  try {
    const url = `${backend_url}/detalles-articulos-manufacturados/` + detalle?.id;
    const response = await axios.put(url, detalle, {
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

export const deleteDetalle = async ({ id, token }: DetalleProductoRequestProps) => {
  const response = await axios.delete(`${backend_url}/detalles-articulos-manufacturados/${id}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  return response;
};
