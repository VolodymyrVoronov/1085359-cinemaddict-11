import {NAME_OF_FILMS, POSTERS_OF_FILMS, DURATION_OF_FILMS, GENRE_OF_FILMS, DESCRIPTION_OF_FILMS, DIRECTORS_OF_FILMS, WRITERS, ACTORS, RELEASE_COUNTRIES} from "../const.js";
import {getRandomArrayItem, getRandomArray, getRandomNumberFormMixToMax, countLetters, generateIdOfFilm} from "../utils.js";

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
    date: Math.floor(Math.random() * 70) + 1950,
    releaseCountry: getRandomArrayItem(RELEASE_COUNTRIES),
    runtime: getRandomArrayItem(DURATION_OF_FILMS),
    genre: getRandomArray(GENRE_OF_FILMS, Math.floor(Math.random() * 5) + 1).join(` `),
    description: countLetters(getRandomArray(DESCRIPTION_OF_FILMS, Math.floor(Math.random() * 5) + 1).join(``)),
    comments: Math.floor(Math.random() * 5),
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
