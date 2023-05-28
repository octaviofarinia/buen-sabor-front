export const APIRouter = (requestedCrud: string | undefined): string => {
  let endpointUrl = '';
  switch (requestedCrud) {
    case 'Productos':
      endpointUrl = 'api/v1/productos';
      return endpointUrl;
    case 'Categorias':
      endpointUrl = 'api/v1/rubros-articulos';
      return endpointUrl;
    case 'UnidadDeMedida':
      endpointUrl = 'api/v1/unidades-medida';
      return endpointUrl;
    case 'Ingredientes':
      endpointUrl = 'api/v1/articulos-insumo';
      return endpointUrl;
    default:
      return '';
  }
};
