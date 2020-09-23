import UserRankView from "./view/profile";
import NavigationView from "./view/navigation";
import FilmsCountView from "./view/films-count";
import {generateFilm} from "./mock/film";
import {generateFilter} from "./mock/filter";
import {render} from './utils/render';
import {getArrayOfValueGenerator} from './utils/common';
import {getUserRank, NO_USER_RANK} from "./utils/user";
import {FILTER} from "./const";
import MovieListPresenter from "./presenter/movie-list";

const FILMS_COUNT = 23232323232;
const FILM_CARDS_COUNT = 10;

const films = getArrayOfValueGenerator(generateFilm, FILM_CARDS_COUNT);
const filters = generateFilter(films);
const alreadyWatchedCount = filters.find(({name}) => name === FILTER.ALREADY_WATCHED).count;
const userRank = getUserRank(alreadyWatchedCount);

const siteBodyElement = document.body;
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterStatisticsElement = siteBodyElement.querySelector(`.footer__statistics`);

const movieListPresenter = new MovieListPresenter(siteMainElement);

if (userRank !== NO_USER_RANK) {
  const siteHeaderElement = siteBodyElement.querySelector(`.header`);

  render(siteHeaderElement, new UserRankView(userRank).getElement());
}

render(siteMainElement, new NavigationView(filters).getElement());
render(siteFooterStatisticsElement, new FilmsCountView(FILMS_COUNT).getElement());
movieListPresenter.init(films);
