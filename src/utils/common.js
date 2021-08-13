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

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};
