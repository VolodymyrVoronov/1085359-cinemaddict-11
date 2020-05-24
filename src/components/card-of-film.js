import AbstractComponent from "./abstract-component.js";
import {getDateOfFilmProduction} from "../utils/common.js";
import {countLetters} from "../utils/utils.js";

const getFilmDuration = (duration) => {
  const hours = duration / 60 ^ 0;
  if (hours) {
    let minutes = duration % 60;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}h ${minutes}m`;
  } else {
    return `${duration}m`;
  }
};

const isMarkActive = (mark) => {
  return mark ? `film-card__controls-item--active` : ``;
};

const createCardOfFilm = (film) => {

  const {
    id,
    title,
    rating,
    releaseDate,
    duration,
    genre,
    poster,
    description,
    watchlist,
    alreadyWatched,
    favorite
  } = film;

  return (`<article class="film-card" data-id="${id}">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${getDateOfFilmProduction(releaseDate)}</span>
      <span class="film-card__duration">${getFilmDuration(duration)}</span>
      <span class="film-card__genre">${genre}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${countLetters(description)}</p>
    <a class="film-card__comments">${film.comments.length} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isMarkActive(watchlist)}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched  ${isMarkActive(alreadyWatched)}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${isMarkActive(favorite)}">Mark as favorite</button>
    </form>
  </article>`);
};

export default class CardOfFilmComponent extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createCardOfFilm(this._film);
  }

  setWatchListButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}
