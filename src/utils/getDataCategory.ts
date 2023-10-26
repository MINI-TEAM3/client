export const getDataCategory = (category: string) => {
  if (category === 'DUTY') return '당직';
  else if (category === 'ANNUAL') return '휴가';
};
