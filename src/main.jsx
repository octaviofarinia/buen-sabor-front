import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Auth0ProviderWithHistory from './components/Auth0/Auth0ProviderWithHistory';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0ProviderWithHistory>
      <App />
    </Auth0ProviderWithHistory>
  </React.StrictMode>
);
