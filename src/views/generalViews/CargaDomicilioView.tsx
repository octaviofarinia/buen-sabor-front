import { useAuth0 } from '@auth0/auth0-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { backend_url } from '../../Utils/ConstUtils';
import { Domicilio } from '../../Interfaces/ClientSide/Domicilio';
import { base_domicilio } from '../../Interfaces/ABM/InterfaceDelivery';
import { handleChange, handleCheckboxChange } from '../../Utils/FormUtils';
import { Button } from '../../components/Botones/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { ToastAlert, notify } from '../../components/Toast/ToastAlert';
import { postDomicilio } from '../../API/Requests/DomicilioRequests/DomicilioRequests';

const CargaDomicilioView: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const isNew = queryParams.get('new') === 'true';
  const { user } = useAuth0();
  const [domicilio, setDomicilio] = useState<Domicilio>(base_domicilio);

  const handleSubmitDomicilio = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log('Post domicilio');
      postDomicilio({ ...domicilio, auth0Id: user?.sub });
    } catch (error) {
      const err = error as AxiosError;
      notify('Se produjo un error: ' + err.message, 'error');
    }
    console.log('Crear domilio');
    notify('Se ha agreado el domicilio', 'success');
    setTimeout(() => {
      navigate(`/`);
    }, 2000);
  };

  useEffect(() => {
    if (isNew) {
      const sendUserData = async () => {
        if (user) {
          try {
            const response = await axios.post(`${backend_url}/usuarios/post_register_save`, {
              auth0Id: user.sub,
              username: user.name,
              email: user.email,
            });
            console.log(response.data);
          } catch (error) {
            console.log(error);
          }
        }
      };

      sendUserData();
    }
    return ()=>{}
  }, [user]);

  return (
    <>
      <div className="grid grid-cols-2 bg-neutral-100 p-6 dark:bg-neutral-800">
        <div className="col-span-1 mx-auto px-4 md:px-8">
          <div className="flex items-center gap-1 py-3 text-neutral-800 dark:text-zinc-100">
            <FontAwesomeIcon icon={faHome} size="lg" />
            <h2 className="m-0 self-end p-0 text-2xl">Tu ubicación</h2>
          </div>

          <form className="w-full max-w-lg" onSubmit={(e) => handleSubmitDomicilio(e)}>
            <div className="-mx-3 mb-6 flex flex-wrap">
              <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                <label
                  className=" mb-2 block text-xl font-bold uppercase tracking-wide text-neutral-700 lg:text-2xl"
                  htmlFor="grid-first-name"
                >
                  Calle
                </label>
                <input
                  className="block w-full appearance-none rounded border border-neutral-200 bg-neutral-200 py-3 px-4 leading-tight text-neutral-700 focus:border-neutral-500 focus:bg-neutral-100 focus:outline-none"
                  type="text"
                  placeholder="Calle..."
                  required
                  aria-errormessage="Debe ingresar el nombre de la calle."
                  name="calle"
                  onChange={(e) => handleChange(e, domicilio, setDomicilio)}
                />
              </div>
              <div className="w-full px-3 md:w-1/2">
                <label
                  className=" mb-2 block text-xl font-bold uppercase tracking-wide text-neutral-700 lg:text-2xl"
                  htmlFor="grid-last-name"
                >
                  Número
                </label>
                <input
                  className="block w-full appearance-none rounded border border-neutral-200 bg-neutral-200 py-3 px-4 leading-tight text-neutral-700 focus:border-neutral-500 focus:bg-neutral-100 focus:outline-none"
                  id="grid-last-name"
                  type="text"
                  placeholder="123..."
                  required
                  aria-errormessage="Debe ingresar el numero de la calle."
                  name="numero"
                  onChange={(e) => handleChange(e, domicilio, setDomicilio)}
                />
              </div>
            </div>
            <div className="-mx-3 mb-2 flex flex-wrap">
              <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                <label
                  className=" mb-2 block text-xl font-bold uppercase tracking-wide text-neutral-700 lg:text-2xl"
                  htmlFor="grid-city"
                >
                  Localidad
                </label>
                <input
                  className="block w-full appearance-none rounded border border-neutral-200 bg-neutral-200 py-3 px-4 leading-tight text-neutral-700 focus:border-neutral-500 focus:bg-neutral-100 focus:outline-none"
                  id="grid-city"
                  type="text"
                  placeholder="4ta sección..."
                  required
                  aria-errormessage="Debe ingresar la localidad."
                  name="localidad"
                  onChange={(e) => handleChange(e, domicilio, setDomicilio)}
                />
              </div>
              <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                <label
                  className=" mb-2 block text-xl font-bold uppercase tracking-wide text-neutral-700 lg:text-2xl"
                  htmlFor="grid-zip"
                >
                  Código Postal
                </label>
                <input
                  className="block w-full appearance-none rounded border border-neutral-200 bg-neutral-200 py-3 px-4 leading-tight text-neutral-700 focus:border-neutral-500 focus:bg-neutral-100 focus:outline-none"
                  id="grid-zip"
                  type="text"
                  required
                  aria-errormessage="Debe ingresar el código postal."
                  placeholder="5500..."
                  name="codigoPostal"
                  onChange={(e) => handleChange(e, domicilio, setDomicilio)}
                />
              </div>
            </div>
            <div className=" my-6 flex flex-wrap items-center gap-3">
              <label
                className=" block  text-xl font-bold uppercase tracking-wide text-neutral-700 lg:text-2xl"
                htmlFor="grid-zip"
              >
                Departamento
              </label>
              <input
                id="grid-zip"
                type="checkbox"
                name="esDepartamento"
                className=" border-neutral-300 bg-neutral-100 text-amber-400  focus:ring-amber-500 dark:border-neutral-600 dark:bg-neutral-700  "
                onChange={(e) => handleCheckboxChange(e, domicilio, setDomicilio)}
              />
            </div>

            <div
              className={`-mx-3 mb-6 flex flex-wrap ${domicilio.esDepartamento ? 'visible' : 'hidden'
                }`}
            >
              <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                <label
                  className=" mb-2 block text-xl font-bold uppercase tracking-wide text-neutral-700 lg:text-2xl"
                  htmlFor="grid-first-name"
                >
                  Número Departamento
                </label>
                <input
                  className="block w-full appearance-none rounded border border-neutral-200 bg-neutral-200 py-3 px-4 leading-tight text-neutral-700 focus:border-neutral-500 focus:bg-neutral-100 focus:outline-none"
                  type="text"
                  placeholder="Departamento 1..."
                  aria-errormessage="Debe ingresar el departamento."
                  name="numeroDpto"
                  onChange={(e) => handleChange(e, domicilio, setDomicilio)}
                />
              </div>
              <div className="w-full px-3 md:w-1/2">
                <label
                  className=" mb-2 block text-xl font-bold uppercase tracking-wide text-neutral-700 lg:text-2xl"
                  htmlFor="grid-last-name"
                >
                  Piso
                </label>
                <input
                  className="block w-full appearance-none rounded border border-neutral-200 bg-neutral-200 py-3 px-4 leading-tight text-neutral-700 focus:border-neutral-500 focus:bg-neutral-100 focus:outline-none"
                  id="grid-last-name"
                  type="text"
                  placeholder="Primer piso..."
                  aria-errormessage="Debe ingresar el piso."
                  name="pisoDpto"
                  onChange={(e) => handleChange(e, domicilio, setDomicilio)}
                />
              </div>
            </div>
            <div className=" my-6 flex flex-wrap items-center gap-3">
              <Button type="submit" color="negro" fullsize={true} content="Agregar domicilio" />
            </div>
          </form>
        </div>
        <div className="col-span-1 mx-auto max-w-screen-2xl px-4 md:px-8">
          <h2 className="text-2xl">Nuestra ubicación</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.0440278187416!2d-68.85593842330017!3d-32.89700417361366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e0908d5e865c5%3A0xb5ec70786453a73!2sUTN%20Facultad%20Regional%20Mendoza!5e0!3m2!1ses-419!2sar!4v1687471866334!5m2!1ses-419!2sar"
            width={600}
            height={450}
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      <ToastAlert />
    </>
  );
};

export default CargaDomicilioView;
