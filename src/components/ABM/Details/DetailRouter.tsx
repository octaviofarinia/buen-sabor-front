import { useParams } from 'react-router-dom';
import { CategoryDetail } from './CategoriaDetail';

export const DetailRouter = () => {
  const { RequestedEndpoint } = useParams();

  const getRequiredDetail = () => {
    switch (RequestedEndpoint) {
      case 'Categorias':
        return <CategoryDetail />;
      default:
        return <h1>Not Found</h1>;
    }
  };
  return getRequiredDetail();
};
