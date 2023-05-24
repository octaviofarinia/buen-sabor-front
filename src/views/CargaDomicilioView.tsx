import { useAuth0 } from '@auth0/auth0-react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { backend_url } from '../Utils/ConstUtils';

const CargaDomicilioView: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isNew = queryParams.get('new') === 'true';

  const { user } = useAuth0();

  useEffect(() => {
    if (isNew) {
      const sendUserData = async () => {
        if (user) {
          try {
            const response = await axios.post(`${backend_url}/api/v1/usuarios/post_register_save`, {
              identityProvider: user.sub?.split('|')[0],
              auth0Identifier: user.sub?.split('|')[1],
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
  }, [user]);

  return (
    <>
      <div>CargaDomicilioView</div>
    </>
  );
};

export default CargaDomicilioView;
