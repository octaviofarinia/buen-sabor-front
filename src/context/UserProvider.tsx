import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import jwtDecode from 'jwt-decode';

interface UserContextProps {
  userRole: string;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [userRole, setUserRole] = useState<string>('cliente');

  useEffect(() => {
    getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      },
    })
      .then((res) => {
        const decodedToken: { [key: string]: any } = jwtDecode(res);
        setUserRole(decodedToken[`${import.meta.env.VITE_AUTH0_AUDIENCE}/roles`][0]);
      })
      .catch(() => {});
  }, [getAccessTokenSilently]);

  return <UserContext.Provider value={{ userRole: userRole }}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
