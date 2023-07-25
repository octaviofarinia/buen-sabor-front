import { Link } from 'react-router-dom';
import routes from '../../Interfaces/NavigationInterfaces/UserRoutes.json';
import { Overlay } from '../../components/Overlay/Overlay';
export const ClientMain = () => {
  return (
    <div className="flex w-full flex-col">
      <section className="relative flex h-80 flex-1 shrink-0 items-center justify-center   py-16 shadow-lg md:py-20 xl:py-36">
        <img
          src="/burgasMain.jpg"
          loading="lazy"
          alt="Photo by Fakurian Design"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-slate-500 mix-blend-multiply "></div>
        <div className="absolute top-0 flex w-full flex-wrap items-center gap-5 px-4 py-3 lg:px-10 ">
          <img src="/Take Away Cartel.png" alt="" className="w-12 sm:w-20" />
          <img src="/Delivery Cartel.png" alt="" className="w-12 sm:w-20" />
          <img src="/MPlogo.png" alt="" className="w-20 sm:w-28" />
        </div>
        <div className="relative flex flex-col items-center p-4 sm:max-w-xl">
          <h2 className="mb-4 text-center text-lg uppercase text-neutral-100  sm:text-2xl md:mb-8">
            Bienvenidos al Buen Sabor
          </h2>
          <h1 className="mb-8 text-center text-4xl font-bold text-amber-400 sm:text-5xl md:mb-12 md:text-6xl">
            Donde comer es una revolución
          </h1>

          <div className="hover: flex w-full flex-col h-12 gap-2.5 overflow-y-hidden sm:flex-row sm:justify-center">
            <Link
              to="/Productos"
              className="flex items-center rounded-md p-2 text-sm text-neutral-800  bg-amber-400 hover:border-b-4 hover:border-b-amber-600
              hover:bg-amber-500 hover:text-neutral-100 hover:duration-300 hover:ease-in-out active:text-amber-500 lg:text-lg xl:px-3 xl:py-4"
            >
              Ver nuestros productos
            </Link>

            <Link
              to="/Nosotros"
              className="flex items-center rounded-md p-2 text-sm text-amber-400  bg-neutral-800 hover:border-b-4 hover:border-b-neutral-700
               hover:bg-neutral-800 hover:text-neutral-100 hover:duration-300 hover:ease-in-out active:text-amber-500 lg:text-lg xl:px-3 xl:py-4"
            >
              Conocenos
            </Link>
          </div>
        </div>
      </section>
      <section>
        <div className="bg-neutral-100 py-6 dark:bg-neutral-800">
          <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
            <div className="grid gap-6 sm:grid-cols-2">
              {routes.map((route) => (
                <Link
                  to={`/Productos?filtro=${route.name}`}
                  key={route.name}
                  className="group relative flex h-40 items-end overflow-hidden rounded-lg bg-neutral-100 p-4 shadow-lg dark:bg-neutral-800"
                >
                  <img
                    src={route.imagen}
                    loading="lazy"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                  />
                  <Overlay />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

                  <div className="relative flex flex-col">
                    <span className="text-sm text-gray-300">Ver productos</span>
                    <span className="text-lg font-semibold capitalize text-neutral-100  lg:text-3xl">
                      {route.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
