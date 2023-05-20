import { EmployeeMain } from '../views/EmployeeMain';
import { AbmRouter } from '../components/ABM/ABMRouter';
import { DetailRouter } from '../components/ABM/Details/DetailRouter';
import { AddOrUpdateRouter } from '../components/ABM/AddOrUpdate/AddOrUpdateRouter';
import ClientDinamicRoutes, { ClientStaticRoutes } from './ClientRoutesConfigs';

const EmployeeDinamicRoutes = [...ClientDinamicRoutes,
  { path: 'employee/:RequestedEndpoint', element: <AbmRouter /> },
  { path: 'employee/:RequestedEndpoint/:id', element: <DetailRouter /> },
  { path: 'employee/:RequestedEndpoint/newRegister', element: <AddOrUpdateRouter /> },
  { path: 'employee/:RequestedEndpoint/edit/:id', element: <AddOrUpdateRouter /> },
];

export const EmployeeStaticRoutes=[
  ...ClientStaticRoutes,
  {name:"Empleado", path: '/employee', element: <EmployeeMain /> }
]

export default EmployeeDinamicRoutes;
