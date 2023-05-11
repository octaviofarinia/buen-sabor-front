import { UnidadDeMedida } from "./UnidadDeMedida";

export interface Ingrediente{
    nombre: String | null | undefined;
    unidad_de_medida: UnidadDeMedida | null | undefined;
}