import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import { hardDelete } from '../../API/Requests/BaseRequests';
import { useNavigate } from 'react-router-dom';
import { notify } from '../Toast/ToastAlert';
import { AxiosError } from 'axios';
import { Button } from './Button';
import { useAuth0 } from '@auth0/auth0-react';
import { DELAYED_REDIRECT_COMMON_TIME } from '../../Utils/NavigationUtils';

export const HardDeleteButton = ({ id, endpoint: endpoint }: { id: number; endpoint: string }) => {
  const [visible, toggleVisible] = useState(false);
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const handleDelete = async () => {
    let status = false;
    await getAccessTokenSilently()
      .then(async (accessToken) => {
        await hardDelete({ id: id, endpoint: endpoint, token: accessToken }).then(
          () => (status = true)
        );
      })
      .catch((err) => {
        const axiosError = err as AxiosError;
        console.log(axiosError);

        notify('No es posible eliminar el registro. ' + axiosError.response?.status, 'error');
      });
    status && notify('Se elimino el registro', 'success');
    setTimeout(() => {
      navigate(`/employee`);
    }, DELAYED_REDIRECT_COMMON_TIME);
  };

  return (
    <div className="flex  pl-5">
      <Button
        callback={() => toggleVisible(!visible)}
        type="button"
        color="rojo"
        content={
          <p>
            {' '}
            <FontAwesomeIcon icon={faTriangleExclamation} size="xl" /> Borrar
          </p>
        }
      ></Button>
      <div
        className={`${
          visible ? 'visible' : 'hidden'
        } fixed inset-0 z-20 overflow-y-auto bg-neutral-400 bg-opacity-75 transition-opacity`}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal={true}
      >
        <div className=" m-auto flex h-full w-1/2 items-center justify-center px-4 pt-4 pb-20 text-center sm:p-0 lg:mx-auto">
          <span className="sm: hidden sm:inline-block sm:align-middle" aria-hidden="true">
            ​
          </span>
          {/*Modal panel : This is where you put the pop-up's content, the div on top this coment is the wrapper */}
          <div
            className=" mx-auto my-auto flex w-2/3 transform flex-col justify-between gap-5 overflow-hidden rounded-lg bg-rose-700 
          p-12 "
          >
            <div className="flex w-full justify-between ">
              <h2 className="text-2xl text-white">¿Estas seguro de querer eliminar el registro?</h2>
              <Button
                callback={() => toggleVisible(!visible)}
                type="button"
                color="negro"
                content={<FontAwesomeIcon icon={faXmark} size="lg" />}
              ></Button>
            </div>
            <div className="flex w-full items-center justify-center gap-5">
              <Button
                callback={() => {
                  handleDelete();
                }}
                type="button"
                color="amarillo"
                fullsize={true}
                content={'Sí, Eliminar'}
              ></Button>
              <Button
                callback={() => toggleVisible(!visible)}
                type="button"
                color="negro"
                fullsize={true}
                content={'NO'}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
