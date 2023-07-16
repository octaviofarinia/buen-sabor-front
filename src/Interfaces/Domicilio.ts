export interface Domicilio {
  id: number | null;
  calle: string | null;
  numero: string | null;
  localidad: string | null;
  codigoPostal: string | null;
  esDepartamento?: boolean;
  pisoDpto?: string;
  numeroDpto?: string;
  auth0Id?: string;
}
