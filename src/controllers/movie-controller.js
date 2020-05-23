import CardOfFilmComponent from "../components/card-of-film.js";
import PopUpFilmDetailsComponent from "../components/pop-up-film-details.js";

import {render, remove, replace} from "../utils/render.js";
import {ESC_KEY, RenderPosition} from "../const.js";

import MovieModel from "../models/movie.js";

const TIMEOUT_DURATION = 300;
const SHAKE_ANIMATION_TIMEOUT = 1500;
const DIVIDER = 500;

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

const mainContent = document.querySelector(`.main`);

const CLICKABLE_ITEMS = [`.film-card__poster`, `.film-card__title`, `.film-card__comments`];

export default class MovieController {
  constructor(container, onDataChange, onViewChange, api, filmsModel) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._api = api;
    this._filmsModel = filmsModel;

    this._mode = Mode.DEFAULT;
  }

  render(film) {
    const recentFilmComponent = this._filmCard;
    const recentPopupComponent = this._popUpFilmDetailsComponent;

    this._filmCard = new CardOfFilmComponent(film);
    this._popUpFilmDetailsComponent = new PopUpFilmDetailsComponent(film);

    this._filmCard.setWatchListButtonClickHandler((e) => {
      e.preventDefault();

      const newFilm = MovieModel.clone(film);
      newFilm.watchlist = !film.watchlist;

      this._onDataChange(this, newFilm, film);
    });

    this._filmCard.setWatchedButtonClickHandler((e) => {
      e.preventDefault();

      const newFilm = MovieModel.clone(film);
      newFilm.alreadyWatched = !film.alreadyWatched;

      this._onDataChange(this, newFilm, film);
    });

    this._filmCard.setFavoriteButtonClickHandler((e) => {
      e.preventDefault();

      const newFilm = MovieModel.clone(film);
      newFilm.favorite = !film.favorite;

      this._onDataChange(this, newFilm, film);
    });

    this._popUpFilmDetailsComponent.setWatchListButtonClickHandler((e) => {
      e.preventDefault();
      this._mode = Mode.EDIT;
      const newFilm = MovieModel.clone(film);
      newFilm.watchlist = !film.watchlist;

      this._onDataChange(this, newFilm, film);
    });

    this._popUpFilmDetailsComponent.setWatchedButtonClickHandler((e) => {
      e.preventDefault();
      this._mode = Mode.EDIT;
      const newFilm = MovieModel.clone(film);
      newFilm.alreadyWatched = !film.alreadyWatched;

      this._onDataChange(this, newFilm, film);
    });

    this._popUpFilmDetailsComponent.setFavoriteButtonClickHandler((e) => {
      e.preventDefault();
      this._mode = Mode.EDIT;
      const newFilm = MovieModel.clone(film);
      newFilm.favorite = !film.favorite;

      this._onDataChange(this, newFilm, film);
    });

    const setTimeOutToClickOnCardFilm = () => {
      setTimeout(() => {
        onFilmCardClick();
      }, TIMEOUT_DURATION);
    };

    const onFilmCardClick = () => {

      const replaceableElement = mainContent.querySelector(`.film-details`);

      if (replaceableElement) {
        replaceableElement.remove();
        render(mainContent, this._popUpFilmDetailsComponent.getElement(), RenderPosition.BEFOREEND);

        this._api.getComments(film.id)
          .then((comments) => {
            this._popUpFilmDetailsComponent.renderCommentsBlock(comments);

            this._popUpFilmDetailsComponent.setDeleteButtonClickHandler((e) => {
              e.preventDefault();
              const target = e.target;
              const idOfComment = e.target.closest(`.film-details__comment`).id;

              const delBtn = target;

              delBtn.innerHTML = `Deleting...`;
              delBtn.disabled = true;

              this._api.deleteComment(idOfComment)
                .then(() => {

                  const newFilm = MovieModel.clone(film);
                  newFilm.comments = film.comments;
                  this._filmsModel.updateFilm(film.id, newFilm);

                  this._onDataChange(this, newFilm, film);

                  const recentElement = mainContent.querySelector(`.film-details`);
                  recentElement.remove();
                  setTimeOutToClickOnCardFilm();
                });
            });
          });

        this._popUpFilmDetailsComponent.setAddCommentHandler((e) => {
          const isPushCtrlandEnter = e.key === `Enter` && (e.ctrlKey || e.metaKey);

          if (isPushCtrlandEnter) {
            const idOfPopUp = document.querySelector(`.film-details`);
            const newComment = this._popUpFilmDetailsComponent.getCommentData();
            const newCommentsList = film.comments.concat(newComment);

            const textArea = e.target;
            textArea.disabled = true;

            this._api.createComment(newComment, idOfPopUp.dataset.id)
              .then((data) => {
                this._popUpFilmDetailsComponent.showNormalBorder();
                this._filmsModel.updateFilm(this.id, data.movie);
                this._onDataChange(this, film, Object.assign({}, film, {
                  comments: newCommentsList,
                }));
              })
              .catch(() => {
                textArea.disabled = false;
                this._popUpFilmDetailsComponent.showErrorBorder();
                this.shake();
              });
            setTimeOutToClickOnCardFilm();
          }
        });

      } else {
        render(mainContent, this._popUpFilmDetailsComponent.getElement(), RenderPosition.BEFOREEND);

        this._api.getComments(film.id)
          .then((comments) => {

            this._popUpFilmDetailsComponent.renderCommentsBlock(comments);
            this._popUpFilmDetailsComponent.setDeleteButtonClickHandler((e) => {
              e.preventDefault();
              const target = e.target;
              const idOfComment = e.target.closest(`.film-details__comment`).id;

              const delBtn = target;

              delBtn.innerHTML = `Deleting...`;
              delBtn.disabled = true;

              this._api.deleteComment(idOfComment)
                .then(() => {
                  const newFilm = MovieModel.clone(film);
                  newFilm.comments = film.comments;
                  this._filmsModel.updateFilm(film.id, newFilm);
                  this._onDataChange(this, newFilm, film);
                  const listOfComments = document.querySelector(`.film-details__comments-list`);
                  listOfComments.remove();
                  const recentElement = mainContent.querySelector(`.film-details`);
                  recentElement.remove();
                  setTimeOutToClickOnCardFilm();
                });
            });
          });

        this._popUpFilmDetailsComponent.setWatchListButtonClickHandler((e) => {
          e.preventDefault();
          this._mode = Mode.EDIT;
          const newFilm = MovieModel.clone(film);
          newFilm.watchlist = !film.watchlist;

          this._onDataChange(this, newFilm, film);
        });

        this._popUpFilmDetailsComponent.setWatchedButtonClickHandler((e) => {
          e.preventDefault();
          this._mode = Mode.EDIT;
          const newFilm = MovieModel.clone(film);
          newFilm.alreadyWatched = !film.alreadyWatched;

          this._onDataChange(this, newFilm, film);
        });

        this._popUpFilmDetailsComponent.setFavoriteButtonClickHandler((e) => {
          e.preventDefault();
          this._mode = Mode.EDIT;
          const newFilm = MovieModel.clone(film);
          newFilm.favorite = !film.favorite;

          this._onDataChange(this, newFilm, film);
        });

        this._popUpFilmDetailsComponent.setAddCommentHandler((e) => {
          const isPushCtrlandEnter = e.key === `Enter` && (e.ctrlKey || e.metaKey);

          if (isPushCtrlandEnter) {
            const idOfPopUp = document.querySelector(`.film-details`);
            const newComment = this._popUpFilmDetailsComponent.getCommentData();
            const newCommentsList = film.comments.concat(newComment);

            const textArea = e.target;
            textArea.disabled = true;

            this._api.createComment(newComment, idOfPopUp.dataset.id)
              .then((data) => {
                this._popUpFilmDetailsComponent.showNormalBorder();
                this._filmsModel.updateFilm(this.id, data.movie);
                this._onDataChange(this, film, Object.assign({}, film, {
                  comments: newCommentsList,
                }));
              })
              .catch(() => {
                textArea.disabled = false;
                this._popUpFilmDetailsComponent.showErrorBorder();
                this.shake();
              });
            setTimeOutToClickOnCardFilm();
          }
        });
      }

      const onEscKeyDown = (e) => {

        const isEscKey = e.key === ESC_KEY;

        if (isEscKey) {
          remove(this._popUpFilmDetailsComponent);
          document.removeEventListener(`keydown`, onEscKeyDown);
          this._popUpFilmDetailsComponent.removeAllCommentData();
        }
      };

      this._popUpFilmDetailsComponent.setPopupCloseElementClickHandler(() => {
        this._popUpFilmDetailsComponent.removeAllCommentData();
        remove(this._popUpFilmDetailsComponent);
      });

      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const setCardClickEventListeners = (clickableItems, card, handle) => {
      clickableItems.forEach((item) => {
        const clickableItem = card.getElement().querySelector(item);
        clickableItem.addEventListener(`click`, handle);
      });
    };

    setCardClickEventListeners(CLICKABLE_ITEMS, this._filmCard, onFilmCardClick);

    if (recentFilmComponent) {
      replace(this._container, this._filmCard.getElement(), recentFilmComponent.getElement());
    } else {
      render(this._container, this._filmCard.getElement(), RenderPosition.BEFOREEND);
    }

    if (recentPopupComponent && this._mode !== Mode.DEFAULT) {
      this._mode = Mode.DEFAULT;
      this._replacePopup(recentPopupComponent.getElement());

      this._api.getComments(film.id)
        .then((comments) => {
          this._popUpFilmDetailsComponent.renderCommentsBlock(comments);

          const oldPopUp = mainContent.querySelector(`.film-details`);
          oldPopUp.remove();
          render(mainContent, this._popUpFilmDetailsComponent.getElement(), RenderPosition.BEFOREEND);

          this._popUpFilmDetailsComponent.setAddCommentHandler((e) => {
            const isPushCtrlandEnter = e.key === `Enter` && (e.ctrlKey || e.metaKey);

            if (isPushCtrlandEnter) {
              const newComment = this._popUpFilmDetailsComponent.getCommentData();
              const newCommentsList = film.comments.concat(newComment);

              const newData = Object.assign({}, film, {
                comments: newCommentsList,
              });

              this._onDataChange(this, newData, film);
              onFilmCardClick();
            }
          });

          this._popUpFilmDetailsComponent.setPopupCloseElementClickHandler(() => {
            this._popUpFilmDetailsComponent.removeAllCommentData();
            remove(this._popUpFilmDetailsComponent);
          });
        });
    }
  }

  _replacePopup(replaceableElement) {
    this._onViewChange();
    replaceableElement.replaceWith(this._popUpFilmDetailsComponent.getElement());
    this._mode = Mode.DEFAULT;
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      const replaceableElement = mainContent.querySelector(`.main`);

      this._replacePopup(replaceableElement);
    }
  }

  destroy() {
    remove(this._popUpFilmDetailsComponent);
    remove(this._filmCard);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  shake() {
    this._popUpFilmDetailsComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / DIVIDER}s`;

    setTimeout(() => {
      this._popUpFilmDetailsComponent.getElement().style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}
