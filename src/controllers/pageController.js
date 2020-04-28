import SortingFilmsComponent from "../components/sortingFilms.js";
import CardOfFilmComponent from "../components/cardOfFilm.js";
import BtnShowMoreComponent from "../components/btnShowMore.js";
import MostRatedFilmComponent from "../components/mostRatedFilm.js";
import MostCommentedFilmComponent from "../components/mostCommentedFilm.js";
import CommentElementComponent from "../components/comments.js";
import PopUpFilmDetailsComponent from "../components/popUpFilmDetails.js";
import AmountOfMoviesFilmComponent from "../components/amountOfMovies.js";
import NoFilmsComponent from "../components/noFilms.js";

import {render, remove} from "../utils/render.js";

import {FILM, ESC_KEY, RenderPosition, SortType} from "../const.js";

const mainContent = document.querySelector(`.main`);
const flimsListExtraContainer = document.querySelectorAll(`.films-list--extra`);

const renderCardsOfFilms = (films, startAmount, renderContainer, startCountingNumber = 0) => {
  films.slice(startCountingNumber, startCountingNumber + startAmount)
    .forEach((film) => render(renderContainer, new CardOfFilmComponent(film).getElement(), RenderPosition.BEFOREEND));
};

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

const deletePopUp = () => {
  const filmDetails = document.querySelector(`.film-details`);
  if (filmDetails) {
    filmDetails.remove();
  }
};

const changePopUpVisibility = (index, filmsArray, commentsArray) => {
  deletePopUp();

  let newSortArray = [];
  newSortArray = filmsArray.slice(0).filter((film) => {
    return film.id === +index;
  });

  const popUpFilmDetailsComponent = new PopUpFilmDetailsComponent(newSortArray[0]);
  render(mainContent, popUpFilmDetailsComponent.getElement(), RenderPosition.BEFOREEND);
  const onEscKeyDown = (e) => {
    const isEscKey = e.key === ESC_KEY;

    if (isEscKey) {
      remove(popUpFilmDetailsComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  document.addEventListener(`keydown`, onEscKeyDown);

  const closePopUpBtn = document.querySelector(`.film-details__close-btn`);
  closePopUpBtn.addEventListener(`click`, () => {
    remove(popUpFilmDetailsComponent);
  });

  const commentBlock = document.querySelector(`.film-details__comments-list`);
  commentsArray.forEach((comment) => render(commentBlock, new CommentElementComponent(comment).getElement(), RenderPosition.BEFOREEND));
};

const setUpListenerToShowPopUpFilmDetails = (filmsArray, commentsArray) => {
  mainContent.addEventListener(`click`, (e) => {
    let dataIdOfFilmCard = e.target.parentElement.getAttribute(`data-id`);

    if (e.target.classList.contains(`film-card__poster`) ||
        e.target.classList.contains(`film-card__title`) ||
        e.target.classList.contains(`film-card__comments`)) {
      changePopUpVisibility(dataIdOfFilmCard, filmsArray, commentsArray);
    }
  });
};

const onBtnShowMoreClick = (button, films, comments, renderContainer, startCountingNumber) => {
  button.setClickHandler(() => {
    startCountingNumber = startCountingNumber <= FILM.CARDS - FILM.ON_START
      ? startCountingNumber + FILM.ON_START
      : FILM.CARDS;

    if (startCountingNumber + FILM.ON_START >= FILM.CARDS) {
      button.getElement().remove();
      button.removeElement();
    }

    renderCardsOfFilms(films, FILM.ON_START, renderContainer, startCountingNumber);
    setUpListenerToShowPopUpFilmDetails(films, comments);
  });
};

const getTwoMostRatedFilms = (films) => {
  let twoMostRatedFilms = [];
  twoMostRatedFilms = films.slice(0).sort((a, b) => {
    return b.totalRating - a.totalRating;
  });
  return twoMostRatedFilms;
};

const renderTwoMostRatedFilms = (filmsArray, container) => {
  filmsArray.slice(0, FILM.MOST_RATED).forEach((film) => render(container, new MostRatedFilmComponent(film).getElement(), RenderPosition.BEFOREEND));
};

const getTwoMostCommentedFilms = (films) => {
  let twoMostCommentedFilms = [];
  twoMostCommentedFilms = films.slice(0).sort((a, b) => {
    return b.comments - a.comments;
  });
  return twoMostCommentedFilms;
};

const renderMostCommentedFilms = (filmsArray, container) => {
  filmsArray.slice(0, FILM.MOST_COMMENTED).forEach((film) => render(container, new MostCommentedFilmComponent(film).getElement(), RenderPosition.BEFOREEND));
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._sortingFilmsComponent = new SortingFilmsComponent();
    this._btnShowMoreComponent = new BtnShowMoreComponent();
    this._noFilmsComponent = new NoFilmsComponent();
  }

  render(films, comments) {
    let startCountingNumber = 0;
    const listOfFilms = this._container.querySelector(`.films-list`);

    const filmsContainer = this._container.querySelectorAll(`.films-list__container`)[0];
    const filmsContainerTopRated = this._container.querySelectorAll(`.films-list__container`)[1];
    const filmsContainerMostCommented = this._container.querySelectorAll(`.films-list__container`)[2];
    const footerStatistics = this._container.querySelector(`.footer__statistics`);

    let sortedFilms = [...films];

    render(listOfFilms, this._sortingFilmsComponent.getElement(), RenderPosition.AFTERBEGIN);
    renderCardsOfFilms(sortedFilms, FILM.ON_START, filmsContainer, startCountingNumber);

    getTwoMostRatedFilms(films, filmsContainerTopRated);
    getTwoMostCommentedFilms(films, filmsContainerMostCommented);
    renderTwoMostRatedFilms(getTwoMostRatedFilms(films), filmsContainerTopRated);
    renderMostCommentedFilms(getTwoMostCommentedFilms(films), filmsContainerMostCommented);
    setUpListenerToShowPopUpFilmDetails(sortedFilms, comments);

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
      renderCardsOfFilms(sortedFilms, FILM.ON_START, filmsContainer);
      startCountingNumber = 0;
      onBtnShowMoreClick(this._btnShowMoreComponent, sortedFilms, comments, filmsContainer, startCountingNumber);
    });
    render(listOfFilms, this._btnShowMoreComponent.getElement(), RenderPosition.BEFOREEND);
    onBtnShowMoreClick(this._btnShowMoreComponent, sortedFilms, comments, filmsContainer, startCountingNumber);
    changeWebsiteIfNoFilmsAvailable(footerStatistics, filmsContainer, sortedFilms, this._btnShowMoreComponent, this._sortingFilmsComponent, this._noFilmsComponent.getElement());
  }
}
