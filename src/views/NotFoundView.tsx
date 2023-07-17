import { faFaceSadCry, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../components/Botones/Button';
import { useNavigate } from 'react-router-dom';

export const NotFoundView = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-neutral-100 py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-lg px-4 md:px-8">
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="flex flex-col items-center  justify-center sm:items-start md:py-24 lg:py-32">
            <h5 className="mb-4 text-sm font-semibold uppercase text-amber-500 md:text-base">
              Error 404
            </h5>
            <h1 className="mb-2 text-center text-2xl font-bold text-neutral-800 sm:text-left md:text-3xl">
              Parece que te perdiste!
            </h1>
            <h2 className="mb-2 text-center text-xl font-bold text-neutral-500 sm:text-left md:text-xl">
              Navegar a veces puede ser complicado.{' '}
              <FontAwesomeIcon icon={faFaceSadCry} size="xl" />
            </h2>
            <Button
              content={
                <p className='flex gap-3 items-center'>
                  Volver al inicio <FontAwesomeIcon icon={faHome} size="md" />
                </p>
              }
              color="amarillo"
              callback={() => navigate('/')}
              type="button"
            />
          </div>

          <div className="relative h-80 overflow-hidden rounded-lg bg-neutral-100 shadow-lg md:h-auto">
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
