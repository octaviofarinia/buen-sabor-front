import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../Botones/Button';
import { faHome } from '@fortawesome/free-solid-svg-icons';

interface Banner {
  color: string;
  text: string;
  icon: JSX.Element;
  homeButton?: boolean;
  callback?: () => void;
}

export const Banner = ({ color, text, icon, callback, homeButton }: Banner) => {
  return (
    <div className="bg-normal-50 pt-6 sm:pt-8 lg:pt-12">
      <div className="mx-auto max-w-screen-2xl p-4 md:px-8">
        <div
          className={`relative flex flex-col flex-wrap rounded-lg bg-${color}-500 p-8 shadow-lg sm:flex-nowrap sm:items-center sm:justify-center sm:gap-3 sm:pr-8 md:gap-6 md:px-8`}
        >
          <h2 className="text-xl text-neutral-100 md:text-2xl">
            {icon} {text}
          </h2>

          {homeButton && (
            <Button
              content={
                <p>
                  Volver al Inicio <FontAwesomeIcon icon={faHome} size="xl" />
                </p>
              }
              type="button"
              color="negro"
              textSize="text-lg"
              callback={callback}
            />
          )}
        </div>
      </div>
    </div>
  );
};
