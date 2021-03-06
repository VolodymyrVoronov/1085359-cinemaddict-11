import moment from "moment";
import AbstractSmartComponent from "./abstract-smart-component.js";

const getAgeOfComment = (date) => {
  return moment(date).fromNow();
};

const createCommentElement = (commentFromServer) => {
  const {id, emotion, comment, author, date} = commentFromServer;
  return (`<li class="film-details__comment" id=${id}>
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${getAgeOfComment(date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`);
};

export default class CommentElementComponent extends AbstractSmartComponent {
  constructor(comment) {
    super();
    this._comment = comment;

    this._deleteButtonClickHandler = null;
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createCommentElement(this._comment);
  }

  _subscribeOnEvents() {
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
  }

  setDeleteButtonClickHandler(handler) {
    const delBtns = this.getElement().querySelectorAll(`.film-details__comment-delete`);
    delBtns.forEach((button) => {
      button.addEventListener(`click`, handler);

      this._deleteButtonClickHandler = handler;
    });
    this._deleteButtonClickHandler = handler;
  }
}
