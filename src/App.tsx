import { Route, Routes, useNavigate, useLocation } from 'react-router';
import './App.css';
import {Header} from './components/Header/Header';

import EmployeeDinamicRoutes, { EmployeeStaticRoutes } from './routes/EmployeeRoutesConfigs';
import ClientDinamicRoutes, { ClientStaticRoutes } from './routes/ClientRoutesConfigs';
import { Footer } from './components/Footer/Footer';
import { NotFoundView } from './views/NotFoundView';
import { useUser } from './context/UserProvider';
import { Breadcrumb } from './components/Breadcrumb/Breadcrumb';
import { ThemeContextProvider } from './context/ThemeProvider';

function App() {
  const { userRoles } = useUser();
  const location = useLocation();

  // const navigate = useNavigate();
  // const userTypeRedirect = (userRoles: string[]) => {
  //   userRoles.includes('employee') ? navigate('/employee') : navigate('/');
  // };

  // useEffect(() => {
  //   console.log('APP USE EFFECT');
  //   userTypeRedirect(userRoles);
  // }, [userRoles]);

  return (
    <>
      <ThemeContextProvider>
        <div
          className={`flex h-full flex-col  bg-white dark:bg-neutral-800`}
        >
          <Header />
          {location.pathname != '/' && <Breadcrumb />}
          <Routes>
            {EmployeeDinamicRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
            {ClientDinamicRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
             {EmployeeStaticRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
            {ClientStaticRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
            <Route path="*" element={<NotFoundView />} />
          </Routes>
          <article className='flex-1'></article>
          <Footer />
        </div>
      </ThemeContextProvider>
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
