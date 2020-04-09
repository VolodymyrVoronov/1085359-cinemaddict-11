import {createRankOfUser} from "./components/rankOfUser.js";
import {createMainMenu} from "./components/mainMenu.js";
import {createCardOfFilm} from "./components/cardOfFilm.js";
import {createBtnShowMore} from "./components/btnShowMore.js";
import {createMostRatedFilm, clickOnMostRatedFilm} from "./components/mostRatedFilm.js";
import {createMostCommentedFilm, clickOnMostCommentedFilm} from "./components/mostCommentedFilm.js";
import {deletePopUp, showExtrainfoAboutFilm} from "./components/popUpFilmDetails.js";
import {createAmountOfMovies} from "./components/amountOfMovies.js";
import {renderElement} from "./components/renderElement.js";

import {generateFilms} from "./mock/generateFilms.js";
import {generateMostRatedFilms} from "./mock/generateFilms.js";
import {generateMostCommentedFilms} from "./mock/generateFilms.js";
import {generateFilters} from "./mock/generateFilters.js";
import {generateComments} from "./mock/generateComments.js";
import {FILM, ESC_KEY} from "../src/const.js";

const films = generateFilms(FILM.CARDS);
const mostRatedFilms = generateMostRatedFilms(FILM.CARDS);
const mostCommentedFilms = generateMostCommentedFilms(FILM.CARDS);
const comments = generateComments(FILM.MAX_COMMENTS);
const filters = generateFilters();

let twoMostRatedFilms = [];
twoMostRatedFilms = mostRatedFilms.slice(0).sort((a, b) => {
  return b.totalRating - a.totalRating;
});

let twoMostCommentedFilms = [];
twoMostCommentedFilms = mostCommentedFilms.slice(0).sort((a, b) => {
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

let showingFilmsCount = FILM.ON_START;

const showFilmsOfStart = () => {
  films.slice(0, showingFilmsCount)
    .forEach((film) => renderElement(filmsContainerList, createCardOfFilm(film), `beforeend`));
};

showFilmsOfStart();

const btnShowMore = document.querySelector(`.films-list__show-more`);

showExtrainfoAboutFilm(films, comments, showingFilmsCount);

btnShowMore.addEventListener(`click`, () => {
  const prevFilmCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + FILM.BY_BUTTON;

  films.slice(prevFilmCount, showingFilmsCount)
  .forEach((film) => renderElement(filmsContainerList, createCardOfFilm(film), `beforeend`));

  if (showingFilmsCount >= films.length) {
    btnShowMore.remove();
  }

  showExtrainfoAboutFilm(films, comments, showingFilmsCount);
});

twoMostRatedFilms.slice(0, FILM.MOST_RATED)
  .forEach((film) => renderElement(filmsContainerTopRated, createMostRatedFilm(film), `beforeend`));

twoMostCommentedFilms.slice(0, FILM.MOST_COMMENTED)
  .forEach((film) => renderElement(filmsContainerMostCommented, createMostCommentedFilm(film), `beforeend`));

renderElement(footerStatistics, createAmountOfMovies(150000), `beforeend`);

clickOnMostRatedFilm(twoMostRatedFilms, comments, showingFilmsCount);
clickOnMostCommentedFilm(twoMostCommentedFilms, comments, showingFilmsCount);

window.addEventListener(`keydown`, function (e) {
  if (e.key === ESC_KEY) {
    deletePopUp();
  }
});
