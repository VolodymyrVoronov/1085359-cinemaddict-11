import MainMenuComponent from "../components/main-menu.js";

import SortingFilmsComponent from "../components/sorting-films.js";
import BtnShowMoreComponent from "../components/btn-show-more.js";
import AmountOfMoviesFilmComponent from "../components/amount-of-movies.js";
import NoFilmsComponent from "../components/no-films.js";

import MovieController from "./movie-controller.js";

import {render, remove} from "../utils/render.js";
import {sortTypeCallbacks, filterTypeCallbacks} from "../utils/utils.js";

import {FILM, RenderPosition} from "../const.js";
const flimsListExtraContainer = document.querySelectorAll(`.films-list--extra`);

const changeWebsiteIfNoFilmsAvailable = (containerWhenThereAreFilms, containerWhenThereAreNoFilms, films, button, sorting, noFilmsComponent) => {
  if (films.length !== 0) {
    render(containerWhenThereAreFilms, new AmountOfMoviesFilmComponent(FILM.IN_BASE).getElement(), RenderPosition.BEFOREEND);
  } else {
    render(containerWhenThereAreFilms, new AmountOfMoviesFilmComponent(FILM.NO_IN_BASE).getElement(), RenderPosition.BEFOREEND);
    render(containerWhenThereAreNoFilms, noFilmsComponent, RenderPosition.AFTERBEGIN);
    button.getElement().remove();
    button.removeElement();
    sorting.getElement().remove();
    sorting.removeElement();
    flimsListExtraContainer.forEach((currentItem) => {
      currentItem.remove();
    });
  }
};

const getTwoMostRatedFilms = (films) => {
  let twoMostRatedFilms = [];
  twoMostRatedFilms = films.slice(0).sort((a, b) => {
    return b.totalRating - a.totalRating;
  });
  return twoMostRatedFilms;
};

const getTwoMostCommentedFilms = (films) => {
  let twoMostCommentedFilms = [];
  twoMostCommentedFilms = films.slice(0).sort((a, b) => {
    return b.comments - a.comments;
  });
  return twoMostCommentedFilms;
};

export default class PageController {
  constructor(container, filmsModel) {
    // this._films = [];
    this._filmsModel = filmsModel;

    this._showedFilmsControllers = [];
    this._container = container;
    this._sortingFilmsComponent = new SortingFilmsComponent();
    this._btnShowMoreComponent = new BtnShowMoreComponent();
    this._noFilmsComponent = new NoFilmsComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  _createShowedFilmControllers(sortedFilms, startAmount, renderContainer, startCountingNumber = 0) {
    const films = this._renderCardsOfFilms(sortedFilms, startAmount, renderContainer, startCountingNumber, this._onDataChange, this._onViewChange);
    this._showedFilmsControllers = this._showedFilmsControllers.concat(films);
  }

  render() {
    this._films = this._filmsModel.getFilms();
    this._mainMenuComponent = new MainMenuComponent(this._films);

    let startCountingNumber = 0;

    const main = this._container.querySelector(`.main`);
    const listOfFilms = this._container.querySelector(`.films-list`);

    const filmsContainer = this._container.querySelectorAll(`.films-list__container`)[0];
    const filmsContainerTopRated = this._container.querySelectorAll(`.films-list__container`)[1];
    const filmsContainerMostCommented = this._container.querySelectorAll(`.films-list__container`)[2];
    const footerStatistics = this._container.querySelector(`.footer__statistics`);

    let generatedFilms = [...this._films];

    render(main, this._mainMenuComponent.getElement(), RenderPosition.AFTERBEGIN);

    render(listOfFilms, this._sortingFilmsComponent.getElement(), RenderPosition.AFTERBEGIN);

    this._createShowedFilmControllers(generatedFilms, FILM.ON_START, filmsContainer, startCountingNumber);

    this._createShowedFilmControllers(getTwoMostRatedFilms(generatedFilms), 2, filmsContainerTopRated, 0);
    this._createShowedFilmControllers(getTwoMostCommentedFilms(generatedFilms), 2, filmsContainerMostCommented, 0);

    let filteredFilms = [...generatedFilms];
    let films = [...generatedFilms];

    this._mainMenuComponent.setFilterTypeChangeHandler((filterType) => {
      filteredFilms = this._films.slice().filter(filterTypeCallbacks[filterType]);
      remove(this._btnShowMoreComponent);

      startCountingNumber = 0;
      // this._showedFilmsControllers.forEach((movieController) => movieController.destroy());
      filmsContainer.innerHTML = ``;
      render(listOfFilms, this._btnShowMoreComponent.getElement(), RenderPosition.BEFOREEND);

      this._showedFilmsControllers = this._renderCardsOfFilms(filteredFilms, FILM.ON_START, filmsContainer, startCountingNumber, this._onDataChange, this._onViewChange);

      // this._createShowedFilmControllers(filteredFilms, FILM.ON_START, filmsContainer, startCountingNumber);
      const amointOfFilteredFilms = filteredFilms.length;
      this._onBtnShowMoreClick(this._btnShowMoreComponent, filteredFilms, filmsContainer, startCountingNumber, amointOfFilteredFilms, this._onDataChange, this._onViewChange);
      let sortedFilms = [];

      this._sortingFilmsComponent.setSortTypeChangeHandler((sortType) => {
        sortedFilms = this.filteredFilms.slice().sort(sortTypeCallbacks[sortType]);
        remove(this._btnShowMoreComponent);

        filmsContainer.innerHTML = ``;

        render(listOfFilms, this._btnShowMoreComponent.getElement(), RenderPosition.BEFOREEND);

        this._showedFilmsControllers = this._renderCardsOfFilms(sortedFilms, FILM.ON_START, filmsContainer, startCountingNumber, this._onDataChange, this._onViewChange);

        // this._createShowedFilmControllers(sortedFilms, FILM.ON_START, filmsContainer, startCountingNumber);

        startCountingNumber = 0;
        const amountOfSortedFilms = sortedFilms.length;
        this._onBtnShowMoreClick(this._btnShowMoreComponent, sortedFilms, filmsContainer, startCountingNumber, amountOfSortedFilms, this._onDataChange, this._onViewChange);
      });
    });

    this._sortingFilmsComponent.setSortTypeChangeHandler((sortType) => {
      films = this._films.slice().sort(sortTypeCallbacks[sortType]);
      remove(this._btnShowMoreComponent);

      filmsContainer.innerHTML = ``;

      render(listOfFilms, this._btnShowMoreComponent.getElement(), RenderPosition.BEFOREEND);

      this._showedFilmsControllers = this._renderCardsOfFilms(films, FILM.ON_START, filmsContainer, startCountingNumber, this._onDataChange, this._onViewChange);

      // this._createShowedFilmControllers(films, FILM.ON_START, filmsContainer, startCountingNumber);

      startCountingNumber = 0;
      const amountOfFilms = films.length;
      this._onBtnShowMoreClick(this._btnShowMoreComponent, filteredFilms, filmsContainer, startCountingNumber, amountOfFilms, this._onDataChange, this._onViewChange);
    });

    render(listOfFilms, this._btnShowMoreComponent.getElement(), RenderPosition.BEFOREEND);

    this._onBtnShowMoreClick(this._btnShowMoreComponent, generatedFilms, filmsContainer, startCountingNumber, FILM.CARDS, this._onDataChange, this._onViewChange);

    changeWebsiteIfNoFilmsAvailable(footerStatistics, filmsContainer, generatedFilms, this._btnShowMoreComponent, this._sortingFilmsComponent, this._noFilmsComponent.getElement());
  }

  _onBtnShowMoreClick(button, films, renderContainer, startCountingNumber, amountOfFilms) {
    button.setClickHandler(() => {
      startCountingNumber = startCountingNumber <= amountOfFilms - FILM.ON_START
        ? startCountingNumber + FILM.ON_START
        : amountOfFilms;

      if (startCountingNumber + FILM.ON_START >= amountOfFilms) {
        button.getElement().remove();
        button.removeElement();
      }

      this._createShowedFilmControllers(films, FILM.ON_START, renderContainer, startCountingNumber);
    });
  }

  _renderCardsOfFilms(films, startAmount, renderContainer, startCountingNumber = 0, onDataChange, onViewChange, onCommentChange) {
    return films.slice(startCountingNumber, startCountingNumber + startAmount).map((film) => {
      const movieController = new MovieController(renderContainer, onDataChange, onViewChange, onCommentChange);
      movieController.render(film);

      return movieController;
    });
  }

  _onViewChange() {
    this._showedFilmsControllers.forEach((it) => it.setDefaultView());
  }

  _onDataChange(movieController, newFilm, oldFilm) {
    this._films = this._filmsModel.updateFilm(oldFilm.id, newFilm);
    if (this._films) {
      this._changeMainNavigationViewByChangingData(this._films);
      this._mainMenuComponent = new MainMenuComponent(this._films);
      this._mainMenuComponent.rerender();
      movieController.render(newFilm);
    }
  }

  _changeMainNavigationViewByChangingData(films) {
    const mainNavigation = document.querySelector(`.main-navigation`);
    const filmsAddedToWatchList = films.filter((filmsToSort) => {
      return filmsToSort.watchlist;
    });
    const filmsAddedToHistory = films.filter((filmsToSort) => {
      return filmsToSort.alreadyWatched;
    });
    const filmsAddedToFavorites = films.filter((filmsToSort) => {
      return filmsToSort.favorite;
    });

    const sortMenuItems = Array.from(mainNavigation.querySelectorAll(`.main-navigation__item-count`));
    sortMenuItems[0].textContent = `${filmsAddedToWatchList.length}`;
    sortMenuItems[1].textContent = `${filmsAddedToHistory.length}`;
    sortMenuItems[2].textContent = `${filmsAddedToFavorites.length}`;
  }
}
