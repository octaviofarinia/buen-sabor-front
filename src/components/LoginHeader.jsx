import { useAuth0 } from '@auth0/auth0-react';
import img2 from '../../vistas/imgs/🦆 icon _shopping cart_.png';
import React from 'react';

const LoginHeader = () => {
  const { user, isAuthenticated, loginWithRedirect, isLoading, logout } =
    useAuth0();

  if (isLoading) {
    return <div className="header_btn">Cargando ...</div>;
  }

  return isAuthenticated ? (
    <>
      <button className="header_btn">{user.name}</button>
      <button
        className="header_btn"
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Logout
      </button>
      <a href="./carrito.html" className="header_btn">
        <img src={img2} alt="cart" className="header_btn_cart" />
      </a>
    </>
  ) : (
    <>
      <button onClick={() => loginWithRedirect()} className="header_btn">
        Iniciar sesión
      </button>
      <a href="./registro.html" className="header_btn_registro">
        Registrarse
      </a>
    </>
  );
};

export default LoginHeader;
