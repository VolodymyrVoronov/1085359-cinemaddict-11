import API from "./api.js";

import MoviesModel from "./models/movies.js";
import Stats from "./components/stats.js";
import Loading from "./components/loading.js";

import PageController from "./controllers/page-controller.js";

import {render} from "./utils/render.js";
import {RenderPosition} from "../src/const.js";

const AUTHORIZATION = `Basic fsaaaa13`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

const api = new API(END_POINT, AUTHORIZATION);

const body = document.querySelector(`body`);
const main = document.querySelector(`.main`);
const mainFilmsContainer = document.querySelector(`.films`);

const loadingPage = new Loading();
const filmsModel = new MoviesModel();
const pageController = new PageController(body, filmsModel, api);

render(main, loadingPage.getElement(), RenderPosition.AFTERBEGIN);

api.getFilms()
  .then((films) => {
    loadingPage.getElement().remove();
    loadingPage.removeElement();
    filmsModel.setFilms(films);
    pageController.render(films);

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
