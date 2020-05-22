import Movie from "./models/movie.js";

const STATUS_CODE = {
  SUCCESS: 200,
  MULTIPLE: 300
}

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const getStatus = (response) => {
  if (response.status >= STATUS_CODE.SUCCESS&& response.status < STATUS_CODE.MULTIPLE) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class API {
  constructor(endPoint, auth) {
    this._endPoint = endPoint;
    this._auth = auth;
  }

  getFilms() {
    return this._load({url: `movies`})
      .then((response) => response.json())
      .then(Movie.parseMovies);
  }

  getComments(filmId) {
    return this._load({url: `comments/${filmId}`})
    .then(getStatus)
    .then((response) => response.json());
  }

  updateFilm(id, data) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(Movie.parseMovie);
  }

  deleteComment(id) {
    return this._load({
      url: `comments/${id}`,
      method: Method.DELETE
    });
  }

  createComment(comment, filmId) {
    return this._load({
      url: `comments/${filmId}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({"Content-type": `application/json`})
    })
    .then((response) => response.json())
    .then((data) => {
      return data.comments;
    });
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._auth);
    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(getStatus)
      .catch((err) => {
        throw err;
      });
  }
}
