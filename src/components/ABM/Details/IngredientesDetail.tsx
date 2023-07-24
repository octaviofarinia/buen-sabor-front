import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getOne } from '../../../API/Requests/BaseRequests';
import { base_ingredient } from '../../../Interfaces/ABM/InterfaceDelivery';
import { AxiosError } from 'axios';
import { ToastAlert, notify } from '../../Toast/ToastAlert';
import { Button } from '../../Botones/Button';
import { ArticuloInsumo } from '../../../Interfaces/ABM/ArticuloInsumo';
import { Loader } from '../../Loader/Loader';
import { useAuth0 } from '@auth0/auth0-react';

export const IngredientesDetail = () => {
  const { id } = useParams();
  const [insumo, setInsumo] = useState<ArticuloInsumo>(base_ingredient);
  const [loading, setLoading] = useState(false);

  const { getAccessTokenSilently } = useAuth0();
  const getRegisterData = async () => {
    setLoading(true);
    await getAccessTokenSilently()
      .then(async (accessToken) => {
        const response = await getOne({
          id: Number(id),
          endpoint: 'articulos-insumo',
          token: accessToken,
        });
        setInsumo(response);
        notify('Se cargo el registro', 'success');
      })
      .catch((err) => {
        const axiosErr = err as AxiosError;
        setLoading(false);
        notify('Ocurrió un error: ' + axiosErr.response?.status, 'error');
      });
    setLoading(false);
  };
  useEffect(() => {
    getRegisterData();
  }, []);

  return (
    <div className="flex w-full px-5 lg:px-0">
      {loading ? (
        <Loader texto="Cargando registros" closeLoading={setLoading} />
      ) : (
        <div
          className="mx-auto my-10  w-full max-w-4xl rounded-lg border-b-4 border-l-4 border-neutral-300 bg-neutral-100 p-5 py-3 px-4 text-xl shadow-lg 
dark:border-b-neutral-500 dark:border-l-neutral-500 dark:bg-neutral-700 md:text-2xl lg:py-8"
        >
          <div className="mb-6 w-full  lg:mb-0 lg:py-6 lg:pr-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="title-font text-sm tracking-widest text-neutral-500 dark:text-neutral-200">
                  Artículo Insumo
                </h1>
                <h2 className="title-font mb-4 text-3xl font-medium text-amber-500 dark:text-white">
                  {insumo.denominacion}
                </h2>
              </div>
              <Link to={`/employee/ABM/RubroArticulos`} className="shadow-md">
                <Button content="Volver" color="amarillo" type="button" />
              </Link>{' '}
            </div>

            <div className="flex flex-col gap-3 border-t border-neutral-200 py-2 dark:border-t-neutral-500">
              <p className="fontBebas flex w-full justify-between border-b-2 border-b-neutral-200 dark:border-b-neutral-500">
                <span className="text-neutral-500 dark:text-neutral-100">ID</span>
                <span className="ml-auto text-neutral-900 dark:text-neutral-300">{insumo.id}</span>
              </p>
              <p className="fontBebas flex w-full justify-between border-b-2 border-b-neutral-200 dark:border-b-neutral-500">
                <span className="text-neutral-500 dark:text-neutral-100">Stock Actual</span>
                <span className="ml-auto text-neutral-900 dark:text-neutral-300">
                  {insumo.stockActual}   {insumo.unidadMedida?.abreviatura}
                </span>
              </p>
              <p className="fontBebas flex w-full justify-between border-b-2 border-b-neutral-200 dark:border-b-neutral-500">
                <span className="text-neutral-500 dark:text-neutral-100">Stock Mínimo</span>
                <span className="ml-auto text-neutral-900 dark:text-neutral-300">
                  {insumo.stockMinimo}   {insumo.unidadMedida?.abreviatura}
                </span>
              </p>
              <p className="fontBebas flex w-full justify-between border-b-2 border-b-neutral-200 dark:border-b-neutral-500">
                <span className="text-neutral-500 dark:text-neutral-100">Unidad de Medida</span>
                <span className="ml-auto text-neutral-900 dark:text-neutral-300">
                  {insumo.unidadMedida?.denominacion}
                </span>
              </p>
              <p className="fontBebas flex w-full justify-between border-b-2 border-b-neutral-200 dark:border-b-neutral-500">
                <span className="text-neutral-500 dark:text-neutral-100">Rubro del Artículo</span>
                <span className="ml-auto text-neutral-900 dark:text-neutral-300">
                  {insumo.rubroArticulo?.denominacion}
                </span>
              </p>
              <p className="fontBebas flex w-full justify-between border-b-2 border-b-neutral-200 dark:border-b-neutral-500">
                <span className="text-neutral-500 dark:text-neutral-100">Precio de compra</span>
                <span className="ml-auto text-neutral-900 dark:text-neutral-300">
                  {insumo.precioCompra}
                </span>
              </p>
              <p className="flex w-full justify-center">
                <img
                  src={insumo.urlImagen?.toString()}
                  alt={insumo.denominacion?.toString()}
                  className="h-80 w-full rounded-lg  object-cover object-center"
                />
              </p>
            </div>
          </div>
          <ToastAlert />
        </div>
      )}
    </div>
  );
};
