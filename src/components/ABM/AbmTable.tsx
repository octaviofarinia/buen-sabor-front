import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

const AbmTable = ({information,deleteMethod,updateMethod}) => {

   
  return (
    
      <section className="flex w-full flex-col  gap-5">
      <Header sectionName={"ABM RUBRO"}/>
      <Link to="/carga_registro"></Link>
          <table className="table-auto">
            <thead>
              <tr>
                <th>Id Rubro</th>
                <th>Denominacion</th>
                <th>Id Rubro Padre</th>
                <th>Update</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
                {information.forEach(element => {
                    <tr>
                        <td>{element.id}</td>
                        <td>{element.denominacion}</td>
                        <td>{element.id_rubro_padre}</td>
                        <td><button onClick={deleteRegister(element.id)}>Update</button ></td>
                        <td><button onClick={deleteRegister(element.id)}>Eliminar</button ></td> 
                    </tr>
                })}
             
             </tbody>
          </table>
      </section>

  );
};

export default AbmTable;
