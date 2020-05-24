import {MAX_LETTERS, SortType, FilterType} from "../const.js";

export const countLetters = (text) => {
  if (text.length > MAX_LETTERS) {
    return text.slice(0, MAX_LETTERS) + `...`;
  } else {
    return text;
  }
};

export const sortTypeCallbacks = {
  [SortType.DATE]: (a, b) => b.releaseDate - a.releaseDate,
  [SortType.RATING]: (a, b) => b.rating - a.rating,
  [SortType.DEFAULT]: () => {}
};

export const filterTypeCallbacks = {
  [FilterType.WATCHLIST]: (a) => a.watchlist === true,
  [FilterType.HISTORY]: (a) => a.alreadyWatched === true,
  [FilterType.FAVORITES]: (a) => a.favorite === true,
  [FilterType.ALL]: (a) => a,
};
