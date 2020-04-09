import {getRandomNumberFormMixToMax} from "../utils.js";

export const generateFilters = () => {
  return {
    watchlist: Math.floor(getRandomNumberFormMixToMax(1, 500)),
    history: Math.floor(getRandomNumberFormMixToMax(1, 500)),
    favorites: Math.floor(getRandomNumberFormMixToMax(1, 500)),
  };
};
