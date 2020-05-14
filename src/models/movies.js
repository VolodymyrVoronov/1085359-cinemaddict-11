import MainMenuComponent from "../components/main-menu.js";
import SortingFilmsComponent from "../components/sorting-films.js";
import {FilterType} from "../const.js";

export default class Movies {
  constructor() {
    this._films = [];
    this._dataChangeHandlers = [];

    this._activeFilterType = FilterType.ALL;

    this._sortingFilmsComponent = new SortingFilmsComponent();
  }

  getFilms() {
    return this._films;
  }

  setFilms(films) {
    this._films = Array.from(films);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._dataChangeHandlers);
  }

  updateFilm(id, film) {
    const index = this._films.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));
    this._mainMenuComponent = new MainMenuComponent(this._films);
    this._mainMenuComponent.rerender();
    this._changeMainNavigationViewByChangingData(this._films);
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  _changeMainNavigationViewByChangingData(films) {
    // const main = document.querySelector(`.main`);
    const mainNavigation = document.querySelector(`.main-navigation`);
    // mainNavigation.remove();
    // this._mainMenuComponent = new MainMenuComponent(films);
    // render(main, this._mainMenuComponent.getElement(), RenderPosition.AFTERBEGIN);

    const filmsAddedToWatchList = [...films].filter((filmsToSort) => {
      return filmsToSort.watchlist;
    });
    const filmsAddedToHistory = [...films].filter((filmsToSort) => {
      return filmsToSort.alreadyWatched;
    });
    const filmsAddedToFavorites = [...films].filter((filmsToSort) => {
      return filmsToSort.favorite;
    });

    const sortMenuItems = Array.from(mainNavigation.querySelectorAll(`.main-navigation__item-count`));
    sortMenuItems[0].textContent = `${filmsAddedToWatchList.length}`;
    sortMenuItems[1].textContent = `${filmsAddedToHistory.length}`;
    sortMenuItems[2].textContent = `${filmsAddedToFavorites.length}`;

    // this._mainMenuComponent = new MainMenuComponent(films);
  }

  setFilterChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }
}
