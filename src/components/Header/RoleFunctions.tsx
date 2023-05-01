import { Link } from 'react-router-dom';

export const roleCase = ({ user }) => {
  return user.role == 'EMPLOYEE' ? (
    <div className="flex flex-row items-center justify-center gap-10 text-amber-400 font-bold text-lg">
      <Link to="/employee">Inicio</Link>
      <Link to="/employee/abm-categorias">Abm-Categorias</Link>
    </div>
  ) : (
    <div className="flex flex-row items-center justify-center gap-10 text-amber-400 font-bold text-lg">
      <Link to="/">Inicio</Link>
      <Link to="/productos">Abm-Categorias</Link>
      {user.status ? (<Link to="/perfil">Perfil</Link>):(<Link to="/registro">Registrarse</Link>)}
      {user.status? <Link to="/logout">Cerrar sesion</Link> : <Link to="/login">Iniciar sesión</Link>}
    </div>
  );
};
