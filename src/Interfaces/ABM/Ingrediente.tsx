import { Base } from '../../API/BaseAPIInterface';
import { Categoria } from './Categoria';
import { UnidadDeMedida } from './UnidadDeMedida';

export interface Ingrediente extends Base {
  id?: number;
  denominacion: string | null;
  urlImagen: string | null;
  precioCompra: number | null;
  stockActual: number | null;
  stockMinimo: number | null;
  idUnidadMedida?: number | null;
  idRubroArticulo?: number | null;
  unidadMedida?: UnidadDeMedida | null;
  rubroArticulo?: Categoria | null;
}
