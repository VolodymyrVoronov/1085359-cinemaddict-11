import AbstractComponent from "./abstract-component.js";

const createBtnShowMore = () => (`<button class="films-list__show-more">Show more</button>`);

export default class BtnShowMoreComponent extends AbstractComponent {
  getTemplate() {
    return createBtnShowMore();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
