import { Link } from 'react-router-dom';
import { Route } from '../../Interfaces/NavigationInterfaces/NavigationInterface';
import { Overlay } from '../Overlay/Overlay';

export const ImageLink = ({ type, imagen, name, route,dropdown }: Route) => {
  return (
    <Link
      to={`${type}/${route}`}
      key={route}
      className="group relative flex h-80 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg dark:bg-neutral-800"
    >
      <img
        src={imagen}
        loading="lazy"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
      />
      <Overlay />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

      <div className="relative flex flex-col">
        <span className="text-lg text-gray-300">{type}</span>
        <span className="text-lg font-semibold capitalize text-white lg:text-3xl">{name}</span>
      </div>
    </Link>
  );
};
