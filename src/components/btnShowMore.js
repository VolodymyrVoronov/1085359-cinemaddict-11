// import {createElement} from "../utils.js";
import AbstractComponent from "./abstractComponent.js";

const createBtnShowMore = () => (`<button class="films-list__show-more">Show more</button>`);

export default class BtnShowMoreComponent extends AbstractComponent {
  getTemplate() {
    return createBtnShowMore();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
