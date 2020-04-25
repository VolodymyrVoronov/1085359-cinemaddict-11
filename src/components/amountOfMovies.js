// import {createElement} from "../utils.js";
import AbstractComponent from "./abstractComponent.js";

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

