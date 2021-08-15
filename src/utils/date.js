import dayjs from 'dayjs';

export const DATE_FORMAT = {
  DAYMONTH: 'MMM D',
  DAYWITHZEROMONTH: 'MMM DD',
  DAY: 'DD',
  TIME: 'HH:mm',
};

export const formatedDate = (date, format) => dayjs(date).format(format);

export const getDiffDuration = (finishDate, startDate) => dayjs(finishDate).diff(dayjs(startDate));

export const sortPriceDown = (pointA, pointB) => pointB.price - pointA.price;

export const sortTimeDurationDown = (pointA, pointB) => getDiffDuration(pointB.finishDate, pointB.startDate) - getDiffDuration(pointA.finishDate, pointA.startDate);
