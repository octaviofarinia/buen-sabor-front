import { Base } from "../../API/BaseAPIInterface";

export interface UnidadDeMedida extends Base{
  id: number | null;
  denominacion: string | null;
  abreviatura: string | null;
}
