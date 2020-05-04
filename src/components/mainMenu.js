import AbstractComponent from "./abstractComponent.js";

const createMainMenu = (films) => {
  // const {watchlist, history, favorites} = filter;

  const filmsAddedToWatchList = [...films].filter(films => films.watchlist === true);
  const filmsAddedToHistory = [...films].filter(films => films.alreadyWatched === true);
  const filmsAddedToFavorites = [...films].filter(films => films.favorite === true);
  
  

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
