import { UnidadDeMedida } from "./UnidadDeMedida";

export interface Ingrediente{
    id: string;
    nombre: String | null | undefined;
    unidad_de_medida: UnidadDeMedida | null | undefined;
}