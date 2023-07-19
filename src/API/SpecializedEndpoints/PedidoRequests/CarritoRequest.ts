import { Producto } from '../../../Interfaces/ABM/Producto';
import { DetallePedido } from '../../../Interfaces/DetallePedido';
import { getProductoRegister } from '../ProductoRequests/ProductoRequests';

export const getProductosDelCarrito = async (userid: string) => {
  const productos: Producto[] = [];
  let storedCart: string | null = '';
  if (userid !== undefined) {
    storedCart = localStorage.getItem('buenSaborCart' + userid);
  }
  const detalles: DetallePedido[] = storedCart !== null && JSON.parse(storedCart);

  const promises = detalles.map(async (item) => {
    const response = await getProductoRegister(Number(item.idArticuloManufacturado));
    productos.push(response.data);
  });

  await Promise.all(promises);

  return productos;
};
