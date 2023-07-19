import axios from 'axios';
import { Producto } from '../../../Interfaces/ABM/Producto';
import { DetallePedido } from '../../../Interfaces/DetallePedido';
import { getProductoRegister } from '../ProductoRequests/ProductoRequests';
import { backend_url } from '../../../Utils/ConstUtils';

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
let activeRequest: Promise<any> | null = null;

export const getValidacionDeStock = async (cart: DetallePedido[]) => {
  const cancelTokenSource = axios.CancelToken.source();
  if (activeRequest) {
    cancelPreviousRequest();
  }
  if (cart.length > 0) {
    const requestUrl = `${backend_url}/pedidos/validar-stock`;
    try {
      activeRequest = axios
        .put(requestUrl, cart, { cancelToken: cancelTokenSource.token })
        .then((response) => {
          return Boolean(response.data);
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            console.log('Request canceled:', error.message);
          } else {
            console.log('Error en la solicitud:', error);
          }
        });
    } catch (err) {
      console.log(err);
    }
    return activeRequest;
  }
};

export const cancelPreviousRequest = () => {
  cancelTokenSource.cancel('Request canceled due to a new request.');
};
export const cancelTokenSource = axios.CancelToken.source();
