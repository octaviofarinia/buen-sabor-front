import { ChangeEvent, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { ToastAlert, notify } from '../../components/Toast/ToastAlert';
import { Loader } from '../../components/Loader/Loader';
import {
  downloadExcelRankedProductos,
  getRankedProductos,
} from '../../API/Requests/ProductoRequests/ProductoRequests';
import { RankedManufacturados } from '../../Interfaces/Ranking/RankedManufacturados';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';
import {
  defineMultiDatasetChart,
  defineOnlyDatasetChart,
  generatePieChart,
  generatePolarChart,
  generateVerticalBarChart,
} from '../../Utils/ChartUtils';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faFaceSadCry, faFileExcel, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../components/Botones/Button';
import { parseDate } from '../../Utils/StringUtils';
import { Banner } from '../../components/Banner/Banner';
import { Pie, PolarArea, Line } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
type ChartDataItem = ChartData<'pie'> | ChartData<'line'> | ChartData<'polarArea'>;

export const RankingView = () => {
  const [rankedArticles, setRankedArticles] = useState<RankedManufacturados[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [lineChartData, setLineChartData] = useState<ChartData<'line'> | null>(null);
  const [pieChartData, setPieChartData] = useState<ChartData<'pie'> | null>(null);
  const [polarChartData, setPolarChartData] = useState<ChartData<'polarArea'> | null>(null);
  const handleChange = (range: [Date, Date]) => {
    const [startDate, endDate] = range;
    setStartDate(startDate);
    setEndDate(endDate);
  };
  const { getAccessTokenSilently } = useAuth0();

  const getRankedArticles = async () => {
    setLoading(true);
    setPieChartData(null);
    setPolarChartData(null);
    setLineChartData(null);
    await getAccessTokenSilently()
      .then(async (accessToken) => {
        const response = await getRankedProductos(accessToken, [
          parseDate(startDate!),
          parseDate(endDate!),
        ]);
        console.log(response);
        setRankedArticles(response);
      })
      .catch((err) => {
        const error = err as AxiosError;
        notify(error.response?.data as string, 'error');
      });

    setLoading(false);
  };
  const getExcel = async () => {
    await getAccessTokenSilently()
      .then(async (accessToken) => {
        await downloadExcelRankedProductos(accessToken, [
          parseDate(startDate!),
          parseDate(endDate!),
        ]);
      })
      .catch((err) => {
        const error = err as AxiosError;
        notify(error.response?.data as string, 'error');
      });
  };

  const generateGraph = (dataToGraph: string[], labelToGraph: string) => {
    generatePieChart({
      chartData: rankedArticles!,
      charDataSeter: setPieChartData,
      dataToGraph: dataToGraph,
      labelToGraph: labelToGraph,
    });
    generatePolarChart({
      chartData: rankedArticles!,
      charDataSeter: setPolarChartData,
      dataToGraph: dataToGraph,
      labelToGraph: labelToGraph,
    });
    generateVerticalBarChart({
      chartData: rankedArticles!,
      charDataSeter: setLineChartData,
      dataToGraph: dataToGraph,
      labelToGraph: labelToGraph,
    });
  };
  useEffect(() => {}, []);
  return (
    <div className=" relative flex w-full flex-col gap-5 bg-neutral-100 px-5 pt-5 dark:bg-neutral-800 sm:px-8 md:px-16 ">
      {loading ? (
        <Loader
          texto="Cargando la vista de rankigs..."
          closeLoading={setLoading}
          showCloseLoading={true}
        />
      ) : (
        <>
          <div className="flex w-full flex-col gap-4 ">
            <h1 className="md:text-star group mr-auto flex gap-3 text-center text-xl dark:text-neutral-100 md:text-2xl xl:text-start xl:text-4xl ">
              <FontAwesomeIcon
                icon={faTrophy}
                className="md:texl-2xl text-xl group-hover:text-amber-400 xl:text-4xl"
              />
              Ranking de Productos
            </h1>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-8 ">
              <div className="col-span-1 mx-auto flex w-full flex-col gap-5 lg:col-span-2">
                <h2 className="lg:texl-2xl rounded-md bg-blue-700 p-2 text-center text-lg text-neutral-100 shadow-md md:text-xl">
                  Selecciona un Periodo de tiempo para generar el rankinng
                </h2>
                <DatePicker
                  selected={startDate}
                  onChange={handleChange}
                  startDate={startDate}
                  placeholderText="Selecciona un Periodo de tiempo"
                  endDate={endDate}
                  dateFormat="dd/MM/yyyy"
                  selectsRange
                  className="w-full text-center"
                  maxDate={new Date(Date.now())}
                />
                {endDate && startDate && (
                  <h2 className="lg:texl-2xl flex flex-col justify-center gap-3 rounded-md bg-green-500 p-2 text-center text-lg text-neutral-100 shadow-md md:text-xl">
                    Periodo seleccionado
                    <span>{parseDate(startDate) + ' - ' + parseDate(endDate)}</span>
                    <Button
                      type="button"
                      content={'Confirmar período'}
                      color="verde"
                      fullsize={true}
                      callback={() => {
                        getRankedArticles();
                      }}
                    />
                    {rankedArticles != null && rankedArticles.length > 0 && (
                      <Button
                        type="button"
                        content={
                          <>
                            Descargar excel <FontAwesomeIcon icon={faFileExcel} size="lg" />
                          </>
                        }
                        color="verde"
                        fullsize={true}
                        callback={() => {
                          getExcel();
                        }}
                      />
                    )}
                  </h2>
                )}
              </div>
              {rankedArticles !== null && rankedArticles.length > 0 ? (
                <>
                  <div className="col-span-1 xl:col-span-6 ">
                    <div className=" mb-6 flex flex-col gap-y-1 overflow-hidden rounded-lg bg-neutral-900 shadow-2xl dark:shadow-neutral-800">
                      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                          <div className="overflow-hidden">
                            <table className="min-w-full table-fixed bg-neutral-900 text-left text-sm font-light">
                              <thead className="font-medium uppercase">
                                <tr className="border-b-4 border-b-neutral-500 bg-neutral-900  text-white dark:border-b-white">
                                  <th className="px-6 py-4">Ranking</th>
                                  <th className="px-6 py-4">Denominación</th>
                                  <th className="px-6 py-4">Cantidad Vendida</th>
                                  <th className="px-6 py-4">Costo</th>
                                  <th className="px-6 py-4">Costo Total</th>
                                  <th className="px-6 py-4">Precio de Venta</th>
                                  <th className="px-6 py-4">Utilidad</th>
                                  <th className="px-6 py-4">Venta Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                {rankedArticles.map((articulo, index) => (
                                  <tr
                                    className="border-b border-b-neutral-200 odd:bg-neutral-100 even:bg-neutral-100 hover:bg-green-300 dark:border-neutral-500 dark:border-b-neutral-400 dark:bg-neutral-500 dark:text-white dark:odd:bg-neutral-600 dark:even:bg-neutral-700 dark:hover:bg-green-700 "
                                    key={articulo.denominacion}
                                  >
                                    <td className="px-6 py-4 font-bold">{index + 1}</td>
                                    <td className="px-6 py-4">{articulo.denominacion}</td>
                                    <td className="px-6 py-4">{articulo.cantidadVendida}</td>
                                    <td className="px-6 py-4 font-bold text-green-600 dark:text-green-300">
                                      $ {articulo.costo}
                                    </td>
                                    <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-300">
                                      $ {articulo.costoTotal}
                                    </td>
                                    <td className="px-6 py-4 font-bold text-purple-600 dark:text-purple-300">
                                      $ {articulo.precioVenta}
                                    </td>
                                    <td className="px-6 py-4 font-bold text-red-600 dark:text-red-300">
                                      $ {articulo.utilidadTotal}
                                    </td>
                                    <td className="px-6 py-4 font-bold text-indigo-600 dark:text-indigo-300">
                                      $ {articulo.ventaTotal}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 lg:col-span-8">
                    <Banner
                      content={
                        <div className="flex gap-5">
                          <Button
                            callback={() => {
                              generateGraph(['costoTotal', 'ventaTotal'], 'Costo Total');
                            }}
                            color="azul"
                            content={'Generar graficos en base a costo total'}
                            type="button"
                          />

                          <Button
                            callback={() => {
                              generateGraph(['utilidadTotal', 'ventaTotal'], 'Utilidad Total');
                            }}
                            color="azul"
                            content={'Generar graficos en base a la utilidad'}
                            type="button"
                          />

                          <Button
                            callback={() => {
                              generateGraph(['ventaTotal', 'costoTotal'], 'Venta Total');
                            }}
                            color="azul"
                            content={'Generar graficos en base a las ventas'}
                            type="button"
                          />
                        </div>
                      }
                      color="blue"
                      icon={<FontAwesomeIcon icon={faChartBar} size="lg" />}
                      text="Información lista. Dale al Boton si quieres generar gráficos"
                    />

                    <div className="grid grid-cols-1 gap-10  text-2xl lg:grid-cols-3">
                      {pieChartData && (
                        <div className="flex flex-col items-center rounded-lg p-5 shadow-md dark:bg-neutral-100 ">
                          <h3>Gráfico de torta</h3>
                          <Pie data={pieChartData as ChartData<'pie'>} />
                        </div>
                      )}
                      {lineChartData && (
                        <div className="flex flex-col items-center rounded-lg p-5 shadow-md dark:bg-neutral-100 ">
                          <h3>Gráfico de Líneas</h3>
                          <Line data={lineChartData as ChartData<'line'>} />
                        </div>
                      )}
                      {polarChartData && (
                        <div className="flex flex-col items-center rounded-lg p-5 shadow-md dark:bg-neutral-100  ">
                          <h3>Gráfico de Área Polar</h3>
                          <PolarArea data={polarChartData as ChartData<'polarArea'>} />
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="col-span-1 xl:col-span-6">
                  <Banner
                    color="red"
                    icon={<FontAwesomeIcon icon={faFaceSadCry} size="lg" />}
                    text="No hay datos"
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}
      <ToastAlert />
    </div>
  );
};
