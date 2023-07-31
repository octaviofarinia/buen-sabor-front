import { faBurger, faFaceKissBeam } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faGithubSquare } from '@fortawesome/fontawesome-free-brands';
import { Banner } from '../Banner/Banner';

export const Footer = () => {
  return (
    <footer className="body-font bg-neutral-900 text-slate-900 ">
      <div className="text sm container mx-auto p-3 px-5 lg:text-lg">
        <div className="order-first flex  flex-wrap text-center sm:text-left ">
          <div className="flex h-72  w-full flex-col  gap-3 overflow-hidden px-4 pt-8 text-neutral-100 sm:w-1/2 lg:w-1/3">
            <h2 className=" mb-3  font-medium uppercase  tracking-wider">el buen sabor</h2>
            <Link
              to="/"
              className={`flex flex-wrap px-3  duration-500 ease-in-out hover:px-10 hover:py-2 hover:text-xl hover:text-amber-400  active:bg-amber-500
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
              to="/NuestroEquipo"
              className={`flex flex-wrap px-3  duration-500 ease-in-out hover:px-10 hover:py-2 hover:text-xl hover:text-amber-400   active:bg-amber-500
              active:text-slate-900 `}
            >
              <p>Nuestro Equipo</p>
            </Link>
            <Link
              to="/TuPedido"
              className={`flex flex-wrap px-3  duration-500 ease-in-out hover:px-10 hover:py-2 hover:text-xl hover:text-amber-400   active:bg-amber-500
              active:text-slate-900 `}
            >
              <p>Tu Pedido</p>
            </Link>
          </div>
          <div className="flex w-full flex-col gap-3 px-4 pt-8  text-neutral-100 sm:w-1/2  lg:w-1/3">
            <h2 className=" mb-3  font-medium uppercase  tracking-wider">Formas de Retiro</h2>
            <div className="flex items-center justify-center gap-5 sm:items-start sm:justify-start">
              <img src="/Take Away Cartel.png" alt="" className="w-24" />
              <img src="/Delivery Cartel.png" alt="" className="w-24" />
            </div>
          </div>
          <div className="flex w-full flex-col justify-center overflow-hidden   lg:w-1/3">
            <div className="mx-auto flex gap-5 rounded-lg bg-amber-500 p-5 text-neutral-100 md:p-12">
              <h5 className="text-lg md:text-2xl">Nos encanta que nos visites</h5>
              <FontAwesomeIcon icon={faFaceKissBeam} size="xl" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-neutral-800">
        <div className="container mx-auto flex flex-col items-center px-5 py-6 sm:flex-row ">
          <a className="title-font group peer flex items-center justify-center p-2 font-medium text-gray-900 sm:justify-start">
            <FontAwesomeIcon
              icon={faBurger}
              size="2xl"
              className="text-amber-400 group-hover:text-amber-300"
            />
            <h5 className="ml-3 text-xl uppercase text-amber-400 group-hover:text-amber-300">
              El Buen Sabor
            </h5>
          </a>
          <h5 className="mt-4 flex flex-col items-center gap-3 text-sm text-amber-400 peer-hover:text-amber-300 sm:ml-6 sm:mt-0 sm:flex-row sm:text-base">
            © 2023 El Buen Sabor
            <a
              href="https://github.com/FrancoMinati"
              rel="noopener noreferrer"
              className="ml-1 flex  gap-2  text-neutral-400 hover:text-neutral-200"
              target="_blank"
            >
              <FontAwesomeIcon icon={faGithubSquare} size="xl" />
              FrancoMinati
            </a>
            <a
              href="https://github.com/octaviofarinia"
              rel="noopener noreferrer"
              className="ml-1 flex gap-2 text-sm text-base  text-neutral-400 hover:text-neutral-200 sm:text-base"
              target="_blank"
            >
              <FontAwesomeIcon icon={faGithubSquare} size="xl" />
              octaviofarinia
            </a>
          </h5>
        </div>
      </div>
    </footer>
  );
};
