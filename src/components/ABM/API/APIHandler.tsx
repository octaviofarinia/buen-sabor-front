import axios from 'axios';
import { Categoria } from '../../Interfaces/Categoria';
import { Producto } from '../../Interfaces/Producto';
import { Ingrediente } from '../../Interfaces/Ingrediente';
import { UnidadDeMedida } from '../../Interfaces/UnidadDeMedida';

export type T = Categoria | Producto | Ingrediente | UnidadDeMedida 
export interface ApiProps<T> {
  TableDataSetter: React.Dispatch<React.SetStateAction<string[]>> | null;
  KeyTableDataSetter: React.Dispatch<React.SetStateAction<string[]>> | null;
  RegisterSetter: React.Dispatch<React.SetStateAction<string|T>> | null;
  id: string | undefined;
  requestedEndpoint: string;
  persistenObject: T | null;
}

export const getAllRegisters = async ({
  KeyTableDataSetter,
  TableDataSetter,
  requestedEndpoint,
}: ApiProps<T>) => {
  await axios
    .get(`http://localhost:8080/${requestedEndpoint}`)
    .then((res) => {
      const data = res.data as string[];
      TableDataSetter != null && TableDataSetter(data);
      KeyTableDataSetter != null && KeyTableDataSetter(Object.keys(data[0]));
    })
    .catch(() => {
      TableDataSetter != null && TableDataSetter([]);
      KeyTableDataSetter != null && KeyTableDataSetter([]);
    });
};

export const deleteRegister = async ({ id, requestedEndpoint }: ApiProps<T>) => {
  return await axios.delete(`http://localhost:8080/${requestedEndpoint}/${id}`);
};

export const getRegister = async ({
  RegisterSetter,
  requestedEndpoint,
  id,
}: ApiProps<T>) => {
  await axios
    .get(`http://localhost:8080/${requestedEndpoint}/${id}`)
    .then((res) => {
      const data = res.data as string;
      RegisterSetter != null && RegisterSetter(data);
    });
};

export const createRegister = async ({
  requestedEndpoint,
  persistenObject,
}: ApiProps<T>) => {
  try {
    const res = await axios.post(
      `http://localhost:8080/${requestedEndpoint}`,
      persistenObject
    );
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateRegister = async ({
  requestedEndpoint,
  persistenObject,
  id,
}: ApiProps<T>) => {
  try {
    const res = await axios.put(
      `http://localhost:8080/${requestedEndpoint}/${id}`,
      {
        ...persistenObject,
        id: id,
      }
    );
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
