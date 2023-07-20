import { User, useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useTheme } from '../../context/ThemeProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson } from '@fortawesome/free-solid-svg-icons';
export const PerfilView = () => {
  const { user } = useAuth0();
  const { isDarkMode } = useTheme();
  useEffect(() => {
    return () => {};
  }, [user]);
  return (
    <section className="relative flex  flex-1 shrink-0 items-center justify-center   py-16 shadow-lg md:py-20 xl:py-36">
      <img
        src="/perfilmg3.jpg"
        loading="lazy"
        alt="Photo by Fakurian Design"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="z-10 rounded-lg bg-neutral-100 p-6 m-3 lg:m-0">
        {/* quote - start */}
        <div className="flex flex-col items-center gap-4 md:gap-6">
          {isDarkMode ? (
            <img src={'/logoWhite.png'} alt="logo" className="max-w-100 object-contain " />
          ) : (
            <img src={'/logoBlack.png'} alt="logo" className="max-w-100 object-contain " />
          )}

          <h1 className="max-w-md text-center text-neutral-800 lg:text-lg">
            “Este eres tu. Nos complace que seas parte de nuestra familia,”
          </h1>
          <div className="flex flex-col items-center gap-2 sm:flex-row md:gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-neutral-100 shadow-lg md:h-14 md:w-14">
              <FontAwesomeIcon icon={faPerson} size="xl" />
            </div>
            <div>
              <h2 className="text-center text-sm font-bold text-rose-500 sm:text-left md:text-base lg:text-xl">
                {user?.name}
              </h2>
              <h3 className="text-center text-sm text-neutral-800 sm:text-left md:text-sm lg:text-base">
                {user?.email}
              </h3>
            </div>
          </div>

          {/* quote - end */}
        </div>
      </div>
    </section>
  );
};
