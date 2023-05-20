import { faEye, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { deleteRegister, getAllRegisters } from './API/APIHandler';
import { HeaderKey, RegisterRow } from '../../Interfaces/ABM/GenericTableInterfaces';

export const ABMTableBuilder = ({
  headerKeys,
  tableRegisters,
  tableName,
  requestedEndpoint,
  TableDataSetter,
}: {
  headerKeys: HeaderKey[];
  tableRegisters: RegisterRow[];
  tableName: string | undefined;
  requestedEndpoint: string;
  TableDataSetter: React.Dispatch<React.SetStateAction<RegisterRow[]>> | null;
}) => {
  const handleDeleteRegister = (id: string) => {
    deleteRegister({
      KeyTableDataSetter: null,
      TableDataSetter: null,
      RegisterSetter: null,
      persistenObject: null,
      requestedEndpoint: requestedEndpoint,
      id: id,
    }).then(() => {
      getAllRegisters({
        KeyTableDataSetter: null,
        TableDataSetter: TableDataSetter,
        requestedEndpoint: requestedEndpoint,
        RegisterSetter: null,
        persistenObject: null,
        id: '',
      });
    });
  };
  return (
    <table className="min-w-full bg-neutral-900 text-left text-sm font-light ">
      <thead className="font-medium uppercase">
        <tr className="border-b-4 border-b-neutral-500 bg-neutral-900  dark:border-b-white ">
          {
            headerKeys.map((headerColumn) => (
              <th scope="col" className="px-6 py-4 text-white" key={headerColumn}>
                {headerColumn}
              </th>
            ))}
          <th className="text-center text-white"> Acciones</th>
        </tr>
      </thead>
      <tbody>
        {tableRegisters.map((registerRow) => (
          <tr
            className="border-b border-b-neutral-200 odd:bg-white
             even:bg-neutral-100 hover:bg-neutral-200 dark:border-neutral-500 
              dark:border-b-neutral-400 dark:bg-neutral-500
              dark:text-white dark:odd:bg-neutral-600 dark:even:bg-neutral-500 dark:hover:bg-neutral-700"
            key={registerRow.id}
          >
            {headerKeys.map((headerColumn) => (
              <td className="whitespace-nowrap px-6 py-4" key={headerColumn}>
                {registerRow[headerColumn]}
              </td>
            ))}

            <td className="flex h-full items-center justify-center gap-16 px-6 py-4">
              <Link to={`/employee/${tableName}/edit/${registerRow.id}`}>
                <button
                  type="button"
                  className="inline-block rounded bg-cyan-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-cyan-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-cyan-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-cyan-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:bg-blue-600 dark:hover:bg-blue-700 dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.1),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.1),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.1),0_4px_18px_0_rgba(84,180,211,0.1)]"
                >
                  <FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: '#ffffff' }} />
                </button>
              </Link>
              <Link to={`/employee/${tableName}/${registerRow.id}`}>
                <button
                  type="button"
                  className="inline-block rounded bg-green-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-green-800 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-green-800 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-green-900 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                >
                  <FontAwesomeIcon icon={faEye} size="lg" style={{ color: '#ffffff' }} />
                </button>
              </Link>

              <button
                type="button"
                className="inline-block rounded bg-red-600 dark:bg-rose-600 dark:hover:bg-red-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-red-800 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-red-800 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-red-900 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                onClick={() => {
                  handleDeleteRegister(registerRow.id);
                }}
              >
                <FontAwesomeIcon icon={faTrashCan} size="lg" style={{ color: '#ffffff' }} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
