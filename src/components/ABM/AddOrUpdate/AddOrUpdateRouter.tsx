import { useParams } from 'react-router-dom';
import { CategoriaAddOrUpdate } from './CategoriaAddOrUpdate';
import { UnidadDeMedidaAddOrUpdate } from './UnidadDeMedidaAddOrUpdate';
import { ProductoAddOrUpdate } from './ProductoAddOrUpdate';
import { IngredienteAddOrUpdate } from './IngredienteAddOrUpdate';
import { AbmRouter } from '../ABMRouter';

export const AddOrUpdateRouter = () => {
  const { RequestedEndpoint, id } = useParams();

  const redirectToComponent = () => {
    switch (RequestedEndpoint) {
      case 'Categorias':
        return <CategoriaAddOrUpdate />;
        break;
      case 'UnidadDeMedida':
        return <UnidadDeMedidaAddOrUpdate />;
        break;
      case 'Productos':
        return <ProductoAddOrUpdate />;
        break;
      case 'Ingredientes':
        return <IngredienteAddOrUpdate />;
        break;
      default:
        <AbmRouter  />
        break;
    }
  };
  return redirectToComponent();
};
