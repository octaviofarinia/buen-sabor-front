import { useAuth0 } from '@auth0/auth0-react';
import { backend_url } from '../../../Utils/ConstUtils';

const AdminApiCall = () => {
  const { getAccessTokenSilently } = useAuth0();

  const callApi = async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });

      console.log('token: ' + token);

      const response = await fetch(`${backend_url}/admin-only`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      const responseData = await response.json();

      alert(responseData.message);
    } catch (error) {
      alert('Ocurrio un error');
      console.error(error);
    }
  };

  return (
    <button
      className="rounded bg-purple-500 py-2 px-4 font-bold text-white hover:bg-purple-700"
      onClick={() => callApi()}
    >
      Admin Api Call
    </button>
  );
};

export default AdminApiCall;
