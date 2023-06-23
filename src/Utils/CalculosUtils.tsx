import { Producto } from '../Interfaces/ABM/Producto';

export const calcularSubtotal = (productosPedido: Producto[]) => {
  let subtotal = 0;
  for (let producto of productosPedido) {
    if (producto.precioVenta !== null) subtotal += producto.precioVenta;
  }
  return subtotal;
};

export const calcularTiempoEspera = (productosPedido: Producto[]) => {
  let promedioT = 0;
  for (let producto of productosPedido) {
    if (producto.tiempoEstimadoCocina !== null) promedioT += producto.tiempoEstimadoCocina;
  }
  return Number(promedioT / productosPedido.length).toFixed(0);
};
