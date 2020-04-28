import AbstractComponent from "./abstractComponent.js";
import {SortType} from "../const.js";

const createSortingFilms = () => (`<ul class="sort">
  <li><a href="#" class="sort__button sort__button--active" data-sort-type=${SortType.DEFAULT}>Sort by  default</a></li>
  <li><a href="#" class="sort__button" data-sort-type=${SortType.DATE}>Sort by date</a></li>
  <li><a href="#" class="sort__button" data-sort-type=${SortType.RATING}>Sort by rating</a></li>
  </ul>
`);

export default class SortingFilmsComponent extends AbstractComponent {
  getTemplate() {
    return createSortingFilms();
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (e) => {
      e.preventDefault();

      const target = e.target;
      const sortType = e.target.dataset.sortType;
      const nearbyElements = Array.from(target.parentNode.parentNode.children);
      if (target.tagName !== `A`) {
        return;
      }

      if (this._currentSortType === sortType) {
        return;
      }

      nearbyElements.forEach((element) => element.firstElementChild.classList.remove(`sort__button--active`));

      this._currentSortType = sortType;

      target.classList.add(`sort__button--active`);

      handler(this._currentSortType);
    });
  }
}
