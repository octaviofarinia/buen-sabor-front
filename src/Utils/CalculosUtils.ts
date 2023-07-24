import { ArticuloManufacturado } from '../Interfaces/ABM/ArticuloManufacturado';
import { DetalleProducto } from '../Interfaces/ABM/DetalleProducto';
import { DetallePedido } from '../Interfaces/ClientSide/DetallePedido';

export const calcularSubtotal = (
  productosPedido: ArticuloManufacturado[],
  detalles: DetallePedido[]
) => {
  let subtotal = 0;

  for (let producto of productosPedido) {
    if (producto.precioVenta !== null)
      subtotal += producto.precioVenta * detalles[productosPedido.indexOf(producto)]?.cantidad;
  }
  return subtotal;
};

export const calcularTiempoEspera = (productosPedido: ArticuloManufacturado[]) => {
  let promedioT = 0;
  for (let producto of productosPedido) {
    if (producto.tiempoEstimadoCocina !== null) promedioT += producto.tiempoEstimadoCocina;
  }
  return Number((promedioT / productosPedido.length).toFixed(0));
};

export const calcularCostoEstimado = (detallesProducto: DetalleProducto[]) => {
  let subtotal = 0;

  for (let detalle of detallesProducto) {
    if (detalle.articuloInsumo?.precioCompra && detalle.cantidad !== null)
      subtotal += detalle.articuloInsumo?.precioCompra * detalle.cantidad;
  }
  return subtotal;
};
