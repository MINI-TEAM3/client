export const getPhone = (phone: string) => {
  const part = phone.match(/^(\d{3})(\d{4})(\d{0,4})$/);
  if (part === null) return phone;
  return `${part[1]}-${part[2]}-${part[3]}`;
};
