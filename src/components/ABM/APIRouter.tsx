export const APIRouter = ({ dataModel }) => {
  switch (dataModel) {
    case 'Productos':
      return 'api/v1/productos';
    case 'Categorias':
      return 'api/v1/rubros-articulos';
    case 'UnidadDeMedida':
      return 'api/v1/unidades-medida';
    case 'Ingredientes':
      return 'api/v1/ingredientes';
    default:
      return null;
  }
};
