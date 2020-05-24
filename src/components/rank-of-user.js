import AbstractSmartComponent from "./abstract-smart-component";
import {LevelOfRanksOfUser} from "../const.js";

const RankOfUser = {
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIE_BUFF: `Movie Buff`,
  NO_RANK: `There isn't any rank`
};

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
  constructor(films) {
    super();
    this.films = films;
  }

  getTemplate() {
    return createRankOfUser(this.getRankOfUser());
  }

  rerender() {
    super.rerender();
  }

  getRankOfUser() {
    const amountOfWatchedFilms = getAmountOfWatchedFilms(this.films);
    let rankOfUser;
    switch (true) {
      case amountOfWatchedFilms <= LevelOfRanksOfUser.NOTHING_MAX:
        rankOfUser = ``;
        break;
      case amountOfWatchedFilms <= LevelOfRanksOfUser.NOVICE_MAX:
        rankOfUser = RankOfUser.NOVICE;
        break;
      case amountOfWatchedFilms <= LevelOfRanksOfUser.FAN_MAX:
        rankOfUser = RankOfUser.FAN;
        break;
      case amountOfWatchedFilms >= LevelOfRanksOfUser.MOVIE_BUFF_MIN:
        rankOfUser = RankOfUser.MOVIE_BUFF;
        break;
      default:
        rankOfUser = RankOfUser.NO_RANK;
    }
    return rankOfUser;
  }
}
