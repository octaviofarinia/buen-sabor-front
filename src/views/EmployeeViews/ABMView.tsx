import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { getAllRegisters, ApiProps, T } from '../../API/APIHandler';
import { ABMTableBuilder } from '../../components/ABM/ABMTableBuilder';
import { RegisterRow } from '../../Interfaces/ABM/GenericTableInterfaces';
import { HeaderKey } from '../../Interfaces/ABM/GenericTableInterfaces';
import { parseUnidadDeMedida } from '../../Utils/StringUtils';
import { Loader } from '../../components/Loader/Loader';

export const ABMView = ({
  tableName,
  requestedEndpoint,
}: {
  tableName: string | undefined;
  requestedEndpoint: string;
}) => {
  const [tableData, setTableData] = useState<RegisterRow[]>([]);
  const [headerKeys, setHeaderKeys] = useState<HeaderKey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const apiProps: ApiProps<T> = {
      KeyTableDataSetter: setHeaderKeys,
      TableDataSetter: setTableData,
      requestedEndpoint: requestedEndpoint,
      RegisterSetter: null,
      persistenObject: null,
      id: '',
    };
    getAllRegisters(apiProps);
    setIsLoading(false);
  }, [requestedEndpoint]);

  return (
    <div className=" relative flex w-full flex-col gap-5 bg-white px-5 pt-5 dark:bg-neutral-800 sm:px-8 md:px-16 ">
      {isLoading && (
        <Loader
          texto="Cargando las facturas..."
          closeLoading={setIsLoading}
          showCloseLoading={true}
        />
      )}
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-3 text-3xl font-extrabold uppercase text-black dark:text-white">
          <FontAwesomeIcon icon={faCubes} />
          {tableName != undefined && parseUnidadDeMedida(tableName)}
        </h1>
        <Link
          to={`/employee/${tableName}/newRegister`}
          className="inline-block rounded bg-sky-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-sky-800 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-sky-800 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:bg-cyan-600  dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:bg-cyan-700 dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
        >
          <FontAwesomeIcon icon={faPlus} size="lg" style={{ color: '#ffffff' }} />
        </Link>
      </div>

      {tableData.length != 0 ? (
        <div className=" mb-6 flex flex-col gap-y-1 overflow-hidden rounded-lg bg-neutral-900 shadow-2xl dark:shadow-neutral-800">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <ABMTableBuilder
                  headerKeys={headerKeys}
                  tableRegisters={tableData}
                  tableName={tableName}
                  requestedEndpoint={requestedEndpoint}
                  TableDataSetter={setTableData}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2
          className="my-6 rounded-md bg-rose-700 p-2 text-center font-semibold text-zinc-100
    shadow-lg"
        >
          Ups! Aun no has agregado ningún registro.
        </h2>
      )}
    </div>
  );
};
