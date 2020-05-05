import SortingFilmsComponent from "../components/sorting-films.js";
import BtnShowMoreComponent from "../components/btn-show-more.js";
import AmountOfMoviesFilmComponent from "../components/amount-of-movies.js";
import NoFilmsComponent from "../components/no-films.js";

import MovieController from "./movie-controller.js";

import {render, remove} from "../utils/render.js";

import {FILM, RenderPosition, SortType} from "../const.js";
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
  constructor(container) {
    this._films = [];
    this._showedFilmsControllers = [];
    this._container = container;
    this._sortingFilmsComponent = new SortingFilmsComponent();
    this._btnShowMoreComponent = new BtnShowMoreComponent();
    this._noFilmsComponent = new NoFilmsComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  _createShowedFilmControllers(sortedFilms, startAmount, renderContainer, startCountingNumber = 0, comments) {
    const films = this._renderCardsOfFilms(sortedFilms, startAmount, renderContainer, startCountingNumber, comments, this._onDataChange, this._onViewChange);
    this._showedFilmsControllers = this._showedFilmsControllers.concat(films);
  }

  render(films, comments) {
    this._comments = comments;
    this._films = films;

    let startCountingNumber = 0;

    const listOfFilms = this._container.querySelector(`.films-list`);

    const filmsContainer = this._container.querySelectorAll(`.films-list__container`)[0];
    const filmsContainerTopRated = this._container.querySelectorAll(`.films-list__container`)[1];
    const filmsContainerMostCommented = this._container.querySelectorAll(`.films-list__container`)[2];
    const footerStatistics = this._container.querySelector(`.footer__statistics`);

    let sortedFilms = [...this._films];

    render(listOfFilms, this._sortingFilmsComponent.getElement(), RenderPosition.AFTERBEGIN);

    this._createShowedFilmControllers(sortedFilms, FILM.ON_START, filmsContainer, startCountingNumber, comments);

    this._createShowedFilmControllers(getTwoMostRatedFilms(sortedFilms), 2, filmsContainerTopRated, 0, comments);
    this._createShowedFilmControllers(getTwoMostCommentedFilms(sortedFilms), 2, filmsContainerMostCommented, 0, comments);

    this._sortingFilmsComponent.setSortTypeChangeHandler((sortType) => {
      if (sortType === SortType.DATE) {
        sortedFilms = films.slice().sort((a, b) => b.date - a.date);
      }
      if (sortType === SortType.RATING) {
        sortedFilms = films.slice().sort((a, b) => b.totalRating - a.totalRating);
      }
      if (sortType === SortType.DEFAULT) {
        sortedFilms = films.slice();
      }
      remove(this._btnShowMoreComponent);

      filmsContainer.innerHTML = ``;

      render(listOfFilms, this._btnShowMoreComponent.getElement(), RenderPosition.BEFOREEND);

      this._showedFilmsControllers = this._renderCardsOfFilms(sortedFilms, FILM.ON_START, filmsContainer, startCountingNumber, comments, this._onDataChange, this._onViewChange);

      // this._createShowedFilmControllers(sortedFilms, FILM.ON_START, filmsContainer, startCountingNumber, comments);

      startCountingNumber = 0;

      this._onBtnShowMoreClick(this._btnShowMoreComponent, sortedFilms, comments, filmsContainer, startCountingNumber, this._onDataChange, this._onViewChange);
    });

    render(listOfFilms, this._btnShowMoreComponent.getElement(), RenderPosition.BEFOREEND);

    this._onBtnShowMoreClick(this._btnShowMoreComponent, sortedFilms, comments, filmsContainer, startCountingNumber, this._onDataChange, this._onViewChange);

    changeWebsiteIfNoFilmsAvailable(footerStatistics, filmsContainer, sortedFilms, this._btnShowMoreComponent, this._sortingFilmsComponent, this._noFilmsComponent.getElement());
  }

  _onBtnShowMoreClick(button, films, comments, renderContainer, startCountingNumber) {
    button.setClickHandler(() => {
      startCountingNumber = startCountingNumber <= FILM.CARDS - FILM.ON_START
        ? startCountingNumber + FILM.ON_START
        : FILM.CARDS;

      if (startCountingNumber + FILM.ON_START >= FILM.CARDS) {
        button.getElement().remove();
        button.removeElement();
      }

      this._createShowedFilmControllers(films, FILM.ON_START, renderContainer, startCountingNumber, comments);
    });
  }

  _renderCardsOfFilms(films, startAmount, renderContainer, startCountingNumber = 0, comments, onDataChange, onViewChange) {
    return films.slice(startCountingNumber, startCountingNumber + startAmount).map((film) => {
      const movieController = new MovieController(renderContainer, onDataChange, onViewChange);
      movieController.render(film, this._comments);

      return movieController;
    });
  }

  _onViewChange() {
    this._showedFilmsControllers.forEach((it) => it.setDefaultView());
  }

  _onDataChange(movieController, newFilm, oldFilm) {
    const index = this._films.findIndex((it) => it === oldFilm);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newFilm, this._films.slice(index + 1));
    movieController.render(this._films[index]);
  }
}
