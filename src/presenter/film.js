import FilmCardView from "../view/film-card.js";
import FilmPopupView from "../view/film-popup.js";
import {Mode} from "../const";
import {render, remove} from "../utils/render";

const {DEFAULT, POPUP} = Mode;

const body = document.querySelector(`body`);

export default class Film {
  constructor(filmContainer, onChangeMode = () => {}) {
    this._filmContainer = filmContainer;
    this._filmPopupContainer = body;
    this._onChangeMode = onChangeMode;

    this._filmCardComponent = null;
    this._filmPopupComponent = null;
    this._mode = DEFAULT;

    this._handleFilmDetailsClick = this._handleFilmDetailsClick.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(film) {
    this._film = film;
    this._isPopUpReOpened = false;

    this._filmCardComponent = new FilmCardView(film);
    this._filmPopupComponent = new FilmPopupView(film);

    this._filmCardComponent.setFilmDetailsClickHandler(this._handleFilmDetailsClick);
    this._filmPopupComponent.setCloseButtonClickHandler(this._handleCloseButtonClick);

    render(this._filmContainer, this._filmCardComponent);
  }

  _openFilmPopup() {
    render(this._filmPopupContainer, this._filmPopupComponent);

    if (this._isFilmPopupReOpened) {
      this._filmPopupComponent.restoreHandlers();
    }

    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._onChangeMode();
    this._mode = POPUP;
  }

  _closeFilmPopup() {
    this._isPopUpReOpened = false;
    remove(this._filmPopupComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = DEFAULT;
  }

  _handleFilmDetailsClick() {
    this._openFilmPopup();
  }

  _handleCloseButtonClick() {
    this._closeFilmPopup();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closeFilmPopup();
    }
  }
}
