import './App.css';
import Auth0ProviderWithHistory from './components/Auth0/Auth0ProviderWithHistory';
import Greeting from './components/Greeting';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import UserList from './components/UserList';

function App() {
  return (
    <Auth0ProviderWithHistory>
      <Greeting />
      <div className="my-10 flex justify-evenly">
        <LoginButton />
        <LogoutButton />
      </div>
      <Profile />
      <br className="my-10" />
      <UserList />
    </Auth0ProviderWithHistory>
  );
}

export default App;
