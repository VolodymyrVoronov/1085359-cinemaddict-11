import API from "./api.js";

import RankOfUserComponent from "./components/rank-of-user.js";
import MoviesModel from "./models/movies.js";
import Stats from "./components/stats.js";

import PageController from "./controllers/page-controller.js";

import {render} from "./utils/render.js";

import {RenderPosition} from "../src/const.js";

const AUTHORIZATION = `Basic fasd42d111dd3423`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

const api = new API(END_POINT, AUTHORIZATION);

// const films = generateFilms(FILM.CARDS);

const body = document.querySelector(`body`);
const main = document.querySelector(`.main`);
const mainHeaderElement = document.querySelector(`.header`);

const mainFilmsContainer = document.querySelector(`.films`);

const filmsModel = new MoviesModel();

// filmsModel.setFilms(films);

const pageController = new PageController(body, filmsModel, api);
// pageController.render(films);
api.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
    pageController.render(films);

    const rankOfUser = new RankOfUserComponent(filmsModel);
    render(mainHeaderElement, rankOfUser.getElement(), RenderPosition.BEFOREEND);

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

    const stats = new Stats(filmsModel);
    render(main, stats.getElement(), RenderPosition.BEFOREEND);
    stats.hide();
  });
