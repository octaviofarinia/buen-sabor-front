import { ArticuloManufacturado } from '../../../Interfaces/ABM/ArticuloManufacturado';
import { DetallePedido } from '../../../Interfaces/ClientSide/DetallePedido';
import { getOne } from '../BaseRequests';

export const getProductosDelCarrito = async (userid: string, token: string) => {
  const productos: ArticuloManufacturado[] = [];
  let storedCart: string | null = '';
  if (userid !== undefined) {
    storedCart = localStorage.getItem('buenSaborCart' + userid);
  }
  const detalles: DetallePedido[] = storedCart !== null && JSON.parse(storedCart);

  const promises = detalles.map(async (item) => {
    const response = await getOne({
      endpoint: 'articulos-manufacturados',
      id: Number(item.idArticuloManufacturado),
      token: token,
    });
    productos.push(response);
  });

  await Promise.all(promises);

  return productos;
};
