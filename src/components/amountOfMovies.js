import {createElement} from "../utils.js";

export const createAmountOfMovies = (amount) => {
  return (`<p>${amount} movies inside</p>`);
};

export default class AmountOfMoviesFilmComponent {
  constructor(amount) {
    this._amount = amount;
    this._element = null;
  }

  getTemplate() {
    return createAmountOfMovies(this._amount);
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

