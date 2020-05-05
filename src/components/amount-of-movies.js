import AbstractComponent from "./abstract-component.js";

export const createAmountOfMovies = (amount) => (`<p>${amount} movies inside</p>`);

export default class AmountOfMoviesFilmComponent extends AbstractComponent {
  constructor(amount) {
    super();
    this._amount = amount;
  }

  getTemplate() {
    return createAmountOfMovies(this._amount);
  }
}

