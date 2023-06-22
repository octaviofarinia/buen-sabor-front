import { Route, Routes, useLocation } from 'react-router';
import './App.css';
import { Header } from './components/Header/Header';
import EmployeeDinamicRoutes, { EmployeeStaticRoutes } from './routes/EmployeeRoutesConfigs';
import ClientDinamicRoutes, { ClientStaticRoutes } from './routes/ClientRoutesConfigs';
import { Footer } from './components/Footer/Footer';
import { NotFoundView } from './views/NotFoundView';
import { Breadcrumb } from './components/Breadcrumb/Breadcrumb';
import { ThemeContextProvider } from './context/ThemeProvider';
import CargaDomicilioView from './views/CargaDomicilioView';
import CallbackPage from './components/Auth0/CallbackPage';

function App() {
  const location = useLocation();


  return (
    <>
      <ThemeContextProvider>
        <div className={`flex h-full flex-col  bg-white dark:bg-neutral-800`}>
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
            <Route path="/callback" element={<CallbackPage />} />
            <Route path="*" element={<NotFoundView />} />
          </Routes>
          <article className="flex-1"></article>
          <Footer />
        </div>
      </ThemeContextProvider>
    </>
  );
}


export default App;
