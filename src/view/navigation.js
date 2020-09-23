import Abstract from "./abstract.js";

const ALL_FILTER_NAME = `ALL_FILTER_NAME`;

const activeFilterName = ALL_FILTER_NAME;

const getNavigationItemTemplate = ({name, count}, isAcive = false) => (
  `<a
    href="#${name}"
    class="main-navigation__item"
  >
    ${name}
    <span
      class="main-navigation__item-count ${isAcive ? `main-navigation__item--active` : ``}"
    >
      ${count}
    </span>
  </a>`
);

const createNavigationTemplate = (filters) => {
  const isActiveAllFilter = activeFilterName === ALL_FILTER_NAME;

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item ${isActiveAllFilter ? `main-navigation__item--active` : ``}">All movies</a>
        ${filters
          .map((filter) => getNavigationItemTemplate(filter, activeFilterName === filter.name))
          .join(``)}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Navigation extends Abstract {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createNavigationTemplate(this._filters);
  }
}
