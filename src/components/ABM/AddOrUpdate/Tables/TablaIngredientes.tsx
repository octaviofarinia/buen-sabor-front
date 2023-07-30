import { DetalleProducto } from '../../../../Interfaces/ABM/DetalleProducto';
import { useEffect, useState } from 'react';
import { deleteDetalle } from '../../../../API/Requests/ProductoRequests/DetalleProductoRequests';
import { useAuth0 } from '@auth0/auth0-react';
import { notify } from '../../../Toast/ToastAlert';
import { AxiosError } from 'axios';
import { calcularCostoEstimado } from '../../../../Utils/CalculosUtils';
interface TablaDetallesProps {
  detalles: DetalleProducto[];
  setDetalle: React.Dispatch<React.SetStateAction<DetalleProducto[]>>;
}

const TablaIngredientes = ({ detalles, setDetalle }: TablaDetallesProps) => {
  const { getAccessTokenSilently } = useAuth0();
  const [costo, setCosto] = useState<number>(calcularCostoEstimado(detalles));
  function eliminarDetalle(detalles: DetalleProducto[], elemento: DetalleProducto) {
    getAccessTokenSilently()
      .then(async (accessToken) => {
        const copiaDetalles = [...detalles];
        const indice = copiaDetalles.indexOf(elemento);
        copiaDetalles.splice(indice, 1);

        elemento.id !== undefined && deleteDetalle({ id: elemento.id, token: accessToken });
        setDetalle(copiaDetalles);
      })
      .catch((err) => {
        const error = err as AxiosError;
        notify(error.message, 'error');
      });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const { value } = e.target;
    const copiaDetalles = [...detalles];
    copiaDetalles[index].cantidad = Number(value);
    console.log('index: ' + index + ' detalle: ', copiaDetalles[index]);
    setDetalle(copiaDetalles);
  }

  useEffect(() => {
    setCosto(calcularCostoEstimado(detalles));
  }, [detalles]);
  return (
    <div className="mt-16 rounded-md bg-neutral-100 shadow-md">
      <div className="rounded-t-md bg-neutral-200 px-4 py-2">
        <h2 className="text-xl font-bold text-neutral-800">Ingredientes agregados</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="bg-neutral-200 px-4 py-2 text-left font-bold text-neutral-700">
                <h5>ID Articulo Insumo</h5>
              </th>
              <th className="bg-neutral-200 px-4 py-2 text-left font-bold text-neutral-700">
                <h5>Denominacion</h5>
              </th>
              <th className="bg-neutral-200 px-4 py-2 text-left font-bold text-neutral-700">
                <h5>Cantidad</h5>
              </th>
              <th className="bg-neutral-200 px-4 py-2 text-left font-bold text-neutral-700">
                <h5>Quitar Ingrediente</h5>
              </th>
            </tr>
          </thead>
          <tbody>
            {detalles.map((detalle, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-neutral-100' : ''}>
                <td className="px-4 py-2">
                  {detalle.articuloInsumo?.id
                    ? detalle.articuloInsumo?.id
                    : detalle.idArticuloInsumo}
                </td>
                <td className="px-4 py-2">
                  {detalle.articuloInsumo?.denominacion
                    ? detalle.articuloInsumo?.denominacion
                    : detalle.denominacion}
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={detalle.cantidad as number}
                    onChange={(e) => handleChange(e, index)}
                    className="text-grey-darker w-full rounded border py-2 px-3"
                  />
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => eliminarDetalle(detalles, detalle)}
                    type="submit"
                    className="col-start-2 inline-block h-full w-full rounded bg-black px-6 py-2 text-xs font-medium uppercase leading-normal text-neutral-100 shadow-black transition
                     duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-neutral-700 focus:bg-neutral-800 focus:shadow-neutral-800 focus:outline-none focus:ring-0 active:bg-neutral-800
                     active:shadow-neutral-800 dark:bg-neutral-100 dark:text-black dark:shadow-neutral-100 dark:hover:bg-neutral-300 dark:hover:shadow-neutral-300 dark:focus:bg-neutral-100 dark:focus:shadow-neutral-100
                     dark:active:bg-neutral-100 dark:active:shadow-neutral-100"
                  >
                    <h5 className="lg:text-lg">Quitar ingrediente</h5>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex text-lg">
          <span className="fontBebas  w-1/2 py-2 px-3 ">Costo Estimado</span>
          <span
            className="fontBebas w-1/2  bg-amber-400 px-3 py-2 text-start text-gray-800 outline-none
              ring-amber-400 transition duration-100 focus:ring  dark:text-neutral-100"
          >
            ${costo}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TablaIngredientes;
