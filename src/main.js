import {createRankOfUser} from "./components/rankOfUser.js";
import {createMainMenu} from "./components/mainMenu.js";
import {createCardOfFilm} from "./components/cardOfFilm.js";
import {createBtnShowMore} from "./components/btnShowMore.js";
import {createMostRatedFilm} from "./components/mostRatedFilm.js";
import {createMostCommentedFilm} from "./components/mostCommentedFilm.js";
import {createPopUpFilmDetails} from "./components/popUpFilmDetails.js";
import {createCommentElement} from "./components/comments.js";
import {createAmountOfMovies} from "./components/amountOfMovies.js";
import {renderElement} from "./components/renderElement.js";
// import {renderElements} from "./components/renderElements.js";

import {generateFilms} from "./mock/generateFilms.js";
import {generateMostRatedFilms} from "./mock/generateFilms.js";
import {generateMostCommentedFilms} from "./mock/generateFilms.js";
import {generateFilters} from "./mock/generateFilters.js";
import {generateComments} from "./mock/generateComments.js";
import {Number, ESC_KEY} from "../src/const.js";

const openAndClosePopUpOfFilmDetails = () => {
  const commentsContainer = document.querySelector(`.film-details__comments-list`);

  comments.slice(0, showingFilmsCount)
  .forEach((comments) => renderElement(commentsContainer, createCommentElement(comments), `beforeend`));

  const closePopUpOfFilmBtn = document.querySelector(`.film-details__close-btn`);
  const filmDetails = document.querySelector(`.film-details`);
  closePopUpOfFilmBtn.addEventListener(`click`, () => {
    filmDetails.remove();
  });
};

const deletePopUp = () => {
  const filmDetails = document.querySelector(`.film-details`);
  if (filmDetails) {
    filmDetails.remove();
  }
};

const films = generateFilms(Number.AMOUNT_OF_CARDS_OF_FILMS);
const mostRatedFilms = generateMostRatedFilms(Number.AMOUNT_OF_CARDS_OF_FILMS);
const mostCommentedFilms = generateMostCommentedFilms(Number.AMOUNT_OF_CARDS_OF_FILMS);
const comments = generateComments(Number.AMOUNT_OF_COMMENTS);
const filters = generateFilters();

let twoMostRatedFilms = [];
twoMostRatedFilms = mostRatedFilms.slice(0).sort((a, b) => {
  return b.totalRating - a.totalRating;
});

let twoMostCommntedFilms = [];
twoMostCommntedFilms = mostCommentedFilms.slice(0).sort((a, b) => {
  return b.comments - a.comments;
});

const mainHeaderElement = document.querySelector(`.header`);
const mainContent = document.querySelector(`.main`);
const listOfFilms = document.querySelector(`.films-list`);
const filmsContainerList = document.querySelectorAll(`.films-list__container`)[0];
const filmsContainerTopRated = document.querySelectorAll(`.films-list__container`)[1];
const filmsContainerMostCommented = document.querySelectorAll(`.films-list__container`)[2];
const footerStatistics = document.querySelector(`.footer__statistics`);

renderElement(mainHeaderElement, createRankOfUser(), `beforeend`);
renderElement(mainContent, createMainMenu(filters), `afterbegin`);
renderElement(listOfFilms, createBtnShowMore(), `beforeend`);

let showingFilmsCount = Number.SOWING_AMOUNT_OF_FILMS_ON_START;

films.slice(0, showingFilmsCount)
  .forEach((film) => renderElement(filmsContainerList, createCardOfFilm(film), `beforeend`));

const btnShowMore = document.querySelector(`.films-list__show-more`);

const showExtrainfoAboutFilm = () => {
  let filmCardPosters = filmsContainerList.querySelectorAll(`.film-card__poster`);
  let filmCardTitles = filmsContainerList.querySelectorAll(`.film-card__title`);
  let filmCardcomments = filmsContainerList.querySelectorAll(`.film-card__comments`);

  filmCardPosters.forEach((element, index) => {
    element.addEventListener(`click`, () => {
      deletePopUp();
      renderElement(mainContent, createPopUpFilmDetails(films[index]), `beforeend`);
      openAndClosePopUpOfFilmDetails();
    });
  });

  filmCardTitles.forEach((element, index) => {
    element.addEventListener(`click`, () => {
      deletePopUp();
      renderElement(mainContent, createPopUpFilmDetails(films[index]), `beforeend`);
      openAndClosePopUpOfFilmDetails();
    });
  });

  filmCardcomments.forEach((element, index) => {
    element.addEventListener(`click`, () => {
      deletePopUp();
      renderElement(mainContent, createPopUpFilmDetails(films[index]), `beforeend`);
      openAndClosePopUpOfFilmDetails();
    });
  });
};

showExtrainfoAboutFilm();

btnShowMore.addEventListener(`click`, () => {
  const prevFilmCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + Number.SOWING_AMOUNT_OF_FILMS_BY_BUTTON;

  films.slice(prevFilmCount, showingFilmsCount)
  .forEach((film) => renderElement(filmsContainerList, createCardOfFilm(film), `beforeend`));

  if (showingFilmsCount >= films.length) {
    btnShowMore.remove();
  }

  showExtrainfoAboutFilm();
});

twoMostRatedFilms.slice(0, Number.AMOUNT_OF_MOST_RATED_FILMS)
  .forEach((film) => renderElement(filmsContainerTopRated, createMostRatedFilm(film), `beforeend`));

twoMostCommntedFilms.slice(0, Number.AMOUNT_OF_MOST_COMMENTED_FILMS)
  .forEach((film) => renderElement(filmsContainerMostCommented, createMostCommentedFilm(film), `beforeend`));

const filmCardPostersTopRated = filmsContainerTopRated.querySelectorAll(`.film-card__poster`);
const filmCardTitlesTopRated = filmsContainerTopRated.querySelectorAll(`.film-card__title`);
const filmCardcommentsTopRated = filmsContainerTopRated.querySelectorAll(`.film-card__comments`);

const filmCardPostersTopCommented = filmsContainerMostCommented.querySelectorAll(`.film-card__poster`);
const filmCardTitlesTopCommented = filmsContainerMostCommented.querySelectorAll(`.film-card__title`);
const filmCardcommentsTopCommented = filmsContainerMostCommented.querySelectorAll(`.film-card__comments`);

renderElement(footerStatistics, createAmountOfMovies(150000), `beforeend`);

filmCardPostersTopRated.forEach((element, index) => {
  element.addEventListener(`click`, () => {
    deletePopUp();
    renderElement(mainContent, createPopUpFilmDetails(twoMostRatedFilms[index]), `beforeend`);
    openAndClosePopUpOfFilmDetails();
  });
});

filmCardTitlesTopRated.forEach((element, index) => {
  element.addEventListener(`click`, () => {
    deletePopUp();
    renderElement(mainContent, createPopUpFilmDetails(twoMostRatedFilms[index]), `beforeend`);
    openAndClosePopUpOfFilmDetails();
  });
});

filmCardcommentsTopRated.forEach((element, index) => {
  element.addEventListener(`click`, () => {
    deletePopUp();
    renderElement(mainContent, createPopUpFilmDetails(twoMostRatedFilms[index]), `beforeend`);
    openAndClosePopUpOfFilmDetails();
  });
});

filmCardPostersTopCommented.forEach((element, index) => {
  element.addEventListener(`click`, () => {
    deletePopUp();
    renderElement(mainContent, createPopUpFilmDetails(twoMostCommntedFilms[index]), `beforeend`);

    openAndClosePopUpOfFilmDetails();
  });
});

filmCardTitlesTopCommented.forEach((element, index) => {
  element.addEventListener(`click`, () => {
    deletePopUp();
    renderElement(mainContent, createPopUpFilmDetails(twoMostCommntedFilms[index]), `beforeend`);

    openAndClosePopUpOfFilmDetails();
  });
});

filmCardcommentsTopCommented.forEach((element, index) => {
  element.addEventListener(`click`, () => {
    deletePopUp();
    renderElement(mainContent, createPopUpFilmDetails(twoMostCommntedFilms[index]), `beforeend`);

    openAndClosePopUpOfFilmDetails();
  });
});

window.addEventListener(`keydown`, function (e) {
  if (e.key === ESC_KEY) {
    deletePopUp();
  }
});
