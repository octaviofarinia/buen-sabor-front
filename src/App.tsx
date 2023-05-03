import { Route, Routes } from 'react-router';
import './App.css';
import Header from './components/Header/Header';

import userData from './user.json';
import { AbmRouter } from './components/ABM/ABMRouter';
import { Detail } from './views/Detail';
import { EmployeeMain } from './views/EmployeeMain';
import { NewRegister } from './components/ABM/NewRegister';

function App() {
  return (
    <>
      <div className="flex flex-col overflow-hidden">
        <Header user={userData[0]} />
        <Routes>
          <Route path="/"></Route>
          <Route path="/employee" element={<EmployeeMain/>}/>
          <Route path="/employee/:Name?" element={<AbmRouter />} />
          <Route path="/employee/:Name/:id?" element={<Detail  />} />
          <Route path="/employee/:Name/newRegister?" element={<NewRegister  />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
