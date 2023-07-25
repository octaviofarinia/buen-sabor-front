import axios, { AxiosError } from 'axios';
import { ArticuloInsumo } from '../../../Interfaces/ABM/ArticuloInsumo';
import { backend_url } from '../../../Utils/ConstUtils';
import { notify } from '../../../components/Toast/ToastAlert';
interface IngredienteAddOrUpdateProps {
  ingrediente: ArticuloInsumo;
  imagen: File | null;
  id: string | undefined | null;
  token: string;
}

export const createIngredienteRegister = async ({
  ingrediente: ingrediente,
  imagen,
  token,
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
        Authorization: 'Bearer ' + token,
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
  token,
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
        Authorization: 'Bearer ' + token,
      },
    });
    console.log('Response', response.data);
    return response.status;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateStock = async (id: number, precio: number, cantidad: number, token: string) => {
  try {
    let url = `${backend_url}/articulos-insumo/update-stock/${id}?idInsumo=${id}&stock=${cantidad}`;
    if (precio !== null && precio !== 0 && precio !== undefined) {
      url += `&precio=${precio}`;
    }

    const response = await axios.put(url, null, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    notify('Stock actualizado', 'success');

    return response.status;
  } catch (err) {
    const error = err as AxiosError;
    console.log(error.response);
    notify(error.response?.data as string, 'error');
  }
};
