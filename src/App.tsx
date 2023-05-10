import { Route, Routes } from 'react-router';
import './App.css';
import Header from './components/Header/Header';

import userData from './user.json';
import EmployeeRoutesConfigs from './routes/EmployeeRoutesConfigs';
import ClientRoutesConfigs from './routes/ClientRoutesConfigs';
import { useEffect, useState } from 'react';
import { Footer } from './components/Footer/Footer';
function App() {
  const [user,setUser]=useState([]);
  useEffect(()=>{
   setUser(userData[1]); 
  },[])
  return (
    <>
      <div className="flex flex-col justify-between overflow-hidden h-full">
        <Header user={user} />
        <Routes>
          <Route path="/"></Route>
          {EmployeeRoutesConfigs.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          {ClientRoutesConfigs.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
        
        <Footer user={user}></Footer>
      </div>
    </>
  );
}

export default App;
