import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { parseUnidadDeMedida } from '../../Utils/StringUtils';

export const Breadcrumb = () => {
  const location = useLocation();
  const { userRoles } = useUser();
  const generarBreadcrumb = () => {
    const apariciones = location.pathname.split('/');
    return apariciones;
  };

  return (
    <nav className="flex items-center p-4 px-4 md:px-8 text-base gap-1">
      { generarBreadcrumb().map((link, index) =>
          index === 0 ? (
            <Link
              to={userRoles.includes('employee') ?'/employee':"/"}
              className={`${
                index === generarBreadcrumb().length - 1 ? 'text-amber-400' : 'text-black'
              } flex gap-1 `}
            >
              <FontAwesomeIcon icon={faHome} size="sm" className='mt-0.5' />
              <span className="text-black">/</span>
            </Link>
          ) : index === generarBreadcrumb().length - 1 ? (
            <Link
              to={`/${link}`}
              className="text text-amber-400 underline"
            >
              {parseUnidadDeMedida(link)}
            </Link>
          ) : (
            <Link
              to={`/${link}/`}
              className= 'text-black flex gap-1'
            >
              {parseUnidadDeMedida(link)}
              <span className="text-black">/</span>
            </Link>
          )
        )}
    </nav>
  );
};
