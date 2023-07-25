import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react'; // Import 'useState'
import { ToastAlert, notify } from '../../components/Toast/ToastAlert';
import { updateStock } from '../../API/Requests/IngredienteRequests/IngredienteRequests';
import { Button } from '../../components/Botones/Button';
import { useAuth0 } from '@auth0/auth0-react';
import { AxiosError } from 'axios';
import { DELAYED_REDIRECT_COMMON_TIME } from '../../Utils/NavigationUtils';

export const AgregarStockView = () => {
  const { id } = useParams();
  const [precio, setPrecio] = useState<number>(0); // State para guardar el valor del precio
  const [cantidad, setCantidad] = useState<number>(0); // State para guardar el valor de la cantidad
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await getAccessTokenSilently()
      .then(async (accessToken) => {
        await updateStock(Number(id), precio, cantidad, accessToken);
        setTimeout(() => {
          navigate('/employee/ABM/Ingredientes');
        }, DELAYED_REDIRECT_COMMON_TIME);
      })
      .catch((error) => {
        const err = error as AxiosError;
        notify(err.message, 'error');
      });
  }

  return (
    <div className="relative bg-neutral-100 py-6 dark:bg-neutral-800 sm:py-8 lg:py-12 ">
      <div className="mx-auto max-w-screen-sm px-4 md:px-8 lg:px-20">
        <h2 className=" text-center text-2xl font-bold text-neutral-800 dark:text-neutral-100  lg:text-4xl">
          <span className="block">Cargar stock </span>
        </h2>
      </div>

      <form
        className="mx-auto flex max-w-screen-sm flex-col gap-5"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="denominacion" className="lg:text-2xl">
          Precio
        </label>
        <input
          name={'precio'}
          id={'precio'}
          className="col-span-2 w-full rounded border bg-neutral-50 px-3 py-2 text-neutral-800 outline-none ring-amber-400 transition duration-100 focus:ring dark:border-neutral-400 dark:bg-neutral-700 dark:text-neutral-100"
          placeholder="Denominación..."
          required
          value={precio} // Asigna el valor del state 'precio' al campo 'value'
          onChange={(e) => setPrecio(Number(e.target.value))} // Actualiza el state 'precio' cuando el valor cambie
        />
        <label htmlFor="precioCompra" className="lg:text-2xl">
          Cantidad
        </label>
        <input
          name={'cantidad'}
          id={'cantidad'}
          className="col-span-2 w-full rounded border bg-neutral-50 px-3 py-2 text-neutral-800 outline-none ring-amber-400 transition duration-100 focus:ring dark:border-neutral-400 dark:bg-neutral-700 dark:text-neutral-100"
          placeholder="Cantidad..."
          required
          value={cantidad} // Asigna el valor del state 'precio' al campo 'value'
          onChange={(e) => setCantidad(Number(e.target.value))} // Actualiza el state 'precio' cuando el valor cambie
        />
        <Button type="submit" content={'Agregar Stock'} color="amarillo" fullsize={true} />
      </form>
      <ToastAlert />
    </div>
  );
};
