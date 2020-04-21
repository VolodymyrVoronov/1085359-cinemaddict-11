import RankOfUserComponent from "./components/rankOfUser.js";
import MainMenuComponent from "./components/mainMenu.js";
import CardOfFilmComponent from "./components/cardOfFilm.js";
import BtnShowMoreComponent from "./components/btnShowMore.js";
import MostRatedFilmComponent from "./components/mostRatedFilm.js";
import MostCommentedFilmComponent from "./components/mostCommentedFilm.js";
import PopUpFilmDetailsComponent from "./components/popUpFilmDetails.js";
import AmountOfMoviesFilmComponent from "./components/amountOfMovies.js";
import CommentElementComponent from "./components/comments.js";
import NoFilmsComponent from "./components/noFilms.js";

import {generateFilms} from "./mock/generateFilms.js";
import {generateFilters} from "./mock/generateFilters.js";
import {generateComments} from "./mock/generateComments.js";

import {render} from "./utils.js";

import {FILM, ESC_KEY, RenderPosition} from "../src/const.js";

const films = generateFilms(FILM.CARDS);
const comments = generateComments(FILM.MAX_COMMENTS);
const filters = generateFilters();

let twoMostRatedFilms = [];
twoMostRatedFilms = films.slice(0).sort((a, b) => {
  return b.totalRating - a.totalRating;
});

let twoMostCommentedFilms = [];
twoMostCommentedFilms = films.slice(0).sort((a, b) => {
  return b.comments - a.comments;
});

const mainHeaderElement = document.querySelector(`.header`);
const mainContent = document.querySelector(`.main`);
const listOfFilms = document.querySelector(`.films-list`);
const filmsContainerList = document.querySelectorAll(`.films-list__container`)[0];
const filmsContainerTopRated = document.querySelectorAll(`.films-list__container`)[1];
const filmsContainerMostCommented = document.querySelectorAll(`.films-list__container`)[2];
const footerStatistics = document.querySelector(`.footer__statistics`);

const btnShowMoreComponent = new BtnShowMoreComponent();

render(mainHeaderElement, new RankOfUserComponent().getElement(), RenderPosition.BEFOREEND);
render(mainContent, new MainMenuComponent(filters).getElement(), RenderPosition.AFTERBEGIN);
render(listOfFilms, btnShowMoreComponent.getElement(), RenderPosition.BEFOREEND);

let showingFilmsCount = FILM.ON_START;

const showFilmsOnStart = () => {
  films.slice(0, showingFilmsCount)
    .forEach((film) => render(filmsContainerList, new CardOfFilmComponent(film).getElement(), RenderPosition.BEFOREEND));
};

showFilmsOnStart();

const deletePopUp = () => {
  const filmDetails = document.querySelector(`.film-details`);
  if (filmDetails) {
    filmDetails.remove();
  }
};

const showTextIfNoFilms = () => {
  if (films.length === 0) {
    render(listOfFilms, new NoFilmsComponent().getElement(), RenderPosition.AFTERBEGIN);
    btnShowMoreComponent.getElement().remove();
    btnShowMoreComponent.removeElement();
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

const btnShowMore = document.querySelector(`.films-list__show-more`);

btnShowMore.addEventListener(`click`, () => {
  const prevFilmCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + FILM.BY_BUTTON;

  films.slice(prevFilmCount, showingFilmsCount)
    .forEach((film) => render(filmsContainerList, new CardOfFilmComponent(film).getElement(), RenderPosition.BEFOREEND));

  if (showingFilmsCount >= films.length) {
    btnShowMoreComponent.getElement().remove();
    btnShowMoreComponent.removeElement();
  }

  setUpListenerToShowPopUpFilmDetails(films, comments);
});

twoMostRatedFilms.slice(0, FILM.MOST_RATED)
  .forEach((film) => render(filmsContainerTopRated, new MostRatedFilmComponent(film).getElement(), RenderPosition.BEFOREEND));

twoMostCommentedFilms.slice(0, FILM.MOST_COMMENTED)
  .forEach((film) => render(filmsContainerMostCommented, new MostCommentedFilmComponent(film).getElement(), RenderPosition.BEFOREEND));

render(footerStatistics, new AmountOfMoviesFilmComponent(FILM.IN_BASE).getElement(), RenderPosition.BEFOREEND);

setUpListenerToShowPopUpFilmDetails(twoMostRatedFilms, comments);
setUpListenerToShowPopUpFilmDetails(twoMostCommentedFilms, comments);
setUpListenerToShowPopUpFilmDetails(films, comments);
showTextIfNoFilms();
