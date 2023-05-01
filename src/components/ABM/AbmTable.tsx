import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCategories } from './API_Calls';

const AbmTable = ({ tableInformation }) => {
  const [tableData, setTableData] = useState([]);
  const [headerKeys, setHeaderKeys] = useState([]);

  const getKeys = () => {
    getCategories({ setter: setTableData });
    const keys = Object.keys(tableData);
    setHeaderKeys(keys);
  };
  function renderHeaders() {
    return headerKeys.map((key, index) => <th key={index}>{key}</th>);
  }
  function renderRows() {
    return (
      <tr>
        {headerKeys.map((key, index) => (
          <td key={index}>{tableData[key]}</td>
        ))}
      </tr>
    );
  }
  useEffect(() => {}, []);
  return (
    <div className="flex w-full flex-col gap-5 px-32 pt-20">
      <h1 className="text-slate-950 flex items-center gap-3 text-3xl font-extrabold">
        <FontAwesomeIcon icon={faBoxOpen} style={{ color: '#020617' }} />
        CATEGORIAS
      </h1>
      <Link to="/carga_registro"></Link>

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                  <tr>{renderHeaders()}</tr>
                </thead>
                <tbody>
                  {renderRows()}
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
