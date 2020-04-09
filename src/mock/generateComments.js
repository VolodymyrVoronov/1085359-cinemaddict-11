import {SMILES, TEXT_OF_COMMENTS, AUTHORS_OF_COMMENTS} from "../const.js";

import {getRandomArrayItem, getRandomDate} from "../utils.js";

export const generateComment = () => ({
  smile: getRandomArrayItem(SMILES),
  text: getRandomArrayItem(TEXT_OF_COMMENTS),
  author: getRandomArrayItem(AUTHORS_OF_COMMENTS),
  day: getRandomDate(new Date(2012, 0, 1), new Date()),
});

export const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};
