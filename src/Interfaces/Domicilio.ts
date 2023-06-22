export interface Domicilio {
  id: number | null;
  nombreCalle: string | null;
  numero: string | null;
  localidad: string | null;
  codigoPostal: string | null;
  piso?: string;
  esDepartamento?: boolean;
  departamento?: string;
  idUsuario?: number|null;
}
