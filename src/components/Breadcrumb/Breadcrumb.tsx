import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { parseUnidadDeMedida } from '../../utils/StringUtils';

export const Breadcrumb = () => {
  const location = useLocation();
  const generarBreadcrumb = () => {
    const apariciones = location.pathname.split('/');
    return apariciones;
  };

  return (
    <nav className="flex items-center gap-1 p-4 px-4 text-base md:px-8 bg-slate-100 dark:bg-neutral-700">
      {generarBreadcrumb().map((link, index) =>
        (link === ''&& index===0 )? (
          <Link
            key={link + '' + index}
            to={'/'}
            className={`${
              index === generarBreadcrumb().length - 1 ? 'text-amber-400' : 'text-black dark:text-zinc-50'
            } flex gap-1 `}
          >
            <FontAwesomeIcon icon={faHome} size="sm" className="mt-0.5 text-black dark:text-zinc-50" />
            <span className="text-black dark:text-zinc-50">/</span>
          </Link>
        ) : link === 'edit' ? (
          <Link key={link + '' + index}
            to={`/employee/${generarBreadcrumb()[index - 1]}`}
            className="flex gap-1 text-black dark:text-zinc-50"
          >
            {parseUnidadDeMedida(link)}
            <span className="text-black dark:text-zinc-50">/</span>
          </Link>
        ) : (
          <Link
            to={`/${link}`} key={link + '' + index}
            className={`${
              index === generarBreadcrumb().length - 1 ? 'text-amber-400' : 'text-black dark:text-zinc-50'
            } flex gap-1 `}
          >
            {parseUnidadDeMedida(link)}
            {index !== generarBreadcrumb().length - 1 ? <span className="text-black dark:text-zinc-50">/</span> : ""}
            
          </Link>
        )
      )}
    </nav>
  );
};
