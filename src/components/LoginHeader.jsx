import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const LoginHeader = () => {
  const { user, isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="text-center text-xl font-bold">Loading ...</div>;
  }

  return isAuthenticated ? (
    <button className="header_btn">{user.name}</button>
  ) : (
    <button onClick={() => loginWithRedirect()} className="header_btn">
      Iniciar sesión
    </button>
  );
};

export default LoginHeader;
