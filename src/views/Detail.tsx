import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRegister } from '../components/ABM/API_Calls';
import { APIRouter } from '../components/ABM/APIRouter';

export const Detail = () => {
  const [registerData, setRegisterData] = useState([]);

  const { Name, id } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const editable = params.get('editable') === 'true';

  

  useEffect(() => {
    getRegister({
      dataSetter: setRegisterData,
      id: id,
      endpoint: APIRouter({ dataModel: Name }),
    });
  }, [registerData]);
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12 ">
      <div className="mx-auto max-w-screen-md rounded-xl px-4 shadow-lg md:px-8">
        <h1 className="mb-4 flex justify-between text-center text-2xl font-bold text-gray-800 sm:text-3xl md:mb-6">
          <div>
            Detalle proveniente de:
            <span className="text-amber-400">{' ' + Name}</span>
          </div>
          <div>
            ID del detalle:<span className="text-amber-400">{' ' + id}</span>
          </div>
        </h1>
        <div className="grid grid-cols-3 gap-4 p-8  md:grid-cols-2">
          {Object.keys(registerData).map((key) => (
            <div key={key}>
              <span className="text-start text-lg font-bold capitalize text-black">
                {key}:{' '}
              </span>
              <span className="text-md font-semibold uppercase text-slate-600">
                {Array.isArray(registerData[key])? (registerData[key].length===0?"No data avaliable":registerData[key]) : registerData[key]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
