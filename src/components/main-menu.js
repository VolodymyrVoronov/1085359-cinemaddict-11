import AbstractComponent from "./abstract-component.js";

const createMainMenu = (filmsToSorting) => {
  const filmsAddedToWatchList = [...filmsToSorting].filter((films) => {
    return films.watchlist;
  });
  const filmsAddedToHistory = [...filmsToSorting].filter((films) => {
    return films.alreadyWatched;
  });
  const filmsAddedToFavorites = [...filmsToSorting].filter((films) => {
    return films.favorite;
  });

  return (`<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${filmsAddedToWatchList.length}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${filmsAddedToHistory.length}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${filmsAddedToFavorites.length}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`);
};

export default class MainMenuComponent extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createMainMenu(this._filters);
  }
}
