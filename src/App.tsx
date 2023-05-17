import { Route, Routes, useNavigate } from 'react-router';
import './App.css';
import Header from './components/Header/Header';

import { useAuth0 } from '@auth0/auth0-react';
import EmployeeRoutesConfigs from './routes/EmployeeRoutesConfigs';
import ClientRoutesConfigs from './routes/ClientRoutesConfigs';
import { useEffect, useState } from 'react';
import { Footer } from './components/Footer/Footer';
import { NotFoundView } from './views/NotFoundView';
import jwtDecode from 'jwt-decode';

function App() {
  /* True para trabajar con normalUser, False para trabajar con employee*/

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userRoles, setUserRoles] = useState<string[]>([]);

  const navigate = useNavigate();
  const userTypeRedirect = (userRoles: string[]) => {
    userRoles.includes('employee') ? navigate('/employee') : navigate('/');
  };

  useEffect(() => {
    getAccessTokenSilently().then((res) => {
      const decodedToken: { [key: string]: any } = jwtDecode(res);
      setUserRoles(decodedToken[`${import.meta.env.VITE_AUTH0_AUDIENCE}/roles`]);
      userTypeRedirect(decodedToken[`${import.meta.env.VITE_AUTH0_AUDIENCE}/roles`]);
    });
  }, []);

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
        <Footer userRoles={userRoles}></Footer>
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
