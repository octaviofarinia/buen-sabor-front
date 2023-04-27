import axios from 'axios';
import { Route, Routes } from 'react-router';
import './App.css';
import AbmTable from './components/ABM/AbmTable';
import CargaDeRegistro from './components/ABM/CargaDeRegistro';
import LoginButton from './components/Auth0/LoginButton';
import LogoutButton from './components/Auth0/LogoutButton';
import Profile from './components/Auth0/Profile';
import AdminApiCall from './components/TestApiCalls/AdminApiCall';
import ProtectedApiCall from './components/TestApiCalls/ProtectedApiCall';
import PublicApiCall from './components/TestApiCalls/PublicApiCall';

function App() {
  const [categories, setCategories] = useState([]);
  const deleteRegister = async ({ id }) => {
    axios.delete('http://localhost:5173/api/v1/rubros-articulos/' + id);
  };
  const updateRegister = async ({ id }) => {
    axios.put('http://localhost:5173/api/v1/rubros-articulos/' + id);
  };
  const createRegister = async () => {
    axios.post('http://localhost:5173/api/v1/rubros-articulos/simple-save');
  };
  const getCategories = async () => {
    let res = await axios.get('https://localhost:3306/api/v1/rubros-articulos');
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
