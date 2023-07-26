import axios, { AxiosError } from 'axios';
import { ArticuloManufacturado } from '../../../Interfaces/ABM/ArticuloManufacturado';
import { createDetalle, updateDetalle } from './DetalleProductoRequests';
import { DetalleProducto } from '../../../Interfaces/ABM/DetalleProducto';
import { backend_url } from '../../../Utils/ConstUtils';
import { debounce, throttle } from 'lodash';
import { THROTTLE_DELAY_SAVE_UPDATE, throttleConfig } from '../BaseRequests';
import { notify } from '../../../components/Toast/ToastAlert';

interface ProductoRequestProps {
  producto: ArticuloManufacturado;
  detalles: DetalleProducto[];
  imagen: File | null;
  id?: string | number | null;
  token: string;
}

export const createProducto = async ({
  producto: producto,
  detalles: detalles,
  imagen,
  token,
}: ProductoRequestProps) => {
  try {
    const url = `${backend_url}/articulos-manufacturados`;
    const formData = new FormData();
    formData.append(
      'producto',
      new Blob([JSON.stringify(producto)], {
        type: 'application/json',
      })
    );

    imagen !== null && formData.append('imagen', imagen);

    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token,
      },
    });

    const idArticuloManufacturado = response.data.id;

    for (const detalle of detalles) {
      try {
        detalle.idArticuloManufacturado = idArticuloManufacturado;
        await createDetalle({ detalle: detalle, token: token });
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
    notify('Exito', 'success');
    return response.status;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateProducto = async ({
  producto: producto,
  detalles: detalles,
  imagen,
  token,
  id,
}: ProductoRequestProps) => {
  try {
    const url = `${backend_url}/articulos-manufacturados/${id}`;
    const formData = new FormData();
    formData.append(
      'producto',
      new Blob([JSON.stringify(producto)], {
        type: 'application/json',
      })
    );

    imagen !== null && formData.append('imagen', imagen);

    const response = await axios.put(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',

        Authorization: 'Bearer ' + token,
      },
    });

    const idArticuloManufacturado = response.data.id;

    for (const detalle of detalles) {
      try {
        if (detalle.id == null) {
          detalle.idArticuloManufacturado = idArticuloManufacturado;
          await createDetalle({ detalle: detalle, token: token });
        } else {
          detalle.idArticuloManufacturado = idArticuloManufacturado;
          detalle.idArticuloInsumo = detalle.articuloInsumo?.id || null;
          await updateDetalle({ detalle: detalle, token: token });
        }
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
    notify('Exito', 'success');

    return response.status;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getRankedProductos = async (token: string, fechas: [string, string]) => {
  try {
    const response = await axios.get(
      `${backend_url}/articulos-manufacturados/ranking?desde=${fechas[0]}&hasta=${fechas[1]}`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    notify(error.message, 'error');
  }
};

export const updateProductoThrottled = throttle(
  updateProducto,
  THROTTLE_DELAY_SAVE_UPDATE,
  throttleConfig
);
export const createProductoThrottled = throttle(
  createProducto,
  THROTTLE_DELAY_SAVE_UPDATE,
  throttleConfig
);
