import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AbmTable from './AbmTable';
import rutas from '../../Interfaces/routes.json';
import { APIRouter } from './APIRouter';
export const AbmRouter = () => {
  const { Name } = useParams();
  const [rutaEspecificada, setRutaEspecificada] = useState([]);

  useEffect(() => {
    setRutaEspecificada(rutas);
    
  });
  return rutaEspecificada.find((obj) => obj.name === Name) ? (
    <AbmTable tableName={Name} endpoint={APIRouter({dataModel:Name})} />
  ) : (
    <div
      className="inline-flex items-center rounded-lg rounded-2xl bg-red-100 m-20 p-6 text-base text-red-700 shadow-xl"
      role="alert"
    >
      <div className="flex gap-3 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
            clipRule="evenodd"
          />
        </svg>

        <span>Error! No se encuentra la ruta especificada</span>
      </div>
    </div>
  );
};
