import { useParams } from 'react-router-dom';
import { CategoriaAddOrUpdate } from './CategoriaAddOrUpdate';
import { UnidadDeMedidaAddOrUpdate } from './UnidadDeMedidaAddOrUpdate';
import { ProductoAddOrUpdate } from './ProductoAddOrUpdate';
import { IngredienteAddOrUpdate } from './IngredienteAddOrUpdate';
import { AbmRouter } from '../ABMRouter';

export const AddOrUpdateRouter = () => {
  const { RequestedEndpoint } = useParams();

  const redirectToComponent = () => {
    switch (RequestedEndpoint) {
      case 'Categorias':
        return <CategoriaAddOrUpdate />;
      case 'UnidadDeMedida':
        return <UnidadDeMedidaAddOrUpdate />;
      case 'Productos':
        return <ProductoAddOrUpdate />;
      default:
        <AbmRouter />;
        break;
    }
  };
  return <div>{redirectToComponent()}</div>;
};
