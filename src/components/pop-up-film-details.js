// import AbstractComponent from "./abstract-component.js";
import moment from "moment";
import AbstractSmartComponent from "./abstract-smart-component.js";

import CommentElementComponent from "./comments.js";

import {createElement, render} from "../utils/render.js";
import {generateComments} from "../mock/generateComments.js";
import {FILM, RenderPosition} from "../const.js";

const comments = generateComments(FILM.MAX_COMMENTS);

const getDateOfFilmProduction = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

const getFilmDuration = (duration) => {
  const hours = duration / 60 ^ 0;
  if (hours) {
    let minutes = duration % 60;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}h ${minutes}m`;
  } else {
    return `${duration}m`;
  }
};

const isChecked = (statement) => {
  return statement ? `checked` : ``;
};

const createPopUpFilmDetails = (film) => {
  const {poster, totalRating, title, alternativeTitle, ageRating, director, writers, actors, date, releaseCountry, runtime, genre, description, watchlist, alreadyWatched, favorite} = film;

  return (`<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./${poster}" alt="">
            <p class="film-details__age">${ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${totalRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${getDateOfFilmProduction(date)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${getFilmDuration(runtime)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  <span class="film-details__genre">${genre}</span>
                  <span class="film-details__genre"></span>
                  <span class="film-details__genre"></span></td>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isChecked(watchlist)}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isChecked(alreadyWatched)}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isChecked(favorite)}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>

      <div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>

          <ul class="film-details__comments-list">
            
          </ul>

          <div class="film-details__new-comment">
            <div for="add-emoji" class="film-details__add-emoji-label"></div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji" data-emoji-mood="smile">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji" data-emoji-mood="sleeping">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji" data-emoji-mood="puke">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji" data-emoji-mood="angry">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`);
};

const getSmile = (emoji) => {
  return (`<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji">`);
};

export default class PopUpFilmDetailsComponent extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;

    this._setListenerOnSmiles();
  }

  getTemplate() {
    return createPopUpFilmDetails(this._film);
  }

  renderCommentsBlock() {
    const commentBlock = document.querySelector(`.film-details__comments-list`);
    comments.forEach((comment) => render(commentBlock, new CommentElementComponent(comment).getElement(), RenderPosition.BEFOREEND));
  }

  _setListenerOnSmiles() {
    const emojiLabel = this.getElement().querySelector(`.film-details__add-emoji-label`);
    this.getElement().querySelectorAll(`.film-details__emoji-label`).forEach((element) => {
      element.addEventListener(`click`, (e) => {
        const target = e.target;
        const emojiMood = target.dataset.emojiMood;
        const emoji = createElement(getSmile(emojiMood));

        if (emojiLabel.children.length) {
          emojiLabel.children[0].remove();
        }

        emojiLabel.appendChild(emoji);
      });
    });
  }

  setWatchListButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, handler);
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }
}
