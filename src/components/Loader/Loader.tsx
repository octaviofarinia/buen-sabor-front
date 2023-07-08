import { HashLoader } from 'react-spinners';
import { Button } from '../Botones/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface LoaderInterface {
  texto: string;
  closeLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  showCloseLoading?: boolean;
}

export const Loader = (loader: LoaderInterface) => {
  return (
    <div className="fixed inset-0 flex animate-loadinGradient flex-col items-center justify-center gap-5 bg-neutral-900 ">
      <div className="fixed top-5 right-5">
        {loader.showCloseLoading && (
          <Button
            content={
              <p className="flex gap-5">
                Cancelar carga <FontAwesomeIcon icon={faXmark} size="lg" />
              </p>
            }
            type="button"
            callback={() => loader.closeLoading !== undefined && loader.closeLoading(false)}
          />
        )}
      </div>
      <HashLoader color={'#fbbf24'} size={120} />
      <h2 className="text-xl md:text-4xl ">{loader.texto}</h2>
    </div>
  );
};
