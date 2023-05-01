import axios from 'axios';
import { Route, Routes } from 'react-router';
import './App.css';
import AbmTable from './components/ABM/AbmTable';
import CargaDeRegistro from './components/ABM/CargaDeRegistro';
import { useEffect, useState } from 'react';

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
      <div className={'flex h-full w-full'}>
        <Routes>
          <Route
            path="/admin/abm-rubro"
            element={<AbmTable information={categories} deleteMethod={deleteRegister}/>}
          />
          <Route path="/carga_registro" element={<CargaDeRegistro saveMethod={createRegister}/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
