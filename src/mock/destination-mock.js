import {getRandomNumber,shuffleArray} from '../utils.js';
import {DESCRIPTIONS} from '../constants.js';

const generatePhotos = () => {
  const photosAmount = getRandomNumber(1, 6);
  return Array.from({ length: photosAmount })
    .map(() => ({
      src: `http://picsum.photos/248/152?r=${Math.random()}`,
      description: 'Description picture',
    }));
};

const generateDescription = (descriptions) => {
  const sentensesAmount = getRandomNumber(1, 4);
  return shuffleArray(descriptions)
    .slice(0, sentensesAmount)
    .join(' ');
};

const generateDestination = (cityName) => ({
  name: cityName,
  description: generateDescription(DESCRIPTIONS),
  pictures: generatePhotos(),
});

export {generateDestination};
