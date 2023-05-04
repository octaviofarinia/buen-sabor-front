import React from 'react';
import { Route } from 'react-router-dom';
import { EmployeeMain } from '../views/EmployeeMain';
import { AbmRouter } from '../components/ABM/ABMRouter';
import { Detail } from '../views/Detail';
import { NewRegister } from '../components/ABM/NewRegister';

const EmployeeRoutesConfigs = [
  { path: 'employee', element: <EmployeeMain /> },
  { path: 'employee/:Name', element: <AbmRouter /> },
  { path: 'employee/:Name/:id', element: <Detail /> },
  { path: 'employee/:Name/newRegister', element: <NewRegister /> },
];

export default EmployeeRoutesConfigs;
