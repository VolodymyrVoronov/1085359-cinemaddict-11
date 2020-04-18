import {createElement} from "../utils.js";

const btnShowMore = () => {
  return (`<button class="films-list__show-more">Show more</button>`);
};

export default class BtnShowMoreComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return btnShowMore();
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
