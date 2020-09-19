import UserRankView from "./view/user-rank";
import NavigationView from "./view/navigation";
import SortView from "./view/sort";
import FilmCardView from "./view/film-card";
import FilmsView from "./view/films";
import FilmInfoPopupView from "./view/film-info-popup";
import FilmsListView from "./view/films-list";
import ShowMoreButtonView from "./view/show-more-button";
import FilmsTopRatedListView from "./view/films-top-rated-list";
import FilmsMostCommentedListView from "./view/films-most-commented-list";
import NoFilmsView from "./view/no-films";
import FilmsCountView from "./view/films-count";
import {generateFilm} from "./mock/film";
import {generateUser} from "./mock/user";
import {generateFilter} from "./mock/filter";
import {
  getArrayOfValueGenerator,
  render,
  getUserRank,
  NO_USER_RANK
} from './utils';
import {FILTER} from "./const";

const FILMS_COUNT = 23232323232;
const FILM_CARDS_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;
const FILM_TOP_RATED_CARDS_COUNT = 2;
const FILM_MOST_COMMENTED_CARDS_COUNT = 2;

const user = generateUser();
const films = getArrayOfValueGenerator(generateFilm, FILM_CARDS_COUNT);
const filmsTopRated = getArrayOfValueGenerator(generateFilm, FILM_TOP_RATED_CARDS_COUNT);
const filmsMostCommented = getArrayOfValueGenerator(generateFilm, FILM_MOST_COMMENTED_CARDS_COUNT);
const filters = generateFilter(films);
const alreadyWatchedCount = filters.find(({name}) => name === FILTER.ALREADY_WATCHED).count;
const userRank = getUserRank(alreadyWatchedCount);

const siteBodyElement = document.body;
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterStatisticsElement = siteBodyElement.querySelector(`.footer__statistics`);

const renderFilm = (filmsListContainerElement, film) => {
  const filmCardComponent = new FilmCardView(film);
  const filmInfoPopupComponent = new FilmInfoPopupView(film);

  const hideFilmPopup = () => {
    siteBodyElement.removeChild(filmInfoPopupComponent.getElement());
  };

  const handleFilmCardClick = () => {
    siteBodyElement.appendChild(filmInfoPopupComponent.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      hideFilmPopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  filmCardComponent
    .getElement()
    .querySelectorAll([
      `.film-card__poster`,
      `.film-card__title`,
      `.film-card__comments`
    ])
    .forEach((element) => element.addEventListener(`click`, handleFilmCardClick));

  filmInfoPopupComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
    hideFilmPopup();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(filmsListContainerElement, filmCardComponent.getElement());
};

const renderFilmsContent = (containerElement, contentFilms) => {
  render(containerElement, new SortView().getElement());
  render(containerElement, new FilmsView().getElement());

  const filmsContainerElement = containerElement.querySelector(`.films`);
  render(filmsContainerElement, new FilmsListView().getElement());
  render(filmsContainerElement, new FilmsTopRatedListView().getElement());
  render(filmsContainerElement, new FilmsMostCommentedListView().getElement());

  const filmsListElement = filmsContainerElement.querySelector(`.films-list`);
  const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);
  const [
    filmsTopRatedListContainerElement,
    filmsMostCommentedListContainerElement
  ] = filmsContainerElement.querySelectorAll(`.films-list--extra .films-list__container`);

  if (contentFilms.length === 0) {
    render(filmsListContainerElement, new NoFilmsView().getElement());
  } else {
    for (let i = 0; i < Math.min(contentFilms.length, FILM_COUNT_PER_STEP); i++) {
      renderFilm(filmsListContainerElement, contentFilms[i]);
    }

    // Если остаются еще фильмы для отрисовки
    // Добавляется кнопка с дейтсвием отображения набора фильмов
    if (contentFilms.length > FILM_COUNT_PER_STEP) {
      let renderedFilmsCount = FILM_COUNT_PER_STEP;
      const showMoreButtonElement = new ShowMoreButtonView().getElement();

      render(filmsListElement, showMoreButtonElement);

      showMoreButtonElement.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        contentFilms
          .slice(renderedFilmsCount, renderedFilmsCount + FILM_COUNT_PER_STEP)
          .forEach((film) => renderFilm(filmsListContainerElement, film));

        renderedFilmsCount += FILM_COUNT_PER_STEP;

        if (renderedFilmsCount >= contentFilms.length) {
          showMoreButtonElement.remove();
        }
      });
    }
  }

  for (let i = 0; i < FILM_TOP_RATED_CARDS_COUNT; i++) {
    renderFilm(filmsTopRatedListContainerElement, filmsTopRated[i]);
  }

  for (let i = 0; i < FILM_MOST_COMMENTED_CARDS_COUNT; i++) {
    renderFilm(filmsMostCommentedListContainerElement, filmsMostCommented[i]);
  }
}

if (userRank !== NO_USER_RANK) {
  const siteHeaderElement = siteBodyElement.querySelector(`.header`);

  render(siteHeaderElement, new UserRankView(user, userRank).getElement());
}

render(siteMainElement, new NavigationView(filters).getElement());
renderFilmsContent(siteMainElement, films);
render(siteFooterStatisticsElement, new FilmsCountView(FILMS_COUNT).getElement());
