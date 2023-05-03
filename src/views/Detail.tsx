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
    getRegister({ dataSetter: setRegisterData, id: id, endpoint: APIRouter({dataModel:Name}) });
  }, []);
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-md px-4 md:px-8">
        <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 sm:text-3xl md:mb-6"></h1>
        <div>
          {Object.keys(registerData).map((key) => (
            <div key={key}>
              <span>{key}: </span>
              <span>{registerData[key]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
