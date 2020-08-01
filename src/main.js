import {createUserRankTemplate} from "./view/user-rank";
import {createNavigationTemplate} from "./view/navigation";
import {createSortTemplate} from "./view/sort";
import {createFilmCardTemplate} from "./view/film-card";
import {createFilmsContainerTemplate} from "./view/film-container";
// import {createFilmInfoPopupTemplate} from "./view/film-info-popup";
import {createFilmsListTemplate} from "./view/films-list";
import {createShowMoreButtonTemplate} from "./view/show-more-button";
import {createFilmsTopRatedListTemplate} from "./view/films-top-rated-list";
import {createFilmsMostCommentedListTemplate} from "./view/films-most-commented-list";
import {createFilmsCountTemplate} from "./view/films-count";

const FILM_CARDS_COUNT = 5;
const FILM_TOP_RATED_CARDS_COUNT = 2;
const FILM_MOST_COMMENTED_CARDS_COUNT = 2;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterStatisticsElement = document.querySelector(`.footer__statistics`);

render(siteHeaderElement, createUserRankTemplate());
render(siteMainElement, createNavigationTemplate());
render(siteMainElement, createSortTemplate());
render(siteMainElement, createFilmsContainerTemplate());
render(siteFooterStatisticsElement, createFilmsCountTemplate());

const filmsContainerElement = siteMainElement.querySelector(`.films`);
render(filmsContainerElement, createFilmsListTemplate());
render(filmsContainerElement, createFilmsTopRatedListTemplate());
render(filmsContainerElement, createFilmsMostCommentedListTemplate());

const filmsListElement = filmsContainerElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);
const [
  filmsTopRatedListContainerElement,
  filmsMostCommentedListContainerElement
] = filmsContainerElement.querySelectorAll(`.films-list--extra .films-list__container`);

for (let i = 0; i < FILM_CARDS_COUNT; i++) {
  render(filmsListContainerElement, createFilmCardTemplate());
}

render(filmsListElement, createShowMoreButtonTemplate());

for (let i = 0; i < FILM_TOP_RATED_CARDS_COUNT; i++) {
  render(filmsTopRatedListContainerElement, createFilmCardTemplate());
}

for (let i = 0; i < FILM_MOST_COMMENTED_CARDS_COUNT; i++) {
  render(filmsMostCommentedListContainerElement, createFilmCardTemplate());
}
