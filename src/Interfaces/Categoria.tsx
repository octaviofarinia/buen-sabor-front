export interface Categoria {
  id: number | null;
  denominacion: string | null;
  RubroPadre: Categoria | null;
  idRubroPadre: number | null;
  subRubros: Categoria[] | null;
}
