import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import jwtDecode from 'jwt-decode';

interface UserContextProps {
  userRoles: string[];
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [userRoles, setUserRoles] = useState<string[]>([]);

  useEffect(() => {
    getAccessTokenSilently()
      .then((res) => {
        const decodedToken: { [key: string]: any } = jwtDecode(res);
        setUserRoles(decodedToken[`${import.meta.env.VITE_AUTH0_AUDIENCE}/roles`]);
      })
      .catch(() => {});
  }, [getAccessTokenSilently]);

  return <UserContext.Provider value={{ userRoles }}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
