import axios from 'axios';
import { Route, Routes } from 'react-router';
import './App.css';
import AbmTable from './components/ABM/AbmTable';
import CargaDeRegistro from './components/ABM/CargaDeRegistro';
import { useEffect, useState } from 'react';
import Header from './components/Header/Header';

import userData from "../public/user.json";

function App() {
  
  return (
    <>
      <div className="flex flex-col">
        
        <Header user={userData[0]}/>
        <Routes>
          <Route path='/'></Route>
          <Route
            path="/employee/abm-categorias"
            element={<AbmTable/>}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
