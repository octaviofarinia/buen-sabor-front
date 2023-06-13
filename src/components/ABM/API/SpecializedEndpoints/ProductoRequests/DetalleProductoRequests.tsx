import axios from 'axios';
import { DetalleProducto } from '../../../../../Interfaces/DetalleProducto';

interface DetalleProductoRequestProps {
  detalle?: DetalleProducto;
  id?: string | number | null;
}
export const getDetalles = async ({ id }: DetalleProductoRequestProps) => {
  const url = `http://localhost:8080/api/v1/articulos-manufacturados/${id}/detalles`;
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
    const url = 'http://localhost:8080/api/v1/detalles-articulos-manufacturados';
    const response = await axios.post(url, detalle);
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteDetalle = async ({ id }: DetalleProductoRequestProps) => {
  const response= await axios.delete(
    `http://localhost:8080/api/v1/detalles-articulos-manufacturados/${id}`
  );
  return response;
};
