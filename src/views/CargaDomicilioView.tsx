import { useAuth0 } from '@auth0/auth0-react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { backend_url } from '../Utils/ConstUtils';

const CargaDomicilioView: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isNew = queryParams.get('new') === 'true';

  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isNew) {
      const sendUserData = async () => {
        if (isAuthenticated && user) {
          try {
            const response = await axios.post(`${backend_url}/api/v1/domicilios/prueba`, {
              userId: user.sub,
              username: user.name,
            });
            console.log(response.data);
          } catch (error) {
            console.log(error);
          }
        }
      };

      sendUserData();
    }
  }, [isAuthenticated, user]);

  return (
    <>
      <div>{isNew ? 'true' : 'false'}</div>
      <div>CargaDomicilioView</div>
    </>
  );
};

export default CargaDomicilioView;
