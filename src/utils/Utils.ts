import format from 'date-fns/format';

export const getValueDate = (date, formatDate = 'dd/MM/yyyy HH:mm:ss') => {
  return format(new Date(date).getTime(), formatDate)
};
