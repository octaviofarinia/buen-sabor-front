import { UnidadDeMedida } from "./UnidadDeMedida";

export interface Ingrediente{
    nombre: String | null;
    unidad_de_medida: UnidadDeMedida | null;
}