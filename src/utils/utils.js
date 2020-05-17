import {MAX_LETTERS, SortType, FilterType} from "../const.js";

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

export const sortTypeCallbacks = {
  [SortType.DATE]: (a, b) => b.date - a.date,
  [SortType.RATING]: (a, b) => b.totalRating - a.totalRating,
  [SortType.DEFAULT]: () => {}
};

export const filterTypeCallbacks = {
  [FilterType.WATCHLIST]: (a) => a.watchlist === true,
  [FilterType.HISTORY]: (a) => a.alreadyWatched === true,
  [FilterType.FAVORITES]: (a) => a.favorite === true,
  [FilterType.ALL]: (a) => a,
};

export const getRandomArrayOne = (arr, min, max) => {
  const numberRandom = getRandomIntegerNumber(min, max);
  const arrClon = arr.slice();
  const arrNew = [];
  let numberArrRandom;

  for (let j = 0; j < numberRandom; j++) {
    numberArrRandom = getRandomIntegerNumber(0, arrClon.length - 1);
    arrNew.push(arrClon[numberArrRandom]);
    arrClon.splice(numberArrRandom, 1);
  }
  return arrNew;
};
