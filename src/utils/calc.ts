// Función para formatear números a dos decimales
export const formatDecimal = (num: number): string => {
    return num.toFixed(2);
  };
  
  // Función para agregar comas en los miles y millones
  export const formatWithCommas = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  