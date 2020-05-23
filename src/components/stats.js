import AbstractSmartComponent from "./abstract-smart-component.js";

import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {StaticticsTimeInterval, GENRE_OF_FILMS, FilterType} from '../const.js';

const NUMBER_BEST_GENRE = 0;

const getFilmsByFilter = (films, filterType) => {
  if (filterType === FilterType.FAVORITES) {
    films.filter((filmsToSort) => filmsToSort.favorite);
  }
  if (filterType === FilterType.HISTORY) {
    films.filter((filmsToSort) => filmsToSort.alreadyWatched);
  }
  if (filterType === FilterType.WATCHLIST) {
    films.filter((filmsToSort) => filmsToSort.watchlist);
  }

  return films;
};

const getDateFrom = (activeIntervalType) => {
  let dateFrom = new Date(0);
  const dateTo = new Date();

  if (activeIntervalType === StaticticsTimeInterval.ALL) {
    dateFrom = new Date(0);
  }
  if (activeIntervalType === StaticticsTimeInterval.MONTH) {
    dateFrom = dateTo.setMonth(dateTo.getMonth() - 1);
  }
  if (activeIntervalType === StaticticsTimeInterval.TODAY) {
    dateFrom = dateTo.setDate(dateTo.getDate() - 1);
  }
  if (activeIntervalType === StaticticsTimeInterval.WEEK) {
    dateFrom = dateTo.setDate(dateTo.getDate() - 7);
  }
  if (activeIntervalType === StaticticsTimeInterval.YEAR) {
    dateFrom = dateTo.setFullYear(dateTo.getFullYear() - 1);
  }

  return dateFrom;
};

const getTimeWatchedMovies = (films) => {
  return films.reduce((accumulator, current) => {
    accumulator = accumulator + current.duration;
    return accumulator;
  }, 0);
};

const getCountGenre = (films, genreItem) => {
  return films.reduce((accumulator, current) => {
    accumulator = accumulator + current.genre.some((genreFilm) => genreFilm === genreItem);
    return accumulator;
  }, 0);

};

const rankMovies = (watchedMovies) => Object.values(GENRE_OF_FILMS).map((genreItem) => {
  return {
    genre: genreItem,
    count: getCountGenre(watchedMovies, genreItem),
  };
});

const sortMovies = (rankedMovies) => rankedMovies.sort((a, b) => b.count - a.count);

const getFilmByTime = (films, dateFrom) => {
  return films.filter((filmsToSort) => filmsToSort.watchingDate >= new Date(dateFrom));
};

const renderStatsChart = (canvasContainer, films) => {
  const BAR_HEIGHT = 50;

  const nameOfMoviesSortedByRank = films.map((sortedRankedMovie) => sortedRankedMovie.genre);
  const countOfMoviesSortedByRank = films.map((sortedRankedMovie) => sortedRankedMovie.count);

  canvasContainer.height = BAR_HEIGHT * films.length;

  return new Chart(canvasContainer, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: nameOfMoviesSortedByRank,
      datasets: [{
        data: countOfMoviesSortedByRank,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`,
        barThickness: 24
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const getTotalDurationOfFilms = (minutes) => {
  const hour = Math.floor(minutes / 60);
  const minute = minutes - 60 * hour;
  return [hour, minute];
};

const createStatsMarkup = (timeInterval, isChecked) => {
  const timeIntervalMarkup = timeInterval.toLowerCase().replace(/-/g, ` `);
  const timeIntervalLabel = timeIntervalMarkup[0].toUpperCase() + timeInterval.slice(1);

  return (
    `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${timeInterval}" value="${timeInterval}" ${isChecked ? `checked` : ``}>
        <label for="statistic-${timeInterval}" class="statistic__filters-label">${timeIntervalLabel}</label>`
  );
};

const createStats = (films, activeIntervalType, topFilmsGenre) => {

  const statsMarkup = Object.values(StaticticsTimeInterval).map((timeInterval) => createStatsMarkup(timeInterval, timeInterval === activeIntervalType)).join(`\n`);
  const timeWatchedMovies = getTimeWatchedMovies(films);
  const [hours, minutes] = getTotalDurationOfFilms(timeWatchedMovies);

  return (`<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">Sci-Fighter</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
      ${statsMarkup}
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${films.length} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${hours} <span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topFilmsGenre}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`);
};

export default class Stats extends AbstractSmartComponent {
  constructor(filmsModel) {
    super();

    this._filmsModel = filmsModel;
    this._dateFrom = new Date(0);
    this._films = this._filmsModel.getFilms();

    this._statisticChart = null;
    this._topFilmsGenre = ``;
    this._activeIntervalType = StaticticsTimeInterval.ALL;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createStats(this._films, this._activeIntervalType, this._topFilmsGenre);
  }

  show() {
    super.show();
    this._films = this._filmsModel.getFilms();

    this._films = getFilmsByFilter(this._films, FilterType.HISTORY);
    this._films = getFilmByTime(this._films, this._dateFrom);

    if (this._films.length === 0) {
      this._topFilmsGenre = ``;
      this._sortedRankedMoviesExisting = null;
      this._resetCharts();
    } else {
      const rankedMovies = rankMovies(this._films);
      const sortedRankedMovies = sortMovies(rankedMovies);
      this._sortedRankedMoviesExisting = sortedRankedMovies.filter((sortedRankedMovie) => sortedRankedMovie.count > 0);
      this._topFilmsGenre = sortedRankedMovies[NUMBER_BEST_GENRE].genre;
    }

    this.rerender();
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
    this._renderCharts();
  }

  _renderCharts() {
    if (this._sortedRankedMoviesExisting) {
      const element = this.getElement();
      const statisticCtx = element.querySelector(`.statistic__chart`);
      this._statisticChart = renderStatsChart(statisticCtx, this._sortedRankedMoviesExisting);
    }
  }

  _resetCharts() {
    if (this._statisticChart) {
      this._statisticChart.destroy();
      this._statisticChart = null;
    }
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    const STATS_ID_PREFIX = `statistic-`;

    const getFilterNameById = (id) => {
      return id.substring(STATS_ID_PREFIX.length);
    };

    element.querySelector(`.statistic__filters`).addEventListener(`click`, (e) => {
      const target = e.target;
      if (target && target.id) {
        this._activeIntervalType = getFilterNameById(target.id);
        this._dateFrom = getDateFrom(this._activeIntervalType);

        this.show();
      }
    });
  }
}
