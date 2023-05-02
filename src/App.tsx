
import { Route, Routes } from 'react-router';
import './App.css';
import Header from './components/Header/Header';

import userData from "../public/user.json";
import { AbmRouter } from './components/ABM/ABMRouter';

function App() {
  
  return (
    <>
      <div className="flex flex-col">
        
        <Header user={userData[0]}/>
        <Routes>
          <Route path='/'></Route>
          <Route
            path="/employee/:categoryName"
            element={<AbmRouter/>}
          />
          <Route />
        </Routes>
      </div>
    </>
  );
}

export default App;
