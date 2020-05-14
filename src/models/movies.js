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
    // Может тут что-то как-то можно сделать обновление меню с фильтрами сортировки. Я сделал одну функцию, но проблема осталась.
    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));
    this._mainMenuComponent = new MainMenuComponent(this._films);
    this._mainMenuComponent.rerender();

    // Тут функция получает массив с фильмами при каждом изменении того или иного компонента.
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


  // Функция для фильтрации массива с фильмами, в функции происходит фильтрация фильмов по критериям (watchlist, history, favorites), потом каждый массив меряется length и цифра вставляется в нужный span. В этом случае никакой перерисовки нет, и слушатели не слетают.

  // Но, проблема заключается в том, что если я начну переключать фильрацию, то даже не важно, нажал на добавить фильм в избранное или нет, кол-во не меняется.

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

  // Вот тут я так и не понял, что происходит. По идее слушатели собираются в массив, но я хз.
  setFilterChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }
}
