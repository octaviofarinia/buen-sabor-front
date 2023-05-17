import { Route, Routes, useNavigate } from 'react-router';
import './App.css';
import Header from './components/Header/Header';

import EmployeeRoutesConfigs from './routes/EmployeeRoutesConfigs';
import ClientRoutesConfigs from './routes/ClientRoutesConfigs';
import { useEffect } from 'react';
import { Footer } from './components/Footer/Footer';
import { NotFoundView } from './views/NotFoundView';
import { useUser } from './context/UserProvider';

function App() {
  const { userRoles } = useUser();

  const navigate = useNavigate();
  const userTypeRedirect = (userRoles: string[]) => {
    userRoles.includes('employee') ? navigate('/employee') : navigate('/');
  };

  useEffect(() => {
    console.log('APP USE EFFECT');
    userTypeRedirect(userRoles);
  }, [userRoles]);

  return (
    <>
      <div
        className={`flex h-full  flex-col ${
          !userRoles.includes('employee') ? 'justify-between' : ''
        }`}
      >
        <Header />
        <Routes>
          {EmployeeRoutesConfigs.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          {ClientRoutesConfigs.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<NotFoundView />} />
        </Routes>
        <Footer></Footer>
      </div>
    </>
  );
}

/*
<button
          onClick={() => {
            setUser(userData[1]);
          }}
        >
          Set User Employee
        </button>
        <button
          onClick={() => {
            setUser(userData[0]);
          }}
        >
          Set User Client
        </button>
*/

export default App;
