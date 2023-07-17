import { Route, Routes, useLocation } from 'react-router';
import './App.css';
import { Header } from './components/Header/Header';
import EmployeeDinamicRoutes, { EmployeeStaticRoutes } from './routes/EmployeeRoutesConfigs';
import ClientDinamicRoutes, { ClientStaticRoutes } from './routes/ClientRoutesConfigs';
import { Footer } from './components/Footer/Footer';
import { NotFoundView } from './views/NotFoundView';
import { Breadcrumb } from './components/Breadcrumb/Breadcrumb';
import { ThemeContextProvider } from './context/ThemeProvider';
import CallbackPage from './components/Auth0/CallbackPage';
import { CartProvider } from './context/CarritoProvider';
import { initMercadoPago } from '@mercadopago/sdk-react';

initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY);

function App() {
  const location = useLocation();

  return (
    <>
      <ThemeContextProvider>
        <CartProvider>
          <div className={`flex h-full flex-col  bg-zinc-100 dark:bg-neutral-800`}>
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
            <article className="flex-auto"></article>
            <Footer />
          </div>
        </CartProvider>
      </ThemeContextProvider>
    </>
  );
}

export default App;
