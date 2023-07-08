import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { APIRouter } from '../../API/APIRouter';
import { ABMView } from '../../views/EmployeeViews/ABMView';
import { NotFoundView } from '../../views/NotFoundView';
import { FacturasView } from '../../views/EmployeeViews/FacturasView';
import { PedidosView } from '../../views/EmployeeViews/PedidosView';
import routes from '../../Interfaces/NavigationInterfaces/ABMRoutes';
import { Route } from '../../Interfaces/NavigationInterfaces/NavigationInterface';

export const AbmRouter = () => {
  const { RequestedEndpoint, Tipo } = useParams();
  const [possibleRoutes, setPossibleRoutes] = useState<Route[]>([]);

  useEffect(() => {
    setPossibleRoutes(routes);
  });

  function findRoute() {
    switch (Tipo) {
      case 'ABM':
        return getABMRoute()
      case 'Planilla':
        return getPlanilaRoute()
      default:
        return <NotFoundView />;
    }
  }
  function getPlanilaRoute() {
    switch (RequestedEndpoint) {
      case 'Facturas':
        return <FacturasView />;
      case 'Pedidos':
        return <PedidosView />;
      default:
        return <NotFoundView />;
    }
  }
  function getABMRoute() {
    const route = possibleRoutes.find((obj) => obj.route === RequestedEndpoint);
  
    if (route) {
      return <ABMView tableName={RequestedEndpoint} requestedEndpoint={APIRouter(RequestedEndpoint)} />;
    } else {
      return <NotFoundView />;
    }
  }
  
  return <div>{findRoute()}</div>;
};
