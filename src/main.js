import {createRankOfUser} from "./components/rankOfUser.js";
import {createMainMenu} from "./components/mainMenu.js";
import {createCardOfFilm} from "./components/cardOfFilm.js";
import {createBtnShowMore} from "./components/btnShowMore.js";
import {createMostRatedFilm} from "./components/mostRatedFilm.js";
import {createMostCommentedFilm} from "./components/mostCommentedFilm.js";
import {createPopUpFilmDetails} from "./components/popUpFilmDetails.js";
import {createAmountOfMovies} from "./components/amountOfMovies.js";
import {renderElement} from "./components/renderElement.js";
import {renderElements} from "./components/renderElements.js";

const AMOUNT_OF_CARDS_OF_FILMS = 5;
const AMOUNT_OF_MOST_RATED_FILMS = 2;
const AMOUNT_OF_MOST_COMMENTED_FILMS = 2;

const mainHeaderElement = document.querySelector(`.header`);
const mainContent = document.querySelector(`.main`);
const listOfFilms = document.querySelector(`.films-list`);
const filmsContainerList = document.querySelectorAll(`.films-list__container`)[0];
const filmsContainerTopRated = document.querySelectorAll(`.films-list__container`)[1];
const filmsContainerMostCommented = document.querySelectorAll(`.films-list__container`)[2];
const footerStatistics = document.querySelector(`.footer__statistics`);

renderElement(mainHeaderElement, createRankOfUser(), `beforeend`);
renderElement(mainContent, createMainMenu(), `afterbegin`);
renderElement(listOfFilms, createBtnShowMore(), `beforeend`);
renderElements(AMOUNT_OF_CARDS_OF_FILMS, filmsContainerList, createCardOfFilm(), `afterbegin`);
renderElements(AMOUNT_OF_MOST_RATED_FILMS, filmsContainerTopRated, createMostRatedFilm(), `afterbegin`);
renderElements(AMOUNT_OF_MOST_COMMENTED_FILMS, filmsContainerMostCommented, createMostCommentedFilm(), `afterbegin`);
renderElement(footerStatistics, createAmountOfMovies(), `afterbegin`);
renderElement(mainContent, createPopUpFilmDetails(), `beforeend`);
