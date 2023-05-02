import routes from '../Interfaces/routes.json';
export const EmployeeMain = ({ employeeName }) => {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {routes.map((route) => (
            <a
              href="#"
              className="group relative flex h-80 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg"
            >
              <img
                src={route.imagen}
                loading="lazy"
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

              <div className="relative flex flex-col">
                <span className="text-gray-300">ABM</span>
                <span className="text-lg font-semibold text-white lg:text-xl">
                  {route.name}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
