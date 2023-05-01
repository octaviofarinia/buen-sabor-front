import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AbmTable = ({information}) => {

  return (
      <div className="flex w-full flex-col gap-5">
      <h1><FontAwesomeIcon icon="fa-solid fa-box-open-full" />CATEGORIAS</h1>
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
                        <td><button>Update</button ></td>
                        <td><button>Eliminar</button ></td> 
                    </tr>
                })}
             
             </tbody>
          </table>
      </div>

  );
};

export default AbmTable;
