import { faBurger } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import { faGithubSquare } from '@fortawesome/fontawesome-free-brands';

export const Footer: React.FC<{}> = () => {
  const location = useLocation();

  return (
    <footer className="body-font bg-neutral-900 text-slate-900  ">
      <div className="text sm container mx-auto p-3 px-5 lg:text-lg">
        <div className="order-first flex  flex-wrap text-center sm:text-left ">
          <div className="flex h-72  w-full flex-col  gap-3 overflow-hidden px-4 pt-8 text-zinc-100 sm:w-1/2 lg:w-1/3">
            <h2 className=" mb-3  font-medium uppercase  tracking-wider">el buen sabor</h2>
            <Link
              to="/"
              className={`flex flex-wrap px-2  duration-500 ease-in-out hover:px-10 hover:py-2 hover:text-xl hover:text-amber-400  active:bg-amber-500
              active:text-slate-900 `}
            >
              <p>Inicio</p>
            </Link>
            <Link
              to="/Productos"
              className={`flex flex-wrap px-3  duration-500 ease-in-out hover:px-10 hover:py-2 hover:text-xl hover:text-amber-400  active:bg-amber-500
              active:text-slate-900 `}
            >
              <p>Productos</p>
            </Link>
            <Link
              to="/Carrito"
              className={`flex flex-wrap px-3  duration-500 ease-in-out hover:px-10 hover:py-2 hover:text-xl hover:text-amber-400  active:bg-amber-500
              active:text-slate-900 `}
            >
              <p>Carrito</p>
            </Link>
            <Link
              to="/Nosotros"
              className={`flex flex-wrap px-3  duration-500 ease-in-out hover:px-10 hover:py-2 hover:text-xl hover:text-amber-400   active:bg-amber-500
              active:text-slate-900 `}
            >
              <p>Nosotros</p>
            </Link>
            <Link
              to="/Donde-Estamos"
              className={`flex flex-wrap px-2  duration-500 ease-in-out hover:px-10 hover:py-2 hover:text-xl hover:text-amber-400  active:bg-amber-500
              active:text-slate-900 `}
            >
              <p>Donde Estamos</p>
            </Link>
          </div>
          <div className="flex w-full flex-col gap-3 px-4 pt-8  text-zinc-100 sm:w-1/2  lg:w-1/3">
            <h2 className=" mb-3  font-medium uppercase  tracking-wider">Formas de Retiro</h2>
            <div className="flex items-center justify-center gap-5 sm:items-start sm:justify-start">
              <img src="/Take Away Cartel.png" alt="" className="w-24" />
              <img src="/Delivery Cartel.png" alt="" className="w-24" />
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 overflow-hidden px-4 pt-8 text-zinc-100  lg:w-1/3">
            <h2 className=" mb-3  font-medium uppercase  tracking-wider">
              Medios de pago (PLACEHOLDER)
            </h2>
            <div className="flex flex-col items-center ">
              <img src="/mediosPago.png" alt="" className="max-w-fit object-contain" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-neutral-800">
        <div className="container mx-auto flex flex-col items-center px-5 py-6 sm:flex-row ">
          <a className="title-font flex items-center justify-center p-2 font-medium text-gray-900 sm:justify-start">
            <FontAwesomeIcon icon={faBurger} size="2xl" className="text-amber-400" />
            <h5 className="ml-3 text-xl uppercase text-amber-400">El Buen Sabor</h5>
          </a>
          <h5 className="mt-4 flex flex-col items-center gap-3 text-sm text-amber-400 sm:ml-6 sm:mt-0 sm:flex-row sm:text-base">
            © 2023 El Buen Sabor
            <a
              href="https://github.com/FrancoMinati"
              rel="noopener noreferrer"
              className="ml-1 flex  gap-2  text-zinc-400 hover:text-zinc-200"
              target="_blank"
            >
              <FontAwesomeIcon icon={faGithubSquare} size="xl" />
              FrancoMinati
            </a>
            <a
              href="https://github.com/octaviofarinia"
              rel="noopener noreferrer"
              className="ml-1 flex gap-2 text-sm text-base  text-zinc-400 hover:text-zinc-200 sm:text-base"
              target="_blank"
            >
              <FontAwesomeIcon icon={faGithubSquare} size="xl" />
              octaviofarinia
            </a>
          </h5>
          <span className="mt-4 inline-flex justify-center sm:ml-auto sm:mt-0 sm:justify-start">
            <a className="text-zinc-200">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-5 w-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-zinc-200">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-5 w-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-zinc-200">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-5 w-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a className="ml-3 text-zinc-200">
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="h-5 w-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};
