import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  callback?: () => void | Promise<void>;
  type: string;
  content: string | JSX.Element;
  color?: string;
  fullsize?: boolean;
  fullheight?: boolean;
  textSize?: string;
};
const violeta =
  'rounded bg-violet-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#4c51bf] transition duration-150 ease-in-out hover:bg-violet-700 hover:shadow-[0_8px_9px_-4px_rgba(76, 81, 191, 0.5),0_4px_18px_0_rgba(76, 81, 191, 0.4)] focus:bg-violet-700 focus:shadow-[0_8px_9px_-4px_rgba(76, 81, 191, 0.5),0_4px_18px_0_rgba(76, 81, 191, 0.4)] focus:outline-none focus:ring-0 active:bg-violet-900 active:shadow-[0_8px_9px_-4px_rgba(76, 81, 191, 0.5),0_4px_18px_0_rgba(76, 81, 191, 0.4)] dark:bg-violet-600 dark:shadow-[0_4px_9px_-4px_rgba(76, 81, 191, 0.5)] dark:hover:bg-violet-700 dark:hover:shadow-[0_8px_9px_-4px_rgba(76, 81, 191, 0.3),0_4px_18px_0_rgba(76, 81, 191, 0.3)] dark:focus:shadow-[0_8px_9px_-4px_rgba(76, 81, 191, 0.3),0_4px_18px_0_rgba(76, 81, 191, 0.3)] dark:active:shadow-[0_8px_9px_-4px_rgba(76, 81, 191, 0.3),0_4px_18px_0_rgba(76, 81, 191, 0.3)]';

const amarillo =
  'rounded bg-amber-400  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-amber-400 transition duration-150 ease-in-out hover:bg-amber-500 hover:shadow-amber-500 focus:bg-amber-600 focus:shadow-amber-600 focus:outline-none focus:ring-0 active:bg-amber-600 active:shadow-amber-600';
const rojo =
  'rounded bg-red-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-red-800 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-red-800 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-red-900 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:bg-rose-600 dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:bg-red-700 dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]';
const verde =
  'rounded bg-green-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-green-800 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-green-800 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-green-900 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:bg-emerald-600 dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:bg-emerald-700 dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]';
const azul =
  'rounded bg-blue-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#2c5282] transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-[0_8px_9px_-4px_rgba(44,82,130,0.5),0_4px_18px_0_rgba(44,82,130,0.4)] focus:bg-blue-700 focus:shadow-[0_8px_9px_-4px_rgba(44,82,130,0.5),0_4px_18px_0_rgba(44,82,130,0.4)] focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-[0_8px_9px_-4px_rgba(44,82,130,0.5),0_4px_18px_0_rgba(44,82,130,0.4)] dark:bg-blue-600 dark:shadow-[0_4px_9px_-4px_rgba(44,82,130,0.5)] dark:hover:bg-blue-700 dark:hover:shadow-[0_8px_9px_-4px_rgba(44,82,130,0.3),0_4px_18px_0_rgba(44,82,130,0.3)] dark:focus:shadow-[0_8px_9px_-4px_rgba(44,82,130,0.3),0_4px_18px_0_rgba(44,82,130,0.3)] dark:active:shadow-[0_8px_9px_-4px_rgba(44,82,130,0.3),0_4px_18px_0_rgba(44,82,130,0.3)]';
const negro =
  'rounded bg-black px-6 pb-2 pt-2.5 text-white text-xs font-medium uppercase leading-normal text-white shadow-black transition duration-150 ease-in-out hover:bg-gray-700 hover:shadow-gray-700 focus:bg-gray-800 focus:shadow-gray-800 focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-gray-800 dark:bg-neutral-100 dark:text-black dark:shadow-white dark:hover:bg-gray-300 dark:hover:shadow-gray-300 dark:focus:bg-gray-100 dark:focus:shadow-gray-100 dark:active:bg-gray-100 dark:active:shadow-gray-100';
export const Button = ({
  callback,
  type,
  content,
  color,
  fullsize,
  textSize,
  fullheight,
}: Props) => {
  const getContent = () => {
    switch (content) {
      case 'add':
        return (
          <h5 className={`${textSize !== undefined ? textSize : 'lg:text-xl'}`}>
            Agregar registro
          </h5>
        );
      case 'x':
        return <FontAwesomeIcon icon={faXmark} size="lg" />;
      default:
        return <h5 className={`${textSize !== undefined ? textSize : 'lg:text-xl'}`}>{content}</h5>;
    }
  };
  const getColor = () => {
    switch (color) {
      case 'rojo':
        return rojo;
      case 'amarillo':
        return amarillo;
      case 'azul':
        return azul;
      case 'verde':
        return verde;
      case 'violeta':
        return violeta;
      default:
        return negro;
    }
  };
  return (
    <button
      onClick={() => callback !== undefined && callback()}
      type={type === 'submit' ? 'submit' : 'button'}
      className={
        getColor() +
        `${fullsize === (false || undefined) ? '  ' : ' w-full '}` +
        `${fullheight === (false || undefined) ? '  ' : ' h-full '}`
      }
    >
      {getContent()}
    </button>
  );
};
