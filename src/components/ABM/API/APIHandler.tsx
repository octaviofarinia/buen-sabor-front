import axios from 'axios';
import { Categoria } from '../../../Interfaces/Categoria';
import { Producto } from '../../../Interfaces/Producto';
import { Ingrediente } from '../../../Interfaces/Ingrediente';
import { UnidadDeMedida } from '../../../Interfaces/UnidadDeMedida';
import { HeaderKey, RegisterRow } from '../../../Interfaces/ABM/GenericTableInterfaces';

export type T  = Categoria | Producto | Ingrediente | UnidadDeMedida;
export interface ApiProps<T> {
  TableDataSetter: React.Dispatch<React.SetStateAction<RegisterRow[]>> | null;
  KeyTableDataSetter: React.Dispatch<React.SetStateAction<HeaderKey[]>> | null;
  RegisterSetter: React.Dispatch<React.SetStateAction<T>> | null;
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
      const data = res.data;
      
      TableDataSetter != null && TableDataSetter(data);
      KeyTableDataSetter != null && KeyTableDataSetter(Object.keys(data[0]));
    })
    .catch(() => {
      TableDataSetter != null && TableDataSetter([]);
      KeyTableDataSetter != null && KeyTableDataSetter([]);
    });
};

export const deleteRegister = async <T,>({ id, requestedEndpoint }: ApiProps<T>) => {
  return await axios.delete(`http://localhost:8080/${requestedEndpoint}/${id}`);
};

export const hardDeleteRegister = async <T,>({ id, requestedEndpoint }: ApiProps<T>) => {
  return await axios.delete(`http://localhost:8080/${requestedEndpoint}/hard_delete/${id}`);
};


export const getRegister = async <T,>({ RegisterSetter, requestedEndpoint, id }: ApiProps<T>) => {
  await axios.get(`http://localhost:8080/${requestedEndpoint}/${id}`).then((res) => {
    const data = res.data;
    RegisterSetter != null && RegisterSetter(data);
  });
};

export const createRegister = async <T,>({ requestedEndpoint, persistenObject }: ApiProps<T>) => {
  try {
    const res = await axios.post(`http://localhost:8080/${requestedEndpoint}`, persistenObject);
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateRegister = async <T,>({
  requestedEndpoint,
  persistenObject,
  id,
}: ApiProps<T>) => {
  try {
    const res = await axios.put(`http://localhost:8080/${requestedEndpoint}/${id}`, {
      ...persistenObject,
      id: id,
    });
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

