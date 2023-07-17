import axios from 'axios';
import { Ingrediente } from '../../../Interfaces/ABM/Ingrediente';
import { backend_url } from '../../../Utils/ConstUtils';
interface IngredienteAddOrUpdateProps {
  ingrediente: Ingrediente;
  imagen: File | null;
  id: string | undefined | null;
}

export const getAllIngredientes = async () => {
  const response = await axios.get(`${backend_url}/articulos-insumo`);
  try {
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getIngredienteRegister = async (id: string | undefined) => {
  const url = `${backend_url}/articulos-insumo/${id}`;
  try {
    const response = await axios.get(url);
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const createIngredienteRegister = async ({
  ingrediente: ingrediente,
  imagen,
}: IngredienteAddOrUpdateProps) => {
  try {
    const url = `${backend_url}/articulos-insumo`;
    const formData = new FormData();
    formData.append(
      'insumo',
      new Blob([JSON.stringify(ingrediente)], {
        type: 'application/json',
      })
    );

    imagen !== null && formData.append('imagen', imagen);

    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.status;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateIngredienteRegister = async ({
  ingrediente: ingrediente,
  id,
  imagen,
}: IngredienteAddOrUpdateProps) => {
  try {
    const url = `${backend_url}/articulos-insumo/${id}`;
    const formData = new FormData();
    formData.append(
      'insumo',
      new Blob([JSON.stringify(ingrediente)], {
        type: 'application/json',
      })
    );

    imagen !== null && formData.append('imagen', imagen);

    const response = await axios.put(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Response', response.data);
    return response.status;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
