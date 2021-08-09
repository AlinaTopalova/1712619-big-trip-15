import dayjs from 'dayjs';
import {generateDestination} from '../mock/destination-mock.js';
import {generateOffers} from '../mock/offers-mock.js';
import {getRandomNumber,getArrayRandElement} from '../utils.js';
import {
  START_DATE_GAP,
  FINISH_DATE_GAP_FROM,
  FINISH_DATE_GAP_TO,
  PointsType,
  Cities,
  PointsIcon
} from '../constants.js';

const generateDate = (
  fromDate,
  gap = getRandomNumber(-START_DATE_GAP, START_DATE_GAP),
) => dayjs(fromDate).add(gap, 'ms').toDate();

const generateWaypoint = (id) => {
  const startDate = generateDate();
  const finishDate = generateDate(
    startDate,
    getRandomNumber(FINISH_DATE_GAP_FROM, FINISH_DATE_GAP_TO),
  );
  const waypointType = getArrayRandElement(Object.values(PointsType));
  const city = getArrayRandElement(Object.values(Cities));
  return {
    id,
    type: waypointType,
    icon: PointsIcon[waypointType],
    city,
    offers: generateOffers(waypointType),
    destination: generateDestination(city),
    startDate,
    finishDate,
    price: getRandomNumber(10, 200),
    isFavorite: Boolean(getRandomNumber(0, 2)),
  };
};

const generateWaypoints = (pointsAmount) => (
  Array.from({ length:pointsAmount })
    .map((_, idx) => generateWaypoint(`${idx}`))
);

export { generateWaypoints };
