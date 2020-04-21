import {createElement} from "../utils.js";

const createBtnShowMore = () => (`<button class="films-list__show-more">Show more</button>`);

export default class BtnShowMoreComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createBtnShowMore();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
