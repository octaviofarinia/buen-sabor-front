import { Auth0Provider } from '@auth0/auth0-react';
import './App.css';
import Greeting from './components/Greeting';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';

function App() {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Greeting />
      <div className="my-10 flex justify-evenly">
        <LoginButton />
        <LogoutButton />
      </div>
      <div className="flex justify-center">
        <Profile />
      </div>
    </Auth0Provider>
  );
}

export default App;
