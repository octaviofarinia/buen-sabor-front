import { Base } from "../../API/BaseAPIInterface";
import { Ingrediente } from "./Ingrediente"; 
import { Producto } from "./Producto";

export interface DetalleProducto extends Base{
    cantidad: number | null,
    idArticuloInsumo?: number | null,
    idArticuloManufacturado?: number | null,
    denominacion?: string | null,
    articuloManufacturado?: Producto | null,
    articuloInsumo?:Ingrediente|null,
}