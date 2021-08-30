import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';
dayjs.extend(durationPlugin);

export const calculateCost = (data) => {
  const costByType = {
    'taxi': 0,
    'bus': 0,
    'train': 0,
    'ship': 0,
    'drive': 0,
    'flight': 0,
    'check-in': 0,
    'sightseeing': 0,
    'restaurant': 0,
  };

  data.forEach((item) => costByType[item.type] += +item.price);

  const dataByOrder = new Map(Object.entries(costByType).sort((a, b) => b[1] - a[1]));

  return dataByOrder;
};

export const calculateType = (data) => {
  const timesByType = {
    'taxi': 0,
    'bus': 0,
    'train': 0,
    'ship': 0,
    'drive': 0,
    'flight': 0,
    'check-in': 0,
    'sightseeing': 0,
    'restaurant': 0,
  };

  data.forEach((item) => timesByType[item.type]++);

  const dataByOrder = new Map(Object.entries(timesByType).sort((a, b) => b[1] - a[1]));

  return dataByOrder;
};

export const calculateTime = (data) => {
  const timeByType = {
    'taxi': 0,
    'bus': 0,
    'train': 0,
    'ship': 0,
    'drive': 0,
    'flight': 0,
    'check-in': 0,
    'sightseeing': 0,
    'restaurant': 0,
  };

  data.forEach((item) => timeByType[item.type] += dayjs(item.finishDate).diff(dayjs(item.startDate)));
  const dataByOrder = new Map(Object.entries(timeByType).sort((a, b) => b[1] - a[1]));
  return dataByOrder;
};

export const calculateDuration = (start, finish, singleDate = false) => {
  const ms = singleDate ? singleDate : dayjs(finish).diff(dayjs(start));

  let minutes = parseInt(((ms / (1000 * 60)) % 60), 10);
  let hours = parseInt(((ms / (1000 * 60 * 60)) % 24), 10);
  let days = parseInt((ms / (1000 * 60 * 60 * 24)), 10);

  days = (days < 10) ? `0${days}` : days;
  hours = (hours < 10) ? `0${hours}` : hours;
  minutes = (minutes < 10) ? `0${minutes}` : minutes;
  return `${days === '00' ? '' : `${days}D`} ${hours === '00' ? '00H' : `${hours}H`} ${minutes === '00' ? '00M' : `${minutes}M`}`;
};
