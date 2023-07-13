import axios from 'axios';
import { Producto } from '../../../Interfaces/ABM/Producto';
import { createDetalle, updateDetalle } from './DetalleProductoRequests';
import { DetalleProducto } from '../../../Interfaces/ABM/DetalleProducto';
interface ProductoRequestProps {
  producto: Producto;
  detalles: DetalleProducto[];
  imagen: File | null;
  id?: string | number | null;
}

export const getAllProductos = async () => {
  const url = `http://localhost:8080/api/v1/articulos-manufacturados`;
  try {
    const response = await axios.get(url);
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const getProductoRegister = async (id: string | number | undefined) => {
  const url = `http://localhost:8080/api/v1/articulos-manufacturados/${id}`;
  try {
    const response = await axios.get(url);
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const createProducto = async ({
  producto: producto,
  detalles: detalles,
  imagen,
}: ProductoRequestProps) => {
  try {
    const url = 'http://localhost:8080/api/v1/articulos-manufacturados';
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
      },
    });

    const idArticuloManufacturado = response.data.id;

    for (const detalle of detalles) {
      try {
        detalle.idArticuloManufacturado = idArticuloManufacturado;
        console.log('Detalle: ', detalle);
        const responseDetalle = await createDetalle({ detalle: detalle });
        console.log('Status detalle', responseDetalle.status);
      } catch (err) {
        console.error(err);
        throw err;
      }
    }

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
  id,
}: ProductoRequestProps) => {
  try {
    const url = `http://localhost:8080/api/v1/articulos-manufacturados/${id}`;
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
      },
    });

    const idArticuloManufacturado = response.data.id;

    for (const detalle of detalles) {
      try {
        detalle.id != null &&
          console.log('El detalle existe: ' + detalle.denominacion + '  id:' + detalle.id);
        if (detalle.id == null) {
          detalle.idArticuloManufacturado = idArticuloManufacturado;
          const responseDetalle = await createDetalle({ detalle: detalle });
          console.log('Status create detalle', responseDetalle.status);
        } else {
          detalle.idArticuloManufacturado = idArticuloManufacturado;
          detalle.idArticuloInsumo = detalle.articuloInsumo?.id || null;
          const responseDetalle = await updateDetalle({ detalle: detalle });
          console.log('Status update detalle', responseDetalle.status);
        }
      } catch (err) {
        console.error(err);
        throw err;
      }
    }

    return response.status;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
