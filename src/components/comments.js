import moment from "moment";
import AbstractComponent from "./abstract-component.js";

const getAgeOfComment = (date) => {
  return moment(date).fromNow();
};

const createCommentElement = (comment) => {
  const {smile, text, author, day} = comment;
  return (`<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${smile}" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${getAgeOfComment(day)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`);
};

export default class CommentElementComponent extends AbstractComponent {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  getTemplate() {
    return createCommentElement(this._comment);
  }
}
