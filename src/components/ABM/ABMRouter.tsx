import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import rutas from '../../Interfaces/NavigationInterfaces/EmployeeRoutes.json';
import { APIRouter } from './API/APIRouter';
import { ABMView } from '../../views/EmployeeViews/ABMView';
import { NotFoundView } from '../../views/NotFoundView';
interface ABMRouter {
  name: string;
  imagen: string;
  interface: string;
}
export const AbmRouter = () => {
  const { RequestedEndpoint } = useParams();
  const [possibleRoutes, setPossibleRoutes] = useState<ABMRouter[]>([]);

  useEffect(() => {
    setPossibleRoutes(rutas);
  });
  return possibleRoutes.find((obj) => obj.interface === RequestedEndpoint) ? (
    <ABMView
      tableName={RequestedEndpoint}
      requestedEndpoint={APIRouter(RequestedEndpoint)}
    />
  ) : (
    <NotFoundView />
  );
};
