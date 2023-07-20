import axios from 'axios';
import { DetalleProducto } from '../../../Interfaces/ABM/DetalleProducto';
import { backend_url } from '../../../Utils/ConstUtils';

interface DetalleProductoRequestProps {
  detalle?: DetalleProducto;
  id?: string | number | null;
}
export const getDetalles = async ({ id }: DetalleProductoRequestProps) => {
  const url = `${backend_url}/articulos-manufacturados/${id}/detalles`;
  try {
    const response = await axios.get(url);

    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const createDetalle = async ({ detalle }: DetalleProductoRequestProps) => {
  try {
    const url = `${backend_url}/detalles-articulos-manufacturados`;
    const response = await axios.post(url, detalle);
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateDetalle = async ({ detalle }: DetalleProductoRequestProps) => {
  try {
    const url = `${backend_url}/detalles-articulos-manufacturados/` + detalle?.id;
    const response = await axios.put(url, detalle);
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteDetalle = async ({ id }: DetalleProductoRequestProps) => {
  const response = await axios.delete(`${backend_url}/detalles-articulos-manufacturados/${id}`);
  return response;
};
