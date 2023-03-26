import './App.css';
import LoginButton from './components/Auth0/LoginButton';
import LogoutButton from './components/Auth0/LogoutButton';
import Profile from './components/Auth0/Profile';
import AdminApiCall from './components/TestApiCalls/AdminApiCall';
import ProtectedApiCall from './components/TestApiCalls/ProtectedApiCall';
import PublicApiCall from './components/TestApiCalls/PublicApiCall';

function App() {
  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Bienvenido al Buen Sabor
        </h1>
      </div>
      <div className="my-10 flex justify-evenly">
        <LoginButton />
        <LogoutButton />
      </div>
      <Profile />
      <hr className="my-10" />
      <div className="flex w-full flex-row justify-around">
        <PublicApiCall />
        <ProtectedApiCall />
        <AdminApiCall />
      </div>
    </>
  );
}

export default App;
