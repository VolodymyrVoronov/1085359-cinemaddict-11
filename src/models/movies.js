import MainMenuComponent from "../components/main-menu.js";
import SortingFilmsComponent from "../components/sorting-films.js";
import {render} from "../utils/render.js";
import {RenderPosition, FilterType} from "../const.js";

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
    const mainNavigation = document.querySelector(`.main-navigation`);
    const main = document.querySelector(`.main`);
    this._mainMenuComponent = new MainMenuComponent(films);
    render(main, this._mainMenuComponent.getElement(), RenderPosition.AFTERBEGIN);
    mainNavigation.remove();

    this._mainMenuComponent.recoveryListeners();
  }

  setFilterChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }
}
