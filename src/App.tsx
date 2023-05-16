import { Route, Routes, useNavigate } from 'react-router';
import './App.css';
import Header from './components/Header/Header';

import userData from './user.json';
import EmployeeRoutesConfigs from './routes/EmployeeRoutesConfigs';
import ClientRoutesConfigs from './routes/ClientRoutesConfigs';
import { useEffect, useState } from 'react';
import { Footer } from './components/Footer/Footer';
import { NotFoundView } from './views/NotFoundView';
import { users } from './Interfaces/userInteface';
function App() {
  {/* True para trabajar con normalUser, False para trabajar con employee*/}
  const [user, setUser] = useState<users>({
    id: 0,
    nombre: '',
    isNormalUser: false,
    status: false,
  });
  
const navigate = useNavigate();
const userTypeRedirect =  (user: users) => {
   user.isNormalUser  ? navigate('/') : navigate('/employee');
};
useEffect(() => {
  userTypeRedirect(user);
},[user]);

  return (
    <>
      <div
        className={`flex h-full  flex-col ${user.isNormalUser ? 'justify-between' : ''}`}
      >
        <Header isNormalUser={user.isNormalUser} />
        <Routes>
          {EmployeeRoutesConfigs.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          {ClientRoutesConfigs.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<NotFoundView />} />
        </Routes>
        <button onClick={()=>{
          setUser(userData[1])
        }}>Set User Employee</button>
        <button onClick={()=>{
          setUser(userData[0])
        }}>Set User Client</button>
        <Footer isNormalUser={user.isNormalUser}></Footer>
      </div>
    </>
  );
}

export default App;
