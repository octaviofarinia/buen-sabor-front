import { Base } from '../../API/BaseAPIInterface';

export interface Cliente extends Base {
  nombre: string | null;
  apellido: string | null;
  telefone: string | null;
  email: string | null;
  usuario: {
    id?: number;
    auth0Id: string | null;
    username: string | null;
    email: string | null;
  };
  fechaAlta: string | null;
  fechaModificacion: string | null;
  fechaBaja: string | null;
}
