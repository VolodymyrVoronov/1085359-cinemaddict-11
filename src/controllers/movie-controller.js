import CardOfFilmComponent from "../components/card-of-film.js";
import PopUpFilmDetailsComponent from "../components/pop-up-film-details.js";
// import CommentElementComponent from "../comments.js";

import {render, remove, replace} from "../utils/render.js";
import {ESC_KEY, RenderPosition} from "../const.js";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

const mainContent = document.querySelector(`.main`);

const CLICKABLE_ITEMS = [`.film-card__poster`, `.film-card__title`, `.film-card__comments`];

export default class MovieController {
  constructor(container, onDataChange, onViewChange, onCommentChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._onCommentChange = onCommentChange;

    this._mode = Mode.DEFAULT;
  }

  render(film) {
    const recentFilmComponent = this._filmCard;
    const recentPopupComponent = this._popUpFilmDetailsComponent;

    this._filmCard = new CardOfFilmComponent(film);
    this._popUpFilmDetailsComponent = new PopUpFilmDetailsComponent(film);

    this._filmCard.setWatchListButtonClickHandler((e) => {
      e.preventDefault();

      const newData = Object.assign({}, film, {
        watchlist: !film.watchlist,
      });

      this._onDataChange(this, newData, film);
    });

    this._filmCard.setWatchedButtonClickHandler((e) => {
      e.preventDefault();

      const newData = Object.assign({}, film, {
        alreadyWatched: !film.alreadyWatched,
      });

      this._onDataChange(this, newData, film);
    });

    this._filmCard.setFavoriteButtonClickHandler((e) => {
      e.preventDefault();

      const newData = Object.assign({}, film, {
        favorite: !film.favorite,
      });

      this._onDataChange(this, newData, film);
    });

    this._popUpFilmDetailsComponent.setWatchListButtonClickHandler((e) => {
      e.preventDefault();

      const newData = Object.assign({}, film, {
        watchlist: !film.watchlist,
      });

      this._mode = Mode.EDIT;

      this._onDataChange(this, newData, film);
    });

    this._popUpFilmDetailsComponent.setWatchedButtonClickHandler((e) => {
      e.preventDefault();

      const newData = Object.assign({}, film, {
        alreadyWatched: !film.alreadyWatched,
      });

      this._mode = Mode.EDIT;

      this._onDataChange(this, newData, film);
    });

    this._popUpFilmDetailsComponent.setFavoriteButtonClickHandler((e) => {
      e.preventDefault();

      const newData = Object.assign({}, film, {
        favorite: !film.favorite,
      });

      this._mode = Mode.EDIT;

      this._onDataChange(this, newData, film);
    });

    const onFilmCardClick = () => {

      const replaceableElement = mainContent.querySelector(`.film-details`);
      if (replaceableElement) {
        
        replaceableElement.remove();
        render(mainContent, this._popUpFilmDetailsComponent.getElement(), RenderPosition.BEFOREEND);
        this._popUpFilmDetailsComponent.renderCommentsBlock();

        this._popUpFilmDetailsComponent.setDeleteButtonClickHandler((e) => {
          e.preventDefault();
          
          const delBtn = e.target;
          const currentComment = delBtn.closest(`.film-details__comment`);
          const commentItems = this._popUpFilmDetailsComponent.getElement().querySelectorAll(`.film-details__comment`);
          const commentsList = Array.from(commentItems);
          const currentCommentIndex = commentsList.indexOf(currentComment);
          const comments = film.comments;
          console.log(currentCommentIndex);
          comments.splice(currentCommentIndex, 1);

          const newData = Object.assign({}, film, {
            comments,
          });

          this._onDataChange(this, newData, film);
          this._onCommentChange(this, newData, film);

          // const oldPopUp = mainContent.querySelector(`.film-details`);
          // oldPopUp.remove();
          // this._popUp = new PopUpFilmDetailsComponent(newData);
          
          // render(mainContent, this._popUp.getElement(), RenderPosition.BEFOREEND);
          // this._popUpFilmDetailsComponent.renderCommentsBlock();
        });

        this._popUpFilmDetailsComponent.setAddCommentHandler((e) => {
          const isCtrlandEnter = e.key === `Enter`;
    
          if (isCtrlandEnter) {
            const newComment = this._popUpFilmDetailsComponent.getCommentData();
            const newCommentsList = film.comments.concat(newComment);

            const newData = Object.assign({}, film, {
              comments: newCommentsList,
            });
    
            this._onDataChange(this, newData, film);
            this._onCommentChange(this, newData, film);
            
          }
        });

      } else {
        render(mainContent, this._popUpFilmDetailsComponent.getElement(), RenderPosition.BEFOREEND);
        this._popUpFilmDetailsComponent.renderCommentsBlock();

        this._popUpFilmDetailsComponent.setWatchListButtonClickHandler((e) => {
          e.preventDefault();

          const newData = Object.assign({}, film, {
            watchlist: !film.watchlist,
          });

          this._mode = Mode.EDIT;

          this._onDataChange(this, newData, film);
        });

        this._popUpFilmDetailsComponent.setWatchedButtonClickHandler((e) => {
          e.preventDefault();

          const newData = Object.assign({}, film, {
            alreadyWatched: !film.alreadyWatched,
          });

          this._mode = Mode.EDIT;

          this._onDataChange(this, newData, film);
        });

        this._popUpFilmDetailsComponent.setFavoriteButtonClickHandler((e) => {
          e.preventDefault();

          const newData = Object.assign({}, film, {
            favorite: !film.favorite,
          });

          this._mode = Mode.EDIT;

          this._onDataChange(this, newData, film);
        });


        this._popUpFilmDetailsComponent.setDeleteButtonClickHandler((e) => {
          e.preventDefault();
    
          const delBtn = e.target;
          const currentComment = delBtn.closest(`.film-details__comment`);
          const commentItems = this._popUpFilmDetailsComponent.getElement().querySelectorAll(`.film-details__comment`);
          const commentsList = Array.from(commentItems);
          const currentCommentIndex = commentsList.indexOf(currentComment);
          const comments = film.comments;
          
          comments.splice(currentCommentIndex, 1);

          const newData = Object.assign({}, film, {
            comments,
          });

          this._onDataChange(this, newData, film);
          this._onCommentChange(this, newData, film);
          

          // const oldPopUp = mainContent.querySelector(`.film-details`);
          // oldPopUp.remove();
          // this._popUp = new PopUpFilmDetailsComponent(newData);
          // render(mainContent, this._popUp.getElement(), RenderPosition.BEFOREEND);
          // this._popUpFilmDetailsComponent.renderCommentsBlock();
        });
    
        // this._popUpFilmDetailsComponent.setAddCommentHandler((e) => {
        //   const isCtrlandEnter = e.key === `Enter`;
    
        //   if (isCtrlandEnter) {
        //     const newComment = this._popUpFilmDetailsComponent.getCommentData();
        //     const newCommentsList = film.comments.concat(newComment);

        //     const newData = Object.assign({}, film, {
        //       comments: newCommentsList,
        //     });
    
        //     this._onDataChange(this, newData, film);
        //     this._onCommentChange(this, newData, film);
        //   }
        // });
      }

      const onEscKeyDown = (e) => {

        const isEscKey = e.key === ESC_KEY;

        if (isEscKey) {
          remove(this._popUpFilmDetailsComponent);
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      };

      this._popUpFilmDetailsComponent.setPopupCloseElementClickHandler(() => {
        remove(this._popUpFilmDetailsComponent);
      });

      // const closePopUpBtn = document.querySelector(`.film-details__close-btn`);
      // closePopUpBtn.addEventListener(`click`, () => {
      //   remove(this._popUpFilmDetailsComponent);
      // });

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
      this._popUpFilmDetailsComponent.renderCommentsBlock();

      this._popUpFilmDetailsComponent.setPopupCloseElementClickHandler(() => {
        remove(this._popUpFilmDetailsComponent);
      });
      

      // const closePopUpBtn = document.querySelector(`.film-details__close-btn`);
      // closePopUpBtn.addEventListener(`click`, () => {
      //   remove(this._popUpFilmDetailsComponent);
      // });
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
}
