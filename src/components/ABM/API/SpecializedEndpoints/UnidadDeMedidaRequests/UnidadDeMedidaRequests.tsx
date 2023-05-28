import axios from "axios";
import { UnidadDeMedida } from "../../../../../Interfaces/UnidadDeMedida";


interface UnidadDeMedidaRequestProps {
    RegistersSetter: React.Dispatch<React.SetStateAction<UnidadDeMedida[]>> | null;
    IndividualRegisterSetter: React.Dispatch<React.SetStateAction<UnidadDeMedida>> | null;
    id: string | undefined | null;
  }

export const getAllUnidadesDeMedida= async ({ RegistersSetter }: UnidadDeMedidaRequestProps) => {
    await axios.get(`http://localhost:8080/api/v1/unidades-medida`).then((res) => {
      const data = res.data;
      RegistersSetter !== null && RegistersSetter(data);
    });
  };