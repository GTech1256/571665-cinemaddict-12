import Abstract from "./abstract.js";

const createFilmsCountTemplate = (filmsCount) => {
  return (
    `<p>${filmsCount.toLocaleString()} movies inside</p>`
  );
};

export default class FilmsCount extends Abstract {
  constructor(filmsCount) {
    super();
    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return createFilmsCountTemplate(this._filmsCount);
  }
}
