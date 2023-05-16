import { useParams } from 'react-router-dom';
import { CategoryAddOrUpdate } from './CategoryAddOrUpdate';

export const AddOrUpdateRouter = () => {
    const { RequestedEndpoint, id } = useParams();
    {/*  Por ahora no tenemos mas ABMS asi que no hice los cases  */}
    return (<CategoryAddOrUpdate/>);
};
