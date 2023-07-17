import { Producto } from '../Interfaces/ABM/Producto';
import { DetallePedido } from '../Interfaces/DetallePedido';

export const calcularSubtotal = (productosPedido: Producto[], detalles: DetallePedido[]) => {
  let subtotal = 0;

  for (let producto of productosPedido) {
    if (producto.precioVenta !== null)
      subtotal += producto.precioVenta * detalles[productosPedido.indexOf(producto)]?.cantidad;
  }
  return subtotal;
};

export const calcularTiempoEspera = (productosPedido: Producto[]) => {
  let promedioT = 0;
  for (let producto of productosPedido) {
    if (producto.tiempoEstimadoCocina !== null) promedioT += producto.tiempoEstimadoCocina;
  }
  return Number((promedioT / productosPedido.length).toFixed(0));
};
