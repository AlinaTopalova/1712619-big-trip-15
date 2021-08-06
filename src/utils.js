import { RenderPosition } from './constants.js';

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min;

export const getArrayRandElement = function (arr) {
  const rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

export const getArrayRandLength = (arr) =>
  arr.slice(0, getRandomNumber(1, arr.length));

export const shuffleArray = (array) => {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));
    const temp = result[random];
    result[random] = result[i];
    result[i] = temp;
  }
  return result;
};
