import { faBurger } from '@fortawesome/free-solid-svg-icons';
import { users } from '../../Interfaces/userInteface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

interface Users {
  user: users;
}
export const Footer = ({ user }: Users) => {
  return user.role == 'USER' ? (
    <footer className="body-font bg-slate-900 text-slate-900 ">
      <div className="text-md container mx-auto px-5 lg:text-lg">
        <div className="order-first flex h-80 flex-wrap text-center md:text-left ">
          <div className="flex w-full  flex-col gap-3 overflow-hidden px-4 pt-8 text-zinc-100 md:w-1/2 lg:w-1/3">
            <h2 className=" mb-3  font-medium uppercase  tracking-wider">
              el buen sabor
            </h2>
            <Link
              to="/Inicio"
              className={`flex flex-wrap px-2  duration-500 ease-in-out hover:px-10 hover:py-2 hover:text-xl hover:text-amber-400 active:bg-amber-500
              active:text-slate-900 ${styles}`}
            >
              <p>Inicio</p>
            </Link>
            <Link
              to="/Productos"
              className={`flex flex-wrap px-2  duration-500 ease-in-out hover:px-10 hover:py-2 hover:text-xl hover:text-amber-400 active:bg-amber-500
              active:text-slate-900 ${styles}`}
            >
              <p>Productos</p>
            </Link>
            <Link
              to="/Carrito"
              className={`flex flex-wrap px-2  duration-500 ease-in-out hover:px-10 hover:py-2 hover:text-xl hover:text-amber-400 active:bg-amber-500
              active:text-slate-900 ${styles}`}
            >
              <p>Carrito</p>
            </Link>
            <Link
              to="/Nosotros"
              className={`flex flex-wrap px-2  duration-500 ease-in-out hover:px-10 hover:py-2 hover:text-xl hover:text-amber-400 active:bg-amber-500
              active:text-slate-900 ${styles}`}
            >
              <p>Nosotros</p>
            </Link>
            <Link
              to="/Donde-Estamos"
              className={`flex flex-wrap px-2  duration-500 ease-in-out hover:px-10 hover:py-2 hover:text-xl hover:text-amber-400 active:bg-amber-500
              active:text-slate-900 ${styles}`}
            >
              <p>Donde Estamos</p>
            </Link>
          </div>
          <div className="flex w-full flex-col gap-3 px-4 pt-8  text-zinc-100 md:w-1/2  lg:w-1/3">
            <h2 className=" mb-3  font-medium uppercase  tracking-wider">
              Formas de Retiro
            </h2>
            <div className="flex gap-5">
              <img src="../../../public/Take_Away_Cartel.png" alt="" />
              <img src="../../../public/Delivery_Cartel.png" alt="" />
            </div>
          </div>
          <div className="flex w-full  flex-col gap-3 overflow-hidden px-4 pt-8 text-zinc-100 md:w-1/2 lg:w-1/3">
            <h2 className=" mb-3  font-medium uppercase  tracking-wider">
              Medios de pago (PLACEHOLDER)
            </h2>
            <div className='flex items-center '>
              <img
                src="../../../public/mediosPago.png"
                alt=""
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-900">
        <div className="container mx-auto flex flex-col items-center px-5 py-6 sm:flex-row">
          <a className="title-font flex items-center justify-center p-2 font-medium text-gray-900 md:justify-start">
            <FontAwesomeIcon
              icon={faBurger}
              size="2xl"
              style={{ color: '#fcd34d' }}
            />
            <h5 className="ml-3 text-xl uppercase text-amber-300">
              El Buen Sabor
            </h5>
          </a>
          <p className="mt-4  text-amber-300 sm:ml-6 sm:mt-0">
            © 2023 El Buen Sabor —
            <a
              href="https://twitter.com/FrancoMinatii"
              rel="noopener noreferrer"
              className="ml-1 text-zinc-400"
              target="_blank"
            >
              @FrancoMinatii
            </a>
            &nbsp; —
            <a
              href="https://twitter.com/Octaviofaria1              "
              rel="noopener noreferrer"
              className="ml-1 text-zinc-400"
              target="_blank"
            >
              @Octaviofaria1
            </a>
          </p>
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
  ) : null;
};
