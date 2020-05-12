import RankOfUserComponent from "./components/rank-of-user.js";
import MoviesModel from "./models/movies.js";
// import MainMenuComponent from "./components/main-menu.js";

import PageController from "./controllers/page-controller.js";
// import FilterController from "./controllers/filter-controller.js";

import {generateFilms} from "./mock/generateFilms.js";

import {render} from "./utils/render.js";

import {FILM, RenderPosition} from "../src/const.js";

const films = generateFilms(FILM.CARDS);

const body = document.querySelector(`body`);
// const mainContent = document.querySelector(`.main`);
const mainHeaderElement = document.querySelector(`.header`);

const filmsModel = new MoviesModel();
filmsModel.setFilms(films);

// const filterController = new FilterController(body, filmsModel);
// filterController.render();

render(mainHeaderElement, new RankOfUserComponent().getElement(), RenderPosition.BEFOREEND);
// render(mainContent, new MainMenuComponent(films).getElement(), RenderPosition.AFTERBEGIN);

const pageController = new PageController(body, filmsModel);
pageController.render(films);
