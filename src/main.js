import RankOfUserComponent from "./components/rankOfUser.js";
import MainMenuComponent from "./components/mainMenu.js";

import PageController from "./controllers/pageController.js";

import {generateFilms} from "./mock/generateFilms.js";
import {generateFilters} from "./mock/generateFilters.js";
import {generateComments} from "./mock/generateComments.js";

import {render} from "./utils/render.js";

import {FILM, RenderPosition} from "../src/const.js";

const films = generateFilms(FILM.CARDS);
const comments = generateComments(FILM.MAX_COMMENTS);
const filters = generateFilters();

const body = document.querySelector(`body`);
const mainContent = document.querySelector(`.main`);
const mainHeaderElement = document.querySelector(`.header`);

render(mainHeaderElement, new RankOfUserComponent().getElement(), RenderPosition.BEFOREEND);
render(mainContent, new MainMenuComponent(filters).getElement(), RenderPosition.AFTERBEGIN);

const pageController = new PageController(body);
pageController.render(films, comments);
