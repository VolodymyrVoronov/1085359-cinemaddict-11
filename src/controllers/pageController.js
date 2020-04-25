import BtnShowMoreComponent from "../components/btnShowMore.js";
import CardOfFilmComponent from "../components/cardOfFilm.js";
import MostRatedFilmComponent from "../components/mostRatedFilm.js";
import MostCommentedFilmComponent from "../components/mostCommentedFilm.js";
import PopUpFilmDetailsComponent from "../components/popUpFilmDetails.js";
import AmountOfMoviesFilmComponent from "../components/amountOfMovies.js";
import CommentElementComponent from "../components/comments.js";
import NoFilmsComponent from "../components/noFilms.js";

import {render} from "../utils/render.js";

import {FILM, ESC_KEY, RenderPosition} from "../const.js";

const mainContent = document.querySelector(`.main`);
const filmsContainerList = document.querySelectorAll(`.films-list__container`)[0];
const flimsListExtraContainer = document.querySelectorAll(`.films-list--extra`);
let showingFilmsCount = FILM.ON_START;

const showFilmsOnStart = (films) => {
  films.slice(0, showingFilmsCount)
    .forEach((film) => render(filmsContainerList, new CardOfFilmComponent(film).getElement(), RenderPosition.BEFOREEND));
};

const changeWebsiteIfNoFilmsAvailable = (containerWhenThereAreFilms, containerWhenThereAreNoFilms, films, button, noFilmsComponent) => {
  if (films.length !== 0) {
    render(containerWhenThereAreFilms, new AmountOfMoviesFilmComponent(FILM.IN_BASE).getElement(), RenderPosition.BEFOREEND);
  } else {
    render(containerWhenThereAreFilms, new AmountOfMoviesFilmComponent(FILM.NO_IN_BASE).getElement(), RenderPosition.BEFOREEND);
    render(containerWhenThereAreNoFilms, noFilmsComponent, RenderPosition.AFTERBEGIN);
    button.getElement().remove();
    button.removeElement();
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

  const popUpFilmDetailsComponent = new PopUpFilmDetailsComponent(filmsArray[index]);
  render(mainContent, popUpFilmDetailsComponent.getElement(), RenderPosition.BEFOREEND);
  const onEscKeyDown = (e) => {
    const isEscKey = e.key === ESC_KEY;

    if (isEscKey) {
      popUpFilmDetailsComponent.getElement().remove();
      popUpFilmDetailsComponent.removeElement();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  document.addEventListener(`keydown`, onEscKeyDown);

  const closePopUpBtn = document.querySelector(`.film-details__close-btn`);
  closePopUpBtn.addEventListener(`click`, () => {
    popUpFilmDetailsComponent.getElement().remove();
    popUpFilmDetailsComponent.removeElement();
  });

  const commentBlock = document.querySelector(`.film-details__comments-list`);
  commentsArray.map((comment) => {
    return render(commentBlock, new CommentElementComponent(comment).getElement(), RenderPosition.BEFOREEND);
  });
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

const onbtnShowMoreClick = (button, films, comments) => {
  button.setClickHandler(() => {
    const prevFilmCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + FILM.BY_BUTTON;

    films.slice(prevFilmCount, showingFilmsCount)
      .forEach((film) => render(filmsContainerList, new CardOfFilmComponent(film).getElement(), RenderPosition.BEFOREEND));

    if (showingFilmsCount >= films.length) {
      button.getElement().remove();
      button.removeElement();
    }

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


const gettwoMostCommentedFilms = (films) => {
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

    this._btnShowMoreComponent = new BtnShowMoreComponent();
    this._noFilmsComponent = new NoFilmsComponent();
  }

  render(films, comments) {

    const listOfFilms = this._container.querySelector(`.films-list`);
    const filmsContainerTopRated = this._container.querySelectorAll(`.films-list__container`)[1];
    const filmsContainerMostCommented = this._container.querySelectorAll(`.films-list__container`)[2];
    const footerStatistics = this._container.querySelector(`.footer__statistics`);

    render(listOfFilms, this._btnShowMoreComponent.getElement(), RenderPosition.BEFOREEND);

    onbtnShowMoreClick(this._btnShowMoreComponent, films, comments);
    showFilmsOnStart(films);
    getTwoMostRatedFilms(films, filmsContainerTopRated);
    gettwoMostCommentedFilms(films, filmsContainerMostCommented);
    renderTwoMostRatedFilms(getTwoMostRatedFilms(films), filmsContainerTopRated);
    renderMostCommentedFilms(gettwoMostCommentedFilms(films), filmsContainerMostCommented);
    setUpListenerToShowPopUpFilmDetails(films, comments);
    changeWebsiteIfNoFilmsAvailable(footerStatistics, listOfFilms, films, this._btnShowMoreComponent, this._noFilmsComponent.getElement());
  }
}
