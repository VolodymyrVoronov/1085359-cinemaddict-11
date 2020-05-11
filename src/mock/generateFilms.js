import {NAME_OF_FILMS, POSTERS_OF_FILMS, GENRE_OF_FILMS, DESCRIPTION_OF_FILMS, DIRECTORS_OF_FILMS, WRITERS, ACTORS, RELEASE_COUNTRIES, PROP_OF_FILMS} from "../const.js";
import {getRandomArrayItem, getRandomArray, getRandomNumberFormMixToMax, countLetters, generateIdOfFilm} from "../utils.js";
import {generateComments} from "../mock/generateComments.js";

export const generateFilm = () => {
  return {
    id: generateIdOfFilm(),
    title: getRandomArrayItem(NAME_OF_FILMS),
    alternativeTitle: ``,
    totalRating: getRandomNumberFormMixToMax(1, 9).toFixed(1),
    poster: getRandomArrayItem(POSTERS_OF_FILMS),
    ageRating: Math.floor(getRandomNumberFormMixToMax(0, 100)),
    director: getRandomArrayItem(DIRECTORS_OF_FILMS),
    writers: getRandomArray(WRITERS, Math.floor(Math.random() * 5) + 1).join(` `),
    actors: getRandomArray(ACTORS, Math.floor(Math.random() * 5) + 1).join(` `),
    date: `2019-05-11T00:00:00.000Z`,
    releaseCountry: getRandomArrayItem(RELEASE_COUNTRIES),
    runtime: 77,
    genre: getRandomArray(GENRE_OF_FILMS, Math.floor(Math.random() * 5) + 1).join(` `),
    description: countLetters(getRandomArray(DESCRIPTION_OF_FILMS, Math.floor(Math.random() * 5) + 1).join(``)),
    comments: generateComments(Math.floor(getRandomNumberFormMixToMax(0, 10))),

    watchlist: getRandomArrayItem(PROP_OF_FILMS),
    alreadyWatched: getRandomArrayItem(PROP_OF_FILMS),
    favorite: getRandomArrayItem(PROP_OF_FILMS)
  };
};

export const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export const generateMostRatedFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export const generateMostCommentedFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};
