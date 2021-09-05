// import dayjs from 'dayjs';
// import {getRandomNumber,getArrayRandElement, getArrayRandLength} from '../utils/common.js';
// import {
//   OFFERS_OPTION,
//   START_DATE_GAP,
//   FINISH_DATE_GAP_FROM,
//   FINISH_DATE_GAP_TO,
//   PointsType,
//   Cities,
//   PointsIcon
// } from '../constants.js';

// const generateDate = (
//   fromDate,
//   gap = getRandomNumber(-START_DATE_GAP, START_DATE_GAP),
// ) => dayjs(fromDate).add(gap, 'ms').toDate();

// const generateOffers = (pointType) => {
//   const { offers } = OFFERS_OPTION.find((option) => option.type === pointType);
//   return getArrayRandLength(offers);
// };

// export const generateWaypoint = (id, offersOption) => {
//   const startDate = generateDate();
//   const finishDate = generateDate(
//     startDate,
//     getRandomNumber(FINISH_DATE_GAP_FROM, FINISH_DATE_GAP_TO),
//   );
//   const waypointType = getArrayRandElement(Object.values(PointsType));
//   const city = getArrayRandElement(Object.values(Cities));
//   return {
//     id,
//     type: waypointType,
//     icon: PointsIcon[waypointType],
//     city,
//     offers: generateOffers(waypointType, offersOption),
//     startDate,
//     finishDate,
//     price: getRandomNumber(10, 200),
//     isFavorite: Boolean(getRandomNumber(0, 2)),
//   };
// };
