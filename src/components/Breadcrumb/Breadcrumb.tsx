import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { parseUnidadDeMedida } from '../../Utils/StringUtils';

export const Breadcrumb = () => {
  const location = useLocation();
  const generarBreadcrumb = () => {
    const apariciones = location.pathname.split('/');
    return apariciones;
  };
  const generarEnlace = (pathnames: string[], index: number) => {
    const porcionesDeLinkNecesarias = pathnames.slice(0, index + 1);
    const url = porcionesDeLinkNecesarias.join('/');
    return url;
  };

  return (
    <nav className="flex items-center gap-1 bg-slate-100 p-4 px-4 text-base dark:bg-neutral-700 md:px-8">
      {generarBreadcrumb().map((link, index) =>
        link === '' && index === 0 ? (
          <Link
            key={link + '' + index}
            to={'/'}
            className={`${
              index === generarBreadcrumb().length - 1
                ? 'text-amber-400'
                : 'text-black dark:text-zinc-50'
            } flex gap-1 `}
          >
            <FontAwesomeIcon
              icon={faHome}
              size="sm"
              className="mt-0.5 text-black dark:text-zinc-50"
            />
            <span className="text-black dark:text-zinc-50">/</span>
          </Link>
        ) : link === 'edit' || link == 'ABM' || link =="Detalle" ? (
          <h6 className="flex gap-1 text-black dark:text-zinc-50"  key={link}>
            {parseUnidadDeMedida(link)}
            <span className="text-black dark:text-zinc-50">/</span>
          </h6>
        ) : (
          <Link
            to={generarEnlace(generarBreadcrumb(), index)}
            key={link + '' + index}
            className={`${
              index === generarBreadcrumb().length - 1
                ? 'text-amber-400'
                : 'text-black dark:text-zinc-50'
            } flex gap-1 `}
          >
            {parseUnidadDeMedida(link)}
            {index !== generarBreadcrumb().length - 1 ? (
              <span className="text-black dark:text-zinc-50">/</span>
            ) : (
              ''
            )}
          </Link>
        )
      )}
    </nav>
  );
};
