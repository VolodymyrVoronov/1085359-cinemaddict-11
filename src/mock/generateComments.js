import {SMILES, TEXT_OF_COMMENTS, AUTHORS_OF_COMMENTS} from "../const.js";

import {getRandomArrayItem} from "../utils.js";

export const generateComment = () => ({
  smile: getRandomArrayItem(SMILES),
  text: getRandomArrayItem(TEXT_OF_COMMENTS),
  author: getRandomArrayItem(AUTHORS_OF_COMMENTS),
  day: `2019-05-11T16:12:32.554Z`,
});

export const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};
