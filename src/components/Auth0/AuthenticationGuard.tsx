import { withAuthenticationRequired } from '@auth0/auth0-react';

type Props = {
  component: React.ComponentType<object>;
};

export const AuthenticationGuard = ({ component }: Props) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="mx-96 flex flex-col items-center justify-center">
        <div className="mb-4 text-2xl font-bold">Redireccionando...</div>
      </div>
    ),
  });

  return <Component />;
};
