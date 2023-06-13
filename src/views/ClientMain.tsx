import { Link } from 'react-router-dom';
import routes from '../Interfaces/NavigationInterfaces/UserRoutes.json';
import { Overlay } from '../components/Overlay/Overlay';
export const ClientMain = () => {
  return (
    <div className="flex w-full flex-col">
      <section className="h-80 relative flex flex-1 shrink-0 items-center justify-center  py-16 shadow-lg md:py-20 xl:py-36 ">
        <img
          src="/burgasMain.jpg"
          loading="lazy"
          alt="Photo by Fakurian Design"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-slate-500 mix-blend-multiply"></div>
        <div className="absolute top-0 flex flex-wrap items-center w-full gap-5 px-4 py-3 lg:px-10 ">
          <img src="/Take Away Cartel.png" alt="" className="w-12 sm:w-20" />
          <img src="/Delivery Cartel.png" alt="" className="w-12 sm:w-20" />
          <img src="/MPlogo.png" alt="" className="w-20 sm:w-28" />

        </div>
        <div className="relative flex flex-col items-center p-4 sm:max-w-xl">
          <h2 className="mb-4 text-center text-lg uppercase text-zinc-100 sm:text-2xl md:mb-8">
            Bienvenidos al Buen Sabor
          </h2>
          <h1 className="mb-8 text-center text-4xl font-bold text-amber-400 sm:text-5xl md:mb-12 md:text-6xl">
            Donde comer es una revolución
          </h1>

          <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center">
            <Link
              to="/Productos"
              className="inline-block rounded-lg bg-amber-400 px-8 py-3 text-center text-sm font-semibold text-neutral-900 outline-none
           ring-amber-400 transition duration-100 hover:bg-amber-500 focus-visible:ring active:bg-amber-500 md:text-xl"
            >
              Ver nuestros productos
            </Link>

            <Link
              to="/Nosotros"
              className="inline-block rounded-lg bg-neutral-900 px-8 py-3 text-center text-sm font-semibold text-amber-400 outline-none
           ring-neutral-900 transition duration-100 hover:bg-neutral-800 focus-visible:ring active:bg-neutral-800 md:text-xl"
            >
              Conocenos
            </Link>
          </div>
        </div>
      </section>
      <section>
        <div className="py-6 bg-white dark:bg-neutral-800">
          <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
            <div className="grid gap-6 sm:grid-cols-2">
              {routes.map((route) => (
                <Link
                  to={`/Productos/${route.name}`}
                  key={route.name}
                  className="group relative flex h-40 items-end overflow-hidden rounded-lg bg-gray-100 dark:bg-neutral-800 p-4 shadow-lg"
                >
                  <img
                    src={route.imagen}
                    loading="lazy"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                  />
                  <Overlay/>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

                  <div className="relative flex flex-col">
                    <span className="text-gray-300 text-sm">Ver productos</span>
                    <span className="text-lg font-semibold capitalize text-white lg:text-3xl">
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
