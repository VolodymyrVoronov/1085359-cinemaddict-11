import {SMILES, TEXT_OF_COMMENTS, AUTHORS_OF_COMMENTS} from "../const.js";

import {getRandomArrayItem} from "../utils/utils.js";

let i = 0;

const generateComment = () => ({
  id: i++,
  text: getRandomArrayItem(TEXT_OF_COMMENTS),
  smile: getRandomArrayItem(SMILES),
  author: getRandomArrayItem(AUTHORS_OF_COMMENTS),
  day: `2019-05-11T16:12:32.554Z`,
});

export const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};
