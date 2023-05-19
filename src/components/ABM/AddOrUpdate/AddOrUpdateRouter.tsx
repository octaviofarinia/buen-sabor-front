import { useParams } from 'react-router-dom';
import { CategoryAddOrUpdate } from './CategoryAddOrUpdate';

export const AddOrUpdateRouter = () => {
    const { RequestedEndpoint, id } = useParams();
    return <CategoryAddOrUpdate/>;
};
