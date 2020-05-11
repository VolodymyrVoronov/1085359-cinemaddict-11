// import MainMenuComponent from "../components/main-menu.js";

// import {render, replace} from "../utils/render.js";

// import {RenderPosition, FilterType} from "../const.js";

// export default class FilterController {
//   constructor(container, filmsModel) {
//     this._container = container;
//     this._filmsModel = filmsModel;

//     this._activeFilterType = FilterType.ALL;
//     this._mainMenuComponent = null;

//     this._onDataChange = this._onDataChange.bind(this);
//     this._onFilterChange = this._onFilterChange.bind(this);

//     this._filmsModel.setFilterChangeHandler(this._onDataChange);
//   }

//   render() {
//     const container = this._container;
//     const films = this._filmsModel.getFilms();
//     const main = this._container.querySelector(`.main`);
    
//     const oldComponent = this._mainMenuComponent;

//     this._mainMenuComponent = new MainMenuComponent(films);
//     // this._mainMenuComponent.setFilterTypeChangeHandler(this._onFilterChange);
//     render(main, this._mainMenuComponent.getElement(), RenderPosition.AFTERBEGIN);
    
//     let filteredFilms = [];

//     this._mainMenuComponent.setFilterTypeChangeHandler((filterType) => {
//       if (filterType === FilterType.ALL) {
//         filteredFilms = this._films.slice();
//         console.log(filteredFilms);
//       }
//       if (filterType === FilterType.WATCHLIST) {
//         filteredFilms = films.slice().filter(film => film.watchlist === true);
//         console.log(filteredFilms);
//       }
//       if (filterType === FilterType.HISTROY) {
//         filteredFilms = films.slice().filter(film => film.alreadyWatched === true);
//         console.log(filteredFilms);
//       }
//       if (filterType === FilterType.FAVORITES) {
//         filteredFilms = films.slice().filter(film => film.favorite === true);
//         console.log(filteredFilms);
//       }
//     });



//   }

//   _onFilterChange(filterType) {
//     this._filmsModel.setFilter(filterType);
//   }

//   _onDataChange() {
//     this.render();
//   }

// }
