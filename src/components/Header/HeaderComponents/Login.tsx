import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import styles from '../Header.module.css';
import { Menu } from '@headlessui/react';

export const Login = () => {
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div>
     
      
    </div>
  );
};
