import { DetalleProducto } from '../../../Interfaces/DetalleProducto';
import { useEffect } from 'react';
import { deleteDetalle } from '../API/SpecializedEndpoints/ProductoRequests/DetalleProductoRequests';
interface TablaDetallesProps {
  detalles: DetalleProducto[];
  setDetalle: React.Dispatch<React.SetStateAction<DetalleProducto[]>>;
}

const TablaIngredientes = ({ detalles, setDetalle }: TablaDetallesProps) => {
  function eliminarDetalle(detalles: DetalleProducto[], elemento: DetalleProducto) {
    const copiaDetalles = [...detalles];
    const indice = copiaDetalles.indexOf(elemento);
    copiaDetalles.splice(indice, 1);


    elemento.id !== undefined && deleteDetalle({ id: elemento.id });
    setDetalle(copiaDetalles);
  }

  useEffect(() => {
  }, [detalles]);
  return (
    <div className="mt-16 rounded-md bg-white shadow-md">
      <div className="rounded-t-md bg-gray-200 px-4 py-2">
        <h2 className="text-xl font-bold text-gray-800">Ingredientes agregados</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="bg-gray-200 px-4 py-2 text-left font-bold text-gray-700">
                <h5>ID Articulo Insumo</h5>
              </th>
              <th className="bg-gray-200 px-4 py-2 text-left font-bold text-gray-700">
                <h5>Denominacion</h5>
              </th>
              <th className="bg-gray-200 px-4 py-2 text-left font-bold text-gray-700">
                <h5>Cantidad</h5>
              </th>
              <th className="bg-gray-200 px-4 py-2 text-left font-bold text-gray-700">
                <h5>Quitar Ingrediente</h5>
              </th>
            </tr>
          </thead>
          <tbody>
            {detalles.map((detalle, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                <td className="px-4 py-2">{detalle.articuloInsumo?.id ? detalle.articuloInsumo?.id : detalle.idArticuloInsumo}</td>
                <td className="px-4 py-2">{detalle.articuloInsumo?.denominacion ? detalle.articuloInsumo?.denominacion : detalle.denominacion}</td>
                <td className="px-4 py-2">{detalle.cantidad}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => eliminarDetalle(detalles, detalle)}
                    type="submit"
                    className="col-start-2 inline-block h-full w-full rounded bg-black px-6 py-2 text-xs font-medium uppercase leading-normal text-white shadow-black transition
                     duration-150 ease-in-out hover:bg-gray-700 hover:shadow-gray-700 focus:bg-gray-800 focus:shadow-gray-800 focus:outline-none focus:ring-0 active:bg-gray-800
                     active:shadow-gray-800 dark:bg-white dark:text-black dark:shadow-white dark:hover:bg-gray-300 dark:hover:shadow-gray-300 dark:focus:bg-gray-100 dark:focus:shadow-gray-100
                     dark:active:bg-gray-100 dark:active:shadow-gray-100"
                  >
                    <h5 className="lg:text-lg">Quitar ingrediente</h5>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaIngredientes;
