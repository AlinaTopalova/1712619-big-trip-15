import dayjs from 'dayjs';

export const DATE_FORMAT = {
  DAYMONTH: 'MMM D',
  DAYWITHZEROMONTH: 'MMM DD',
  DAY: 'DD',
  TIME: 'HH:mm',
};

export const formatedDate = (date, format) => dayjs(date).format(format);
