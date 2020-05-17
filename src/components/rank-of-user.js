import AbstractComponent from "./abstract-component.js";
import {LevelOfRanksOfUser} from "../const.js";

const getRankOfUser = (rank) => {
  let rankOfUser;

  switch (true) {
    case rank <= LevelOfRanksOfUser.NOTHING_MAX:
      rankOfUser = ``;
      break;
    case rank <= LevelOfRanksOfUser.NOVICE_MAX:
      rankOfUser = `Novice`;
      break;
    case rank <= LevelOfRanksOfUser.FAN_MAX:
      rankOfUser = `Fan`;
      break;
    case rank >= LevelOfRanksOfUser.MOVIE_BUFF_MIN:
      rankOfUser = `Movie Buff`;
      break;
    default:
      rankOfUser = `There isn't any rank`;
  }
  return rankOfUser;
};

const createRankOfUser = (rank) => (`<section class="header__profile profile">
    <p class="profile__rating">${getRankOfUser(rank)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`);

export default class Rank extends AbstractComponent {
  constructor(rank) {
    super();
    this._rank = rank;
  }

  getTemplate() {
    return createRankOfUser(this._rank);
  }
}
