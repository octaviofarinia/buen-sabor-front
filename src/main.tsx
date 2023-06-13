import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Auth0ProviderWithHistory from './components/Auth0/Auth0ProviderWithHistory';
import './index.css';
import { UserProvider } from './context/UserProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Auth0ProviderWithHistory>
      <BrowserRouter>
        <UserProvider>
          <App />
        </UserProvider>
      </BrowserRouter>
    </Auth0ProviderWithHistory>
  </React.StrictMode>
);
