import { Link } from "react-router-dom";

export const NotFoundView = () => {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-lg px-4 md:px-8">
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="flex flex-col items-center justify-center sm:items-start md:py-24 lg:py-32">
            <p className="mb-4 text-sm font-semibold uppercase text-amber-500 md:text-base">
              Error 404
            </p>
            <h1 className="mb-2 text-center text-2xl font-bold text-gray-800 sm:text-left md:text-3xl">
              Página no encontrada
            </h1>
            <p className="mb-8 text-center text-gray-500 sm:text-left md:text-lg">
              La página que estás buscando no existe.
            </p>
            <Link
              to="/"
              className="inline-block rounded-lg bg-amber-400 px-8 py-3 text-center text-sm font-semibold
               text-slate-800 outline-none ring-amber-500 transition duration-100 hover:bg-amber-500 focus-visible:ring active:text-white md:text-base"
            >
              Go home
            </Link>
          </div>

          <div className="relative h-80 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-auto">
            <img
              src="https://images.unsplash.com/photo-1590642916589-592bca10dfbf?auto=format&q=75&fit=crop&w=600"
              loading="lazy"
              alt="Photo by @heydevn"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-lime-400 mix-blend-multiply"></div>
          </div>
          

        </div>
      </div>
    </div>
  );
};
