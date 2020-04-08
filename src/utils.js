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

// export const getRandomArray = (array, length) => {
//   if (!array) {
//     return ` `;
//   } else {
//     array.sort(function () {
//       return Math.random() > 0.5;
//     });
//     array.length = length;
//     return array;
//   }
// };

export const getRandomNumberFormMixToMax = (min, max) => {
  return min + Math.random() * (max - min);
};

export const countLetters = (array) => {
  if (array.length > 140) {
    return array.slice(0, 140) + `...`;
  } else {
    return array;
  }
};

export const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};
