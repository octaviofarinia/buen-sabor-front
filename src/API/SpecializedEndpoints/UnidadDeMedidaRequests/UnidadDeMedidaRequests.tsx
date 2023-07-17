import axios from 'axios';
import { UnidadDeMedida } from '../../../Interfaces/ABM/UnidadDeMedida';
import { backend_url } from '../../../Utils/ConstUtils';

interface UnidadDeMedidaRequestProps {
  RegistersSetter: React.Dispatch<React.SetStateAction<UnidadDeMedida[]>> | null;
  IndividualRegisterSetter: React.Dispatch<React.SetStateAction<UnidadDeMedida>> | null;
  id: string | undefined | null;
}

export const getAllUnidadesDeMedida = async ({ RegistersSetter }: UnidadDeMedidaRequestProps) => {
  await axios.get(`${backend_url}/unidades-medida`).then((res) => {
    const data = res.data;
    RegistersSetter !== null && RegistersSetter(data);
  });
};
