import { UnidadDeMedida } from "./UnidadDeMedida";

export interface Ingrediente{
    id: Int16Array;
    nombre: String;
    unidad_de_medida: UnidadDeMedida;
}