import AbstractComponent from "./abstractComponent.js";

const isMarkActive = (mark) => {
  return mark ? `film-card__controls-item--active` : ``;
};

const createMostCommentedFilm = (film) => {
  const {id, title, totalRating, date, runtime, genre, poster, description, comments, watchlist,alreadyWatched, favorite} = film;

  return (`<article class="film-card" data-id=${id}>
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${date}</span>
      <span class="film-card__duration">${runtime}</span>
      <span class="film-card__genre">${genre}</span>
    </p>
    <img src="./${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${comments} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isMarkActive(watchlist)}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched  ${isMarkActive(alreadyWatched)}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${isMarkActive(favorite)}">Mark as favorite</button>
    </form>
  </article>`);
};

export default class MostCommentedFilmComponent extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createMostCommentedFilm(this._film);
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
