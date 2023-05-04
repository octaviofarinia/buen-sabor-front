import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  faTrashCan,
  faEye,
  faPenToSquare,
} from '@fortawesome/free-regular-svg-icons';
import { getRegisters, deleteRegister } from './API_Calls';

const AbmTable = ({ tableName, endpoint }) => {
  const [tableData, setTableData] = useState([]);
  const [headerKeys, setHeaderKeys] = useState([]);

  useEffect(() => {
    getRegisters({
      endpoint: endpoint,
      keySetter: setHeaderKeys,
      dataSetter: setTableData,
    });
  }, [endpoint]);

  return (
    <div className="flex w-full flex-col gap-5 px-32 pt-20">
      <h1 className="text-slate-950 flex items-center gap-3 text-3xl font-extrabold uppercase">
        <FontAwesomeIcon icon={faBoxOpen} style={{ color: '#020617' }} />
        {tableName}
      </h1>
      <div className="flex py-4">
        <Link to={`/employee/${tableName}/newRegister`}>
          <button
            type="button"
            className="inline-block rounded bg-sky-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-sky-800 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-sky-800 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
          >
            <FontAwesomeIcon
              icon={faPlus}
              size="lg"
              style={{ color: '#ffffff' }}
            />
          </button>
        </Link>
      </div>
      <div className="flex flex-col gap-y-1 rounded-2xl shadow-2xl">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b bg-white font-medium uppercase dark:border-neutral-500 dark:bg-neutral-600">
                  <tr className="border-b odd:bg-white even:bg-neutral-100 hover:bg-neutral-200 even:hover:bg-neutral-200 dark:border-neutral-500 dark:bg-neutral-700 ">
                    {headerKeys.map((header) => (
                      <th scope="col" className="px-6 py-4" key={header}>
                        {header}
                      </th>
                    ))}
                    <th className="text-center"> Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row) => (
                    <tr
                      className="border-b odd:bg-white even:bg-neutral-100 hover:bg-neutral-200 even:hover:bg-neutral-200 dark:border-neutral-500 dark:bg-neutral-700 "
                      key={row.id}
                    >
                      {headerKeys.map((header) => (
                        <td
                          className="whitespace-nowrap px-6 py-4"
                          key={header}
                        >
                          {row[header]}
                        </td>
                      ))}

                      <td className="flex h-full items-center justify-center gap-16 px-6 py-4">
                        <Link
                          to={`/employee/${tableName}/${row.id}?editable=true`}
                        >
                          <button
                            type="button"
                            className="inline-block rounded bg-cyan-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-cyan-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-cyan-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-cyan-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
                          >
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              size="lg"
                              style={{ color: '#ffffff' }}
                            />
                          </button>
                        </Link>
                        <Link
                          to={`/employee/${tableName}/${row.id}?editable=false`}
                        >
                          <button
                            type="button"
                            className="inline-block rounded bg-green-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-green-800 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-green-800 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-green-900 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                          >
                            <FontAwesomeIcon
                              icon={faEye}
                              size="lg"
                              style={{ color: '#ffffff' }}
                            />
                          </button>
                        </Link>

                        <button
                          type="button"
                          className="inline-block rounded bg-red-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-red-800 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-red-800 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-red-900 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                          onClick={() => {
                            deleteRegister({ id: row.id, endpoint: endpoint });
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            size="lg"
                            style={{ color: '#ffffff' }}
                          />
                        </button>
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
  );
};

export default AbmTable;
