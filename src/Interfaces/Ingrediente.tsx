import { UnidadDeMedida } from "./UnidadDeMedida";

export interface Ingrediente{
    id : number | null;
    denominacion: string | null;
    urlImagen : string | null;
    precioCompra: number | null;
    precioVenta: number | null;
    stockActual: number | null;
    stockMinimo: number | null;
    idUnidadMedida: number | null;
    idRubroArticulo: number| null;
}