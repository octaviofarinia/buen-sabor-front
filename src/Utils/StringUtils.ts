

export const parseUnidadDeMedida = (cadena: string) => {
  return cadena.toLowerCase() === 'unidaddemedida' ? 'Unidad de Medida' : cadena;
};
export const addSpaceBeforeUppercase = (text: string) => {
  return text.replace(/([A-Z])/g, ' $1');
};


