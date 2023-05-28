import axios from 'axios';
import { Ingrediente } from '../../../../../Interfaces/Ingrediente';
interface IngredienteRequestProps {
  persistenObject: Ingrediente;
  imagen: string | null;
  id: string | undefined | null;
}

export const createIngredienteRegister = async ({
  persistenObject,
  imagen,
}: IngredienteRequestProps) => {
  try {
    const formData = new FormData();
    formData.append('insumo', JSON.stringify(persistenObject));
    imagen !== null && formData.append('imagen', imagen);
    const res = await axios.post(`http://localhost:8080/api/v1/articulos-insumo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateIngredienteRegister = async ({
  persistenObject,
  id,
  imagen,
}: IngredienteRequestProps) => {
  try {
    const formData = new FormData();
    formData.append('insumo', JSON.stringify(persistenObject));
    imagen !== null && formData.append('imagen', imagen);
    const res = await axios.put(
      `http://localhost:8080/api/v1/articulos-insum/${id}`,
      {
        formData,
        id: id,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
