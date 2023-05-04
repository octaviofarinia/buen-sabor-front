import { Route, Routes } from 'react-router';
import './App.css';
import Header from './components/Header/Header';

import userData from './user.json';
import EmployeeRoutesConfigs from './routes/EmployeeRoutesConfigs';

function App() {
  return (
    <>
      <div className="flex flex-col overflow-hidden">
        <Header user={userData[0]} />
        <Routes>
          <Route path="/"></Route>
          {EmployeeRoutesConfigs.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </>
  );
}

export default App;
