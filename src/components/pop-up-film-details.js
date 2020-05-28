import moment from "moment";
import {encode} from "he";
import AbstractSmartComponent from "./abstract-smart-component.js";
import CommentElementComponent from "./comments.js";

import {createElement, render, remove} from "../utils/render.js";
import {getDateOfFilmProduction, getFilmDuration} from "../utils/common.js";

import {RenderPosition} from "../const.js";

const isChecked = (statement) => {
  return statement ? `checked` : ``;
};

const getSmile = (emoji) => {
  return (`<img src="images/emoji/${emoji}.png" width="55" height="55" alt="${emoji}">`);
};

const createPopUpFilmDetails = (film) => {

  const {
    id,
    poster,
    rating,
    title,
    alternativeTitle,
    ageRating,
    director,
    writers,
    actors,
    releaseDate,
    country,
    duration,
    genre,
    description,
    watchlist,
    alreadyWatched,
    favorite
  } = film;

  const writersDetails = writers.join(`, `);
  const actorsDetails = actors.join(`, `);

  return (`<section class="film-details" data-id="${id}">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${poster}" alt="">
            <p class="film-details__age">${ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writersDetails}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actorsDetails}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${getDateOfFilmProduction(releaseDate)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${getFilmDuration(duration)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
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
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comments.length}</span></h3>

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
                <img src="./images/emoji/smile.png" width="30" height="30" alt="angry" data-emoji-mood="smile">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="sleeping" data-emoji-mood="sleeping">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="puke" data-emoji-mood="puke">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="angry" data-emoji-mood="angry">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`);
};

export default class PopUpFilmDetailsComponent extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;

    this._closeClickHandler = null;
    this._watchListButtonClickHandler = null;
    this._watchedButtonClickHandler = null;
    this._favoriteButtonClickHandler = null;
    this._deleteButtonClickHandler = null;

    this._setListenerOnSmiles();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createPopUpFilmDetails(this._film);
  }

  renderCommentsBlock(comments) {
    const commentBlock = document.querySelector(`.film-details__comments-list`);
    comments.forEach((comment) => render(commentBlock, new CommentElementComponent(comment).getElement(), RenderPosition.BEFOREEND));
  }

  _setListenerOnSmiles() {
    const emojiLabel = this.getElement().querySelector(`.film-details__add-emoji-label`);
    this.getElement().querySelectorAll(`.film-details__emoji-label`).forEach((element) => {
      element.addEventListener(`click`, (e) => {
        const emoji = createElement(getSmile(e.target.dataset.emojiMood));

        if (emojiLabel.children.length) {
          emojiLabel.children[0].remove();
        }

        emojiLabel.appendChild(emoji);
      });
    });
  }

  setPopupCloseElementClickHandler(handler) {
    this.getElement()
        .querySelector(`.film-details__close-btn`)
        .addEventListener(`click`, handler);
    this._closeClickHandler = handler;
  }

  setWatchListButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, handler);
    this._watchListButtonClickHandler = handler;
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, handler);
    this._watchedButtonClickHandler = handler;
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, handler);
    this._favoriteButtonClickHandler = handler;
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  _subscribeOnEvents() {
    this.setPopupCloseElementClickHandler(this._closeClickHandler);
    this.setWatchListButtonClickHandler(this._watchListButtonClickHandler);
    this.setWatchedButtonClickHandler(this._watchedButtonClickHandler);
    this.setFavoriteButtonClickHandler(this._favoriteButtonClickHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
  }

  rerender() {
    super.rerender();
    remove(this);
    this.recoveryListeners();
  }

  showErrorBorder() {
    this.getElement().querySelector(`.film-details__comment-input`).style.border = `2px solid red`;
  }

  showNormalBorder() {
    this.getElement().querySelector(`.film-details__comment-input`).style.border = `none`;
  }

  setDeleteButtonClickHandler(handler) {
    const delBtns = this.getElement().querySelectorAll(`.film-details__comment-delete`);
    delBtns.forEach((button) => {
      button.addEventListener(`click`, handler);
      this._deleteButtonClickHandler = handler;
    });
  }

  setAddCommentHandler(handler) {
    const commentField = this.getElement().querySelector(`.film-details__comment-input`);
    commentField.addEventListener(`keydown`, handler);
  }

  getCommentData() {
    const emojiElement = this.getElement().querySelector(`.film-details__add-emoji-label`).
    firstElementChild;

    const emojiName = emojiElement ? emojiElement.src.split(`/`, 6)[5] : ``;

    const comment = encode(this.getElement().querySelector(`.film-details__comment-input`).value);
    const date = moment().format();
    let emotion = emojiElement ? emojiName : ``;

    return {
      id: Math.floor(Math.random() * 100) + ``,
      author: `User`,
      emotion: `${emotion.split(`.`, 2)[0]}`,
      comment,
      date,
    };
  }

  removeAllCommentData() {
    const comment = this.getElement().querySelector(`.film-details__comment-input`);
    comment.value = ``;
    const emoji = this.getElement().querySelector(`.film-details__add-emoji-label`).firstElementChild;

    if (emoji) {
      emoji.remove();
    }
  }
}
