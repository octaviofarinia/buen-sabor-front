import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSadCry, faMoneyBills, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Loader } from '../../components/Loader/Loader';
import { Factura } from '../../Interfaces/ABM/Factura';
import { AxiosError } from 'axios';
import { ToastAlert, notify } from '../../components/Toast/ToastAlert';
import { getAll } from '../../API/Requests/BaseRequests';
import { ConfirmationModal } from '../../components/Modal/ConfirmationModal';
import { anularFactura } from '../../API/Requests/PlanillaRequests/FacturaRequests';
export const FacturasView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [facturas, setFacturas] = useState<Factura[]>([]);

  const getFacturas = async () => {
    try {
      const data = await getAll({ endpoint: 'facturas' });
      setFacturas(data);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.message, error.request, error.response);
      notify('Ocurrio un error', 'error');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getFacturas();
    return () => {};
  }, []);
  return (
    <div className=" relative flex w-full flex-1 flex-col gap-5 bg-neutral-100 px-5 pt-5 dark:bg-neutral-800 sm:px-8 md:px-16 ">
      {isLoading && (
        <Loader
          texto="Cargando las facturas..."
          closeLoading={setIsLoading}
          showCloseLoading={true}
        />
      )}
      <ToastAlert />
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-3 text-3xl font-extrabold uppercase text-black dark:text-neutral-50">
          <FontAwesomeIcon icon={faMoneyBills} />
          Facturas
        </h1>
      </div>

      {isLoading ? (
        <div className=" mb-6 flex flex-col gap-y-1 overflow-hidden rounded-lg bg-neutral-900 shadow-2xl dark:shadow-neutral-800">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full table-fixed bg-neutral-900 text-left text-sm font-light">
                  <thead className="font-medium uppercase">
                    <tr className="border-b-4 border-b-neutral-500 bg-neutral-900  dark:border-b-white ">
                      <th className="px-6 py-4 text-neutral-50">ID</th>
                      <th className="px-6 py-4 text-neutral-50">Fecha de Facturación</th>
                      <th className="px-6 py-4 text-neutral-50">Forma de Pago</th>
                      <th className="px-6 py-4 text-neutral-50">Monto total de la venta</th>
                      <th className="px-6 py-4 text-neutral-50">Datos Mercado Pago</th>
                      <th className="px-6 py-4 text-neutral-50">Fecha de Baja</th>
                      <th className="px-6 py-4 text-neutral-50">Emitir nota de credito</th>
                    </tr>
                  </thead>
                  <tbody>
                    {facturas.map((factura) => (
                      <tr
                        className="fontBebas border-b border-b-neutral-200 text-lg odd:bg-neutral-100 even:bg-neutral-100 hover:bg-neutral-200
                         dark:border-neutral-500 dark:border-b-neutral-400 dark:bg-neutral-500 dark:text-neutral-50 dark:odd:bg-neutral-600
                          dark:even:bg-neutral-500 dark:hover:bg-neutral-700"
                        key={factura.id}
                      >
                        <td className="px-6 py-4  font-bold">{factura.id}</td>
                        <td className="px-6 py-4">{factura.fechaFacturacion}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`${
                              factura.formaPago === 'EFECTIVO' ? 'text-green-500' : 'text-blue-500'
                            } font-semibold `}
                          >
                            {factura.formaPago}
                          </span>
                        </td>
                        <td className="px-6 py-4">${factura.totalVenta}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            {(factura.mpMerchantOrderId &&
                              factura.mpPaymentId &&
                              factura.mpPreferenceId &&
                              factura.mpPaymentType) !== null ? (
                              <div className="flex gap-2">
                                <div className="col-span-1 flex flex-col gap-2">
                                  <p className="border-r-2  border-r-neutral-900 pr-2 font-bold text-neutral-900">
                                    MP_Merchant Order Id
                                  </p>
                                  <p className="border-r-2  border-r-neutral-900 pr-2 font-bold text-neutral-900">
                                    MP_Payment ID
                                  </p>
                                  <p className="border-r-2  border-r-neutral-900 pr-2 font-bold text-neutral-900">
                                    MP_Preference ID
                                  </p>
                                  <p className="border-r-2  border-r-neutral-900 pr-2 font-bold text-neutral-900">
                                    MP_Payment Type
                                  </p>
                                </div>
                                <div className=" col-span-1 flex flex-col gap-2 text-start">
                                  <p className="text-blue-700">{factura.mpMerchantOrderId}</p>
                                  <p className="text-blue-700">{factura.mpPaymentId}</p>
                                  <p className="text-blue-700">{factura.mpPreferenceId}</p>
                                  <p className="text-blue-700">{factura.mpPaymentType}</p>
                                </div>
                              </div>
                            ) : (
                              <span className="font-semibold text-neutral-400  ">
                                No se efectuo el pago por Mercado Pago
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">{factura.fechaBaja}</td>
                        <td className="px-6 py-4">
                          {factura.fechaBaja === null ? (
                            <ConfirmationModal
                              callback={() => {
                                anularFactura(factura.id);
                              }}
                              alertText={'Se emitio la nota de crédito'}
                              contentText="¿Estás seguro de querer emitir una nota de crédito?"
                              confirmationText="Si, emitir nota de crédito"
                              aditionalInfo={
                                <div>
                                  <p className="fontBebas">Factura ID: {factura.id}</p>
                                  <p className="fontBebas">Medio de Pago: {factura.medioDePago}</p>
                                  <p className="fontBebas">Monto: {factura.totalVenta}</p>
                                  <p className="fontBebas">
                                    Fecha facturacion: {factura.fechaFacturacion}
                                  </p>
                                </div>
                              }
                            />
                          ) : (
                            <h2 className="flex gap-3 py-2 pr-8 text-xl font-bold">
                              <FontAwesomeIcon icon={faXmark} size="lg" /> Se emitio nota de crédito
                            </h2>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2
          className="my-6 rounded-md bg-rose-700 p-2 text-center font-semibold text-zinc-100
    shadow-lg"
        >
          <FontAwesomeIcon icon={faFaceSadCry} size="lg" /> Aun no hay ningun pedido registrado.
        </h2>
      )}
    </div>
  );
};
