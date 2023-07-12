import { backend_url } from '../../../Utils/ConstUtils';

const PublicApiCall = () => {
  const callApi = async () => {
    try {
      const response = await fetch(`${backend_url}/public`);

      const responseData = await response.json();

      alert(responseData.message);
    } catch (error) {
      alert('Ocurrio un error');
      console.error(error);
    }
  };

  return (
    <button
      className="rounded bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700"
      onClick={() => callApi()}
    >
      Public Api Call
    </button>
  );
};

export default PublicApiCall;
