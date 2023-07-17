export const APIRouter = (requestedCrud: string | undefined): string => {
  let endpointUrl = '';
  switch (requestedCrud) {
    case 'Productos':
      endpointUrl = 'articulos-manufacturados';
      return endpointUrl;
    case 'Categorias':
      endpointUrl = 'rubros-articulos';
      return endpointUrl;
    case 'UnidadDeMedida':
      endpointUrl = 'unidades-medida';
      return endpointUrl;
    case 'Ingredientes':
      endpointUrl = 'articulos-insumo';
      return endpointUrl;
    default:
      return '';
  }
};
