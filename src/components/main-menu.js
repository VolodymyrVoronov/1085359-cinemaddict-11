import AbstractSmartComponent from "./abstract-smart-component.js";
import {FilterType} from "../const.js";

const createMainMenu = (filmsToSorting) => {
  const filmsAddedToWatchList = filmsToSorting.filter((films) => {
    return films.watchlist;
  });
  const filmsAddedToHistory = filmsToSorting.filter((films) => {
    return films.alreadyWatched;
  });
  const filmsAddedToFavorites = filmsToSorting.filter((films) => {
    return films.favorite;
  });

  return (`<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#" class="main-navigation__item main-navigation__item--active" data-filter-type=${FilterType.ALL}>All movies</a>
      <a href="#" class="main-navigation__item" data-filter-type=${FilterType.WATCHLIST}>Watchlist <span class="main-navigation__item-count">${filmsAddedToWatchList.length}</span></a>
      <a href="#" class="main-navigation__item" data-filter-type=${FilterType.HISTROY}>History <span class="main-navigation__item-count">${filmsAddedToHistory.length}</span></a>
      <a href="#" class="main-navigation__item" data-filter-type=${FilterType.FAVORITES}>Favorites <span class="main-navigation__item-count">${filmsAddedToFavorites.length}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`);
};

export default class MainMenuComponent extends AbstractSmartComponent {
  constructor(films) {
    super();

    this._films = films;
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createMainMenu(this._films);
  }

  setFilterTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (e) => {
      e.preventDefault();

      const target = e.target;

      const filterType = e.target.dataset.filterType;
      const links = document.querySelectorAll(`.main-navigation__item`);

      if (target.tagName !== `A`) {
        return;
      }

      if (this._currentfilterType === filterType) {
        return;
      }

      links.forEach((element) => element.classList.remove(`main-navigation__item--active`));

      this._currentfilterType = filterType;

      target.classList.add(`main-navigation__item--active`);
      handler(this._currentfilterType);
    });
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  _subscribeOnEvents() {

  }
}
