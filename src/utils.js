import {MAX_LETTERS} from "./const.js";

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

export const getRandomArray = (array, length) => {
  array.sort(function () {
    return Math.random() > 0.5;
  });
  array.length = length;
  return array;
};

export const getRandomNumberFormMixToMax = (min, max) => {
  return min + Math.random() * (max - min);
};

export const countLetters = (array) => {
  if (array.length > MAX_LETTERS) {
    return array.slice(0, MAX_LETTERS) + `...`;
  } else {
    return array;
  }
};

export const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

let i = 0;

export const generateIdOfFilm = () => {
  return i++;
};
