import RankOfUserComponent from "./components/rank-of-user.js";
import MoviesModel from "./models/movies.js";
import Stats from "./components/stats.js";

import PageController from "./controllers/page-controller.js";

import {generateFilms} from "./mock/generateFilms.js";

import {render} from "./utils/render.js";

import {FILM, RenderPosition} from "../src/const.js";

const films = generateFilms(FILM.CARDS);

const body = document.querySelector(`body`);
const main = document.querySelector(`.main`);
const mainHeaderElement = document.querySelector(`.header`);

const mainFilmsContainer = document.querySelector(`.films`);

const filmsModel = new MoviesModel();
filmsModel.setFilms(films);

render(mainHeaderElement, new RankOfUserComponent(10).getElement(), RenderPosition.BEFOREEND);

const pageController = new PageController(body, filmsModel);
pageController.render(films);

const stats = new Stats(filmsModel);

render(main, stats.getElement(), RenderPosition.BEFOREEND);

stats.hide();
const mainMenu = document.querySelector(`.main-navigation`);

mainMenu.addEventListener(`click`, (e) => {
  if (e.target.classList.contains(`main-navigation__additional`)) {
    e.target.classList.add(`main-navigation__item--active`);
    stats.show();
    mainFilmsContainer.classList.add(`visually-hidden`);
    const links = document.querySelectorAll(`.main-navigation__item`);
    links.forEach((element) => element.classList.remove(`main-navigation__item--active`));
  }
});
