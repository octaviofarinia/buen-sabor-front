import { useNavigate } from 'react-router-dom';
import { users } from '../Interfaces/userInteface';

const navigate = useNavigate();

interface UserSetProps{
    userSetter : React.Dispatch<React.SetStateAction<users>>
}
export const userTypeRedirect = async ({ role }: users) => {
   role === 'EMPLOYEE' ? navigate('/employee') : navigate('/');
};

export const getUser =  ( user : users , {userSetter} : UserSetProps ) => {
    userSetter(user); 
}