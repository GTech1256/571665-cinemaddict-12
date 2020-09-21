import Abstract from "./abstract.js";

const createFilmsContainerTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};

export default class Films extends Abstract {
  getTemplate() {
    return createFilmsContainerTemplate();
  }
}
