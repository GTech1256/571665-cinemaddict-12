import MoviesModel from "../model/movies.js";
import CommentsModel from "../model/comments.js";

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

const {GET, PUT, POST, DELETE} = Method;
const {MIN, MAX} = SuccessHTTPStatusRange;

export default class Api {
  constructor(serverName, authorization) {
    this._serverName = serverName;
    this._authorization = authorization;
  }

  getMovies() {
    return this._load({url: `movies`})
      .then(Api.toJSON)
      .then((movies) => movies.map(MoviesModel.adaptToClient));
  }

  getComments(filmID) {
    return this._load({url: `comments/${filmID}`})
      .then(Api.toJSON)
      .then((comments) => comments.map(CommentsModel.adaptToClient));
  }

  updateMovie(movie) {
    return this._load({
      url: `movies/${movie.id}`,
      method: PUT,
      body: JSON.stringify(MoviesModel.adaptToServer(movie)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then(MoviesModel.adaptToClient);
  }

  addComment(comment, filmID) {
    return this._load({
      url: `comments/${filmID}`,
      method: POST,
      body: JSON.stringify(CommentsModel.adaptToServer(comment)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then((response) => response.comments.map(CommentsModel.adaptToClient));
  }

  deleteComment(comment) {
    return this._load({
      url: `comments/${comment.id}`,
      method: DELETE
    });
  }

  sync(data) {
    return this._load({
      url: `movies/sync`,
      method: POST,
      body: JSON.stringify(data),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON);
  }

  _load({
    url,
    method = GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._serverName}/${url}`, {method, body, headers})
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (response.status < MIN && response.status > MAX) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(error) {
    throw error;
  }
}
