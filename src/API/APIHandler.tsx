import axios from 'axios';
import { Categoria } from '../Interfaces/ABM/Categoria';
import { Producto } from '../Interfaces/ABM/Producto';
import { Ingrediente } from '../Interfaces/ABM/Ingrediente';
import { UnidadDeMedida } from '../Interfaces/ABM/UnidadDeMedida';
import { DetalleProducto } from '../Interfaces/ABM/DetalleProducto';
import { HeaderKey, RegisterRow } from '../Interfaces/ABM/GenericTableInterfaces';
import { backend_url } from '../Utils/ConstUtils';

export type T = Categoria | Producto | Ingrediente | UnidadDeMedida | DetalleProducto;
export interface ApiProps<T> {
  TableDataSetter?: React.Dispatch<React.SetStateAction<RegisterRow[]>> | null;
  KeyTableDataSetter?: React.Dispatch<React.SetStateAction<HeaderKey[]>> | null;
  RegisterSetter?: React.Dispatch<React.SetStateAction<T>> | null;
  id?: string | number | undefined;
  requestedEndpoint?: string;
  persistenObject?: T | null;
}

export const getAllRegisters = async ({
  KeyTableDataSetter,
  TableDataSetter,
  requestedEndpoint,
}: ApiProps<T>) => {
  await axios
    .get(`${backend_url}/${requestedEndpoint}`)
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

export const softDelete = async <T,>({ id, requestedEndpoint }: ApiProps<T>) => {
  return await axios.delete(`${backend_url}/${requestedEndpoint}/${id}`);
};

export const hardDelete = async <T,>({ id, requestedEndpoint }: ApiProps<T>) => {
  console.log('Delete', `${backend_url}/${requestedEndpoint}/hard_delete/${id}`);

  return await axios.delete(`${backend_url}/${requestedEndpoint}/hard_delete/${id}`);
};

export const getRegister = async <T,>({ RegisterSetter, requestedEndpoint, id }: ApiProps<T>) => {
  const response = await axios.get(`${backend_url}/${requestedEndpoint}/${id}`);
  try {
    RegisterSetter != null && RegisterSetter(response.data);
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const createRegister = async <T,>({ requestedEndpoint, persistenObject }: ApiProps<T>) => {
  try {
    const res = await axios.post(`${backend_url}/${requestedEndpoint}`, persistenObject);
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
    const res = await axios.put(`${backend_url}/${requestedEndpoint}/${id}`, {
      ...persistenObject,
      id: id,
    });
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
