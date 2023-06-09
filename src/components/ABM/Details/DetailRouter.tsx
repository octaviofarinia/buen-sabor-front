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
      case 'UnidadDeMedida':
        return <UnidadDeMedidaDetail />;
      case 'Productos':
        return <ProductoDetail />;
      case 'Ingredientes':
        return <IngredientesDetail />;
      default:
        <AbmRouter />;
    }
  };
  return <div>{redirectToComponent()}</div>;
};
