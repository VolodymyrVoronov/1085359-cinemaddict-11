import CardOfFilmComponent from "../components/cardOfFilm.js";
import PopUpFilmDetailsComponent from "../components/popUpFilmDetails.js";
import CommentElementComponent from "../components/comments.js";

import {render, remove, replace} from "../utils/render.js";
import {FILM, ESC_KEY, RenderPosition, SortType} from "../const.js";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

const mainContent = document.querySelector(`.main`);

const deletePopUp = () => {
  const filmDetails = document.querySelector(`.film-details`);
  if (filmDetails) {
    filmDetails.remove();
  }
};


const changePopUpVisibility = (index, film, commentsArray) => {
  deletePopUp();
  
  // let newSortArray = [];
  // newSortArray = filmsArray.slice(0).filter((film) => {
  //   return film.id === +index;
  // });
  
  const popUpFilmDetailsComponent = new PopUpFilmDetailsComponent(film);
  render(mainContent, popUpFilmDetailsComponent.getElement(), RenderPosition.BEFOREEND);
  
    const onEscKeyDown = (e) => {
    
    const isEscKey = e.key === ESC_KEY;

    if (isEscKey) {
      remove(popUpFilmDetailsComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  document.addEventListener(`keydown`, onEscKeyDown);

  const closePopUpBtn = document.querySelector(`.film-details__close-btn`);
  closePopUpBtn.addEventListener(`click`, () => {
    remove(popUpFilmDetailsComponent);
  });
  
  const commentBlock = document.querySelector(`.film-details__comments-list`);
  commentsArray.forEach((comment) => render(commentBlock, new CommentElementComponent(comment).getElement(), RenderPosition.BEFOREEND));

};

const setUpListenerToShowPopUpFilmDetails = (film, commentsArray) => {
  let films = [];
  films.push(film)
  console.log(films);
  
  mainContent.addEventListener(`click`, (e) => {
    let dataIdOfFilmCard = e.target.parentElement.getAttribute(`data-id`);
    
    if (e.target.classList.contains(`film-card__poster`) ||
        e.target.classList.contains(`film-card__title`) ||
        e.target.classList.contains(`film-card__comments`)) {
      changePopUpVisibility(dataIdOfFilmCard, film, commentsArray);
    }
  });

  
  // film.addEventListener(`click`, (e) => {
  //   let dataIdOfFilmCard = e.target.parentElement.getAttribute(`data-id`);
    
  //   if (e.target.classList.contains(`film-card__poster`) ||
  //       e.target.classList.contains(`film-card__title`) ||
  //       e.target.classList.contains(`film-card__comments`)) {
  //     changePopUpVisibility(dataIdOfFilmCard, film, commentsArray);
  //   }
  // });
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._recentPopupComponent = null;
  }

  render(film, comments) {
    const recentFilmComponent = this._filmCard;
    const recentPopupComponent = this._popUpFilmDetailsComponent;

    
    
    this._filmCard = new CardOfFilmComponent(film);
    this._popUpFilmDetailsComponent = new PopUpFilmDetailsComponent(film);

    // render(this._container, this._filmCard.getElement(), RenderPosition.BEFOREEND);
    

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

    setUpListenerToShowPopUpFilmDetails(film, comments);
    

    if (recentFilmComponent) {
      console.log(`true`);
      replace(this._container, this._filmCard.getElement(), recentFilmComponent.getElement());
    } else {
      render(this._container, this._filmCard.getElement(), RenderPosition.BEFOREEND);
      console.log(`false`);
    }

    if (recentPopupComponent) {
      console.log(`true`);
      replace(mainContent, this._popUpFilmDetailsComponent.getElement(), recentPopupComponent.getElement());
    } else {
      render(mainContent, this._popUpFilmDetailsComponent.getElement(), RenderPosition.BEFOREEND);
      console.log(`false`);
    }

    // if (recentPopupComponent && this._mode !== Mode.DEFAULT) {
    //   this._mode = Mode.DEFAULT;
    //   this._replacePopup(recentPopupComponent.getElement());
    // }
  }
  

  _replacePopup(replaceableElement) {
    this._onViewChange();
    replace(this._container, this._filmPopup.getElement(), replaceableElement);
    // this._popUpFilmDetailsComponent.renderFormElement();
    this._mode = Mode.DEFAULT;
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      console.log(`true`);
      const replaceableElement = this._container.querySelector(`.main`);
      
      this._replacePopup(replaceableElement);
    }
  }
}