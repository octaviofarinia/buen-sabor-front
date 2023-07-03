import { faGithubSquare, faTwitterSquare } from '@fortawesome/fontawesome-free-brands';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const TeamView = () => {
  return (
    <div className="bg-zinc-50 py-6 dark:bg-neutral-800">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center px-4 md:px-8">
        {/* text - start */}
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-neutral-800 dark:text-zinc-100 md:mb-6 lg:text-3xl">
            Conocé a nuestro equipo
          </h2>
          <p className="mx-auto max-w-screen-md text-center text-neutral-500 dark:text-zinc-300 md:text-lg">
            En esta página, te invitamos a conocer a las personas apasionadas y talentosas que
            conforman nuestro equipo. Nos enorgullece presentarte a quienes trabajan incansablemente
            detrás de escena para brindarte productos y servicios de la más alta calidad.
          </p>
        </div>
        {/* text - end */}
        <div className="grid max-w-md grid-cols-2 gap-x-4  gap-y-8 lg:gap-x-8 lg:gap-y-12">
          {/* person - start */}
          <div>
            <div className="mb-2 h-48 overflow-hidden rounded-lg bg-neutral-100 shadow-lg sm:mb-4 sm:h-60 md:h-80">
              <img
                src={'/usFranco.png'}
                loading="lazy"
                alt="Photo by Radu Florin"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div>
              <h2 className="font-bold text-amber-500 md:text-lg">Franco Minati</h2>
              <p className="mb-3 text-sm text-neutral-500 dark:text-zinc-300 md:mb-4 md:text-base">
                Co-Fundador / CEO
              </p>
              {/* social - start */}
              <div className="flex">
                <div className="flex gap-4">
                  <a
                    href="https://github.com/FrancoMinati"
                    target="_blank"
                    className="text-neutral-400 transition duration-100 hover:text-neutral-500 active:text-neutral-600 dark:text-zinc-300"
                  >
                    <FontAwesomeIcon icon={faGithubSquare} size="xl" />
                  </a>
                  <a
                    href="https://twitter.com/FrancoMinatii"
                    target="_blank"
                    className="text-neutral-400 transition duration-100 hover:text-neutral-500 active:text-neutral-600 dark:text-zinc-300"
                  >
                    <FontAwesomeIcon icon={faTwitterSquare} size="xl" />
                  </a>
                </div>
              </div>
              {/* social - end */}
            </div>
          </div>
          {/* person - end */}
          {/* person - start */}
          <div>
            <div className="mb-2 h-48 overflow-hidden rounded-lg bg-neutral-100 shadow-lg sm:mb-4 sm:h-60 md:h-80">
              <img
                src={'/usOcti.jpg'}
                loading="lazy"
                alt="Photo by christian ferrer"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div>
              <h2 className="font-bold text-amber-500 md:text-lg">Octavio Fariña</h2>
              <p className="mb-3 text-sm text-neutral-500 dark:text-zinc-300 md:mb-4 md:text-base">
                Co-Fundador / CFO
              </p>
              {/* social - start */}
              <div className="flex">
                <div className="flex gap-4">
                  <a
                    href="https://github.com/octaviofarinia"
                    target="_blank"
                    className="text-neutral-400 transition duration-100 hover:text-neutral-500 active:text-neutral-600 dark:text-zinc-300"
                  >
                    <FontAwesomeIcon icon={faGithubSquare} size="xl" />
                  </a>
                  <a
                    href="https://twitter.com/Octaviofaria1"
                    target="_blank"
                    className="text-neutral-400 transition duration-100 hover:text-neutral-500 active:text-neutral-600 dark:text-zinc-300"
                  >
                    <FontAwesomeIcon icon={faTwitterSquare} size="xl" />
                  </a>
                </div>
              </div>
              {/* social - end */}
            </div>
          </div>
          {/* person - end */}
        </div>
      </div>{' '}
    </div>
  );
};
