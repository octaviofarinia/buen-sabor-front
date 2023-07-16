import { useAuth0 } from '@auth0/auth0-react';
import { backend_url } from '../../../Utils/ConstUtils';

const ProtectedApiCall = () => {
  const { getAccessTokenSilently } = useAuth0();

  const callApi = async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });

      const response = await fetch(`${backend_url}/private`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      alert(responseData.message);
    } catch (error) {
      alert('Ocurrio un error');
      console.error(error);
    }
  };

  return (
    <button
      className="rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
      onClick={() => callApi()}
    >
      Protected Api Call
    </button>
  );
};

export default ProtectedApiCall;
