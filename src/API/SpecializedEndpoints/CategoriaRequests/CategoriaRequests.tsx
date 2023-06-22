import axios from 'axios';
import { Categoria } from '../../../Interfaces/ABM/Categoria'; 
import { base_category } from '../../../Interfaces/ABM/InterfaceDelivery'; 
interface CategoriaRequestProps {
  RegistersSetter: React.Dispatch<React.SetStateAction<Categoria[]>> | null;
  IndividualRegisterSetter: React.Dispatch<React.SetStateAction<Categoria>> | null;
  id: string | undefined | null;
}

export const getAllFathers = async ({ RegistersSetter }: CategoriaRequestProps) => {
  await axios.get(`http://localhost:8080/api/v1/rubros-articulos/get-all-parents`).then((res) => {
    const data = res.data;
    RegistersSetter !== null && RegistersSetter(data);
  });
};

export const getCategoryComplete = async (
  { IndividualRegisterSetter, id }: CategoriaRequestProps,
  fatherSetter: React.Dispatch<React.SetStateAction<Categoria>>
) => {
  const response = await axios.get(`http://localhost:8080/api/v1/rubros-articulos/${id}/complete`);
  IndividualRegisterSetter !== null && IndividualRegisterSetter(response.data);
  fatherSetter(response.data.rubroPadre || base_category);
  return response;
};
