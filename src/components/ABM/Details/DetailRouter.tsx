import { useParams } from 'react-router-dom';
import { CategoryDetail } from './CategoriaDetail';
import { UnidadDeMedidaDetail } from './UnidadDeMedidaDetail';
import { ProductoDetail } from './ProductoDetail';

import { AbmRouter } from '../ABMRouter';
import { IngredientesDetail } from './IngredientesDetail';

export const DetailRouter = () => {
  const { RequestedEndpoint } = useParams();

  const redirectToComponent = () => {
    switch (RequestedEndpoint) {
      case 'Categorias':
        return <CategoryDetail />;
        break;
      case 'UnidadDeMedida':
        return <UnidadDeMedidaDetail />;
        break;
      case 'Productos':
        return <ProductoDetail />;
        break;
      case 'Ingredientes':
        return <IngredientesDetail />;
        break;
      default:
        <AbmRouter  />
        break;
    }
  };
  return redirectToComponent();
};
