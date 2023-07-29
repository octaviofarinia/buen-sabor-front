export const parseUnidadDeMedida = (cadena: string) => {
  return cadena.toLowerCase() === 'unidaddemedida' ? 'Unidad de Medida' : cadena;
};
export const addSpaceBeforeUppercase = (text: string) => {
  return text.replace(/([A-Z])/g, ' $1');
};

export const parseDate = (date: Date) => {
  return date.toLocaleDateString('en-EN', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
};

