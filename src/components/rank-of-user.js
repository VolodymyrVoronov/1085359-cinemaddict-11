import AbstractSmartComponent from "./abstract-smart-component";
import {LevelOfRanksOfUser} from "../const.js";

const getAmountOfWatchedFilms = (films) => {
  return films.reduce((accumulator, current) => {
    return accumulator + current.alreadyWatched;
  }, 0);
};

const createRankOfUser = (profileRating) => (`<section class="header__profile profile">
    <p class="profile__rating">${profileRating}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`);

export default class Rank extends AbstractSmartComponent {
  constructor(filmsModel) {
    super();
    this._filmsModel = filmsModel;
  }

  getTemplate() {
    return createRankOfUser(this.getRankOfUser());
  }

  rerender() {
    super.rerender();
  }

  getRankOfUser() {
    const amountOfWatchedFilms = getAmountOfWatchedFilms(this._filmsModel.getFilms());
    let rankOfUser;
    switch (true) {
      case amountOfWatchedFilms <= LevelOfRanksOfUser.NOTHING_MAX:
        rankOfUser = ``;
        break;
      case amountOfWatchedFilms <= LevelOfRanksOfUser.NOVICE_MAX:
        rankOfUser = `Novice`;
        break;
      case amountOfWatchedFilms <= LevelOfRanksOfUser.FAN_MAX:
        rankOfUser = `Fan`;
        break;
      case amountOfWatchedFilms >= LevelOfRanksOfUser.MOVIE_BUFF_MIN:
        rankOfUser = `Movie Buff`;
        break;
      default:
        rankOfUser = `There isn't any rank`;
    }
    return rankOfUser;
  }
}
