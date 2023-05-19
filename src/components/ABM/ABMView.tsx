import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getAllRegisters, ApiProps, T } from './API/APIHandler';
import { ABMTableBuilder } from './ABMTableBuilder';
import { RegisterRow } from '../../Interfaces/ABM/GenericTableInterfaces';
import { HeaderKey } from '../../Interfaces/ABM/GenericTableInterfaces';

export const ABMView = ({
  tableName,
  requestedEndpoint,
}: {
  tableName: string | undefined;
  requestedEndpoint: string;
}) => {
  const [tableData, setTableData] = useState<RegisterRow[]>([]);
  const [headerKeys, setHeaderKeys] = useState<HeaderKey[]>([]);

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
  }, [requestedEndpoint]);

  return (
    <div className="flex w-full flex-col gap-5 px-32 pt-5">
      <div className='flex items-center justify-between'>
      <h1 className="text-slate-950 flex items-center gap-3 text-3xl font-extrabold uppercase">
        <FontAwesomeIcon icon={faBoxOpen} style={{ color: '#020617' }} />
        {tableName}
      </h1>
      <Link
          to={`/employee/${tableName}/newRegister`}
          className="inline-block rounded bg-sky-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-sky-800 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-sky-800 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
        >
          <FontAwesomeIcon icon={faPlus} size="lg" style={{ color: '#ffffff' }} />
        </Link>
      </div>
     
      
      <div className="flex flex-col gap-y-1 rounded-2xl shadow-2xl my-6">
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
    </div>
  );
};
