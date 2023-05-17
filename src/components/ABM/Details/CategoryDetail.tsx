import { useParams } from 'react-router-dom';
import { Categoria } from '../../../Interfaces/Categoria';
import { useEffect, useState } from 'react';
import { APIRouter } from '../API/APIRouter';
import { ApiProps, getRegister } from '../API/APIHandler';
import { base_category_object } from '../../../Interfaces/InterfaceDelivery';

export const CategoryDetail = () => {
  const { RequestedEndpoint, id } = useParams();
  const [registerData, setRegisterData] = useState<Categoria>(base_category_object);

  const getRegisterData = () => {
    const apiProps: ApiProps<Categoria> = {
      KeyTableDataSetter: null,
      TableDataSetter: null,
      requestedEndpoint: APIRouter(RequestedEndpoint),
      RegisterSetter: setRegisterData,
      persistenObject: null,
      id: id,
    };
    getRegister(apiProps);
  };
  useEffect(() => {
    getRegisterData();
    console.log(registerData);
  });
  return (
    <div>
      <h1>{registerData.denominacion}</h1>
      <p>{registerData.idRubroPadre}</p>
    </div>
  );
};
