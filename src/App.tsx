import axios from 'axios';
import { Route, Routes } from 'react-router';
import './App.css';
import AbmTable from './components/ABM/AbmTable';
import CargaDeRegistro from './components/ABM/CargaDeRegistro';
import { useEffect, useState } from 'react';
import Header from './components/Header/Header';

import userData from "../public/user.json";

function App() {
  const [categories, setCategories] = useState([]);
  const deleteRegister = async ({ id }) => {
    axios.delete('http://localhost:8080/api/v1/rubros-articulos/' + id);
  };
  const updateRegister = async ({ id }) => {
    axios.put('http://localhost:8080/api/v1/rubros-articulos/' + id);
  };
  const createRegister = async () => {
    axios.post('http://localhost:8080/api/v1/rubros-articulos/simple-save');
  };
  const getCategories = async () => {
    let res = await axios.get('http://localhost:8080/api/v1/rubros-articulos');
    setCategories(res.data);
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <div className="flex flex-col">
        
        <Header user={userData[0]}/>
        <Routes>
          <Route path='/'></Route>
          <Route
            path="/employee/abm-categorias"
            element={<AbmTable information={categories} />}
          />
          <Route path="/carga_registro" element={<CargaDeRegistro saveMethod={createRegister}/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
