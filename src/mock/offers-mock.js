import {OFFERS_OPTION} from '../constants.js';
import {getArrayRandLength} from '../utils.js';

const generateOffers = (pointType) => {
  const { offers } = OFFERS_OPTION.find((option) => option.type === pointType);
  return getArrayRandLength(offers);
};

export {generateOffers};
