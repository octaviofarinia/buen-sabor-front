import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';

const UserList = () => {
  const [state, setState] = useState({
    showResult: false,
    apiMessage: '',
    error: null,
  });

  const { getAccessTokenSilently, loginWithPopup, getAccessTokenWithPopup } =
    useAuth0();

  const handleConsent = async () => {
    try {
      await getAccessTokenWithPopup();
      setState({
        ...state,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }

    await callApi();
  };

  const handleLoginAgain = async () => {
    try {
      await loginWithPopup();
      setState({
        ...state,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }

    await callApi();
  };

  const callApi = async () => {
    try {
      const token = await getAccessTokenSilently({
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        scope: 'all',
      });

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_BASE_URL}/usuarios`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = await response.json();

      setState({
        ...state,
        showResult: true,
        apiMessage: responseData,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }
  };

  const handle = (e, fn) => {
    e.preventDefault();
    fn();
  };

  return (
    <>
      <div className="mb-5 flex-col text-center">
        {state.error === 'consent_required' && (
          <div>
            You need to{' '}
            <a href="#/" onClick={(e) => handle(e, handleConsent)}>
              consent to get access to users api
            </a>
          </div>
        )}

        {state.error === 'login_required' && (
          <div>
            You need to{' '}
            <a href="#/" onClick={(e) => handle(e, handleLoginAgain)}>
              log in again
            </a>
          </div>
        )}

        <h1>External API</h1>
        <p className="text-xl font-bold">
          Ping an external API by clicking the button below.
        </p>
        <button
          className="mt-5 rounded bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700"
          onClick={callApi}
          disabled={!import.meta.env.VITE_AUTH0_AUDIENCE}
        >
          Ping API
        </button>
      </div>

      <div>
        {state.showResult && (
          <div data-testid="api-result">
            <h6>Result</h6>
            <span>{JSON.stringify(state.apiMessage, null, 2)}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default UserList;
