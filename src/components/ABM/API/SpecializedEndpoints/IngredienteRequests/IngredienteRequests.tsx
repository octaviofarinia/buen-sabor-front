import axios from 'axios';
import { Ingrediente } from '../../../../../Interfaces/Ingrediente';
interface IngredienteAddOrUpdateProps {
  ingrediente: Ingrediente;
  imagen: File | null;
  id: string | undefined | null;
}



export const getIngredienteRegister = async (id:string|undefined) => {
  const url = `http://localhost:8080/api/v1/articulos-insumo/${id}`;
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
    const url = 'http://localhost:8080/api/v1/articulos-insumo';
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
    console.log("Request",ingrediente)
    const url = `http://localhost:8080/api/v1/articulos-insumo/${id}`;
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
    console.log("Response",response.data)
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
