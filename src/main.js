import {createUserRankTemplate} from "./view/user-rank";
import {createNavigationTemplate} from "./view/navigation";
import {createSortTemplate} from "./view/sort";
import {createFilmCardTemplate} from "./view/film-card";
import {createFilmsContainerTemplate} from "./view/film-container";
import {createFilmInfoPopupTemplate} from "./view/film-info-popup";
import {createFilmsListTemplate} from "./view/films-list";
import {createShowMoreButtonTemplate} from "./view/show-more-button";
import {createFilmsTopRatedListTemplate} from "./view/films-top-rated-list";
import {createFilmsMostCommentedListTemplate} from "./view/films-most-commented-list";
import {createFilmsCountTemplate} from "./view/films-count";
import {generateFilm} from "./mock/film";
import {getArrayOfValueGenerator} from './utils';

const FILM_CARDS_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;
const FILM_TOP_RATED_CARDS_COUNT = 2;
const FILM_MOST_COMMENTED_CARDS_COUNT = 2;

const films = getArrayOfValueGenerator(generateFilm, FILM_CARDS_COUNT);
const filmsTopRated = getArrayOfValueGenerator(generateFilm, FILM_TOP_RATED_CARDS_COUNT);
const filmsMostCommented = getArrayOfValueGenerator(generateFilm, FILM_MOST_COMMENTED_CARDS_COUNT);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteBodyElement = document.body;
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterStatisticsElement = siteBodyElement.querySelector(`.footer__statistics`);

render(siteHeaderElement, createUserRankTemplate());
render(siteMainElement, createNavigationTemplate());
render(siteMainElement, createSortTemplate());
render(siteMainElement, createFilmsContainerTemplate());
render(siteFooterStatisticsElement, createFilmsCountTemplate());
render(siteBodyElement, createFilmInfoPopupTemplate(films[0]));

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

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  render(filmsListContainerElement, createFilmCardTemplate(films[i]));
}

// Если остаются еще фильмы для отрисовки
// Добавляется кнопка с дейтсвием отображения набора фильмов
if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmsCount = FILM_COUNT_PER_STEP;

  render(filmsListElement, createShowMoreButtonTemplate());

  const loadMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILM_COUNT_PER_STEP)
      .forEach((task) => render(filmsListContainerElement, createFilmCardTemplate(task)));

    renderedFilmsCount += FILM_COUNT_PER_STEP;

    if (renderedFilmsCount >= films.length) {
      loadMoreButton.remove();
    }
  });
}

for (let i = 0; i < FILM_TOP_RATED_CARDS_COUNT; i++) {
  render(filmsTopRatedListContainerElement, createFilmCardTemplate(filmsTopRated[i]));
}

for (let i = 0; i < FILM_MOST_COMMENTED_CARDS_COUNT; i++) {
  render(filmsMostCommentedListContainerElement, createFilmCardTemplate(filmsMostCommented[i]));
}
