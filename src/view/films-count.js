import {createElement} from "../utils.js";

const createFilmsCountTemplate = (filmsCount) => {
  return (
    `<p>${filmsCount.toLocaleString()} movies inside</p>`
  );
};

export default class FilmsCount {
  constructor(filmsCount) {
    this._filmsCount = filmsCount;
    this._element = null;
  }

  getTemplate() {
    return createFilmsCountTemplate(this._filmsCount);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
