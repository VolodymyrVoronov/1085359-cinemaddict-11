import {renderElement} from "./renderElement.js";
import {createPopUpFilmDetails, changeFilmDetailVisibiltiy, deletePopUp} from "./popUpFilmDetails.js";

export const clickOnMostCommentedFilm = (twoMostCommentedFilms, comments, showingFilmsCount) => {
  const mainContent = document.querySelector(`.main`);
  const filmsContainerTopCommented = document.querySelectorAll(`.films-list__container`)[2];
  const filmCardPostersTopCommented = filmsContainerTopCommented.querySelectorAll(`.film-card__poster`);
  const filmCardTitlesTopCommented = filmsContainerTopCommented.querySelectorAll(`.film-card__title`);
  const filmCardcommentsTopCommented = filmsContainerTopCommented.querySelectorAll(`.film-card__comments`);

  filmCardPostersTopCommented.forEach((element, index) => {
    element.addEventListener(`click`, () => {
      deletePopUp();
      renderElement(mainContent, createPopUpFilmDetails(twoMostCommentedFilms[index]), `beforeend`);

      changeFilmDetailVisibiltiy(comments, showingFilmsCount);
    });
  });

  filmCardTitlesTopCommented.forEach((element, index) => {
    element.addEventListener(`click`, () => {
      deletePopUp();
      renderElement(mainContent, createPopUpFilmDetails(twoMostCommentedFilms[index]), `beforeend`);

      changeFilmDetailVisibiltiy(comments, showingFilmsCount);
    });
  });

  filmCardcommentsTopCommented.forEach((element, index) => {
    element.addEventListener(`click`, () => {
      deletePopUp();
      renderElement(mainContent, createPopUpFilmDetails(twoMostCommentedFilms[index]), `beforeend`);

      changeFilmDetailVisibiltiy(comments, showingFilmsCount);
    });
  });
};

export const createMostCommentedFilm = (film) => {
  const {title, totalRating, date, runtime, genre, poster, description, comments} = film;

  return (`
    <article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${date}</span>
        <span class="film-card__duration">${runtime}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>
  `);
};
