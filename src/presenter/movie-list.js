import SortView from "../view/sort";
import FilmCardView from "../view/film-card";
import FilmsView from "../view/films";
import FilmPopupView from "../view/film-popup";
import FilmsListView from "../view/films-list";
import ShowMoreButtonView from "../view/show-more-button";
import TopRatedView from "../view/top-rated";
import MostCommentedView from "../view/most-commented";
import NoMoviesView from "../view/no-movies";
import AllMoviesView from "../view/all-movies";
import LoadingView from "../view/loading";
import ShowButtonView from "../view/show-more-button";
import FilmPresenter from "../presenter/film";
import {render, remove, RenderPosition} from "../utils/render";
import {
  FILTER,
  SortType,
  FilmsType,
  // UserAction,
  // UpdateType
} from "../const";
import {getFilteredFilms} from "../mock/filter";
import {sortByCommentsCount, sortByDate, sortByRating} from "../utils/sorting";

const {DEFAULT, DATE, RATING} = SortType;
const {RATED, COMMENTED} = FilmsType;
// const {ADD, DELETE} = UserAction;
// const {PATCH, MINOR, MAJOR, INIT} = UpdateType;
const FILM_EXTRA_COUNT = 2;
const FILM_CARDS_PER_STEP = 5;

const body = document.querySelector(`body`);

export default class MovieList {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;
    this._popUpContainer = body;
    this._currentSortType = DEFAULT;
    this._renderedFilmsCount = FILM_CARDS_PER_STEP;

    this._sortComponent = null;
    this._showButtonComponent = null;

    this._filmCardComponent = new FilmCardView();
    this._FilmPopupComponent = new FilmPopupView();
    this._loadingComponent = new LoadingView();
    this._noMoviesComponent = new NoMoviesView();
    this._movieListComponent = new FilmsView();
    this._allMoviesComponent = new AllMoviesView();
    this._allMoviesListComponent = new FilmsListView();
    this._topRatedComponent = new TopRatedView();
    this._topRatedListComponent = new FilmsListView();
    this._mostCommentedComponent = new MostCommentedView();
    this._mostCommentedListComponent = new FilmsListView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleShowButtonClick = this._handleShowButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(movieListFilms) {
    this._movieListFilms = movieListFilms.slice();
    // 1. В отличии от сортировки по любому параметру,
    // исходный порядок можно сохранить только одним способом -
    // сохранив исходный массив:
    this._sourcedmovieListFilms = movieListFilms.slice();

    render(this._movieListContainer, this._movieListComponent);
    this._renderMovieList();
  }

  _getFilms() {
    const currentFilter = FILTER.ALL; // this._filterModel.getFilter();
    const films = this._movieListFilms;

    const filteredFilms = getFilteredFilms(films, currentFilter);

    switch (this._currentSortType) {
      case DATE:
        return sortByDate(filteredFilms.slice());
      case RATING:
        return sortByRating(filteredFilms.slice());
      default:
        return filteredFilms;
    }
  }

  _getTopRatedFilms() {
    return sortByRating(this._movieListFilms.slice());
  }

  _getMostCommentedFilms() {
    return sortByCommentsCount(this._movieListFilms.slice());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;

    this._clearMovieList();
    this._renderSort();
    this._renderMovies();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._movieListContainer, this._sortComponent, RenderPosition.BEFORE, this._movieListComponent);
  }

  _renderFilmCard(container, film/* , type */) {
    const filmPresenter = new FilmPresenter(container);
    filmPresenter.init(film);
  }

  _renderFilmCards(container, films, type) {
    films.forEach((film) => this._renderFilmCard(container, film, type));
  }

  _handleShowButtonClick() {
    const filmsCount = this._getFilms().length;
    const newRenderedFilmsCount = Math.min(filmsCount, this._renderedFilmsCount + FILM_CARDS_PER_STEP);
    const addFilmsCount = this._getFilms().slice(this._renderedFilmsCount, newRenderedFilmsCount);


    this._renderFilmCards(this._allMoviesListComponent, addFilmsCount);
    this._renderedFilmsCount = newRenderedFilmsCount;

    if (this._renderedFilmsCount >= filmsCount) {
      remove(this._showButtonComponent);
    }
  }

  _renderShowButton() {
    if (this._showButtonComponent !== null) {
      this._showButtonComponent = null;
    }

    this._showButtonComponent = new ShowButtonView();
    render(this._allMoviesComponent, this._showButtonComponent);
    this._showButtonComponent.setClickHandler(this._handleShowButtonClick);
  }

  _renderMovies() {
    this._renderAllMovies();

    const isAllRaitingsNull = this._getFilms().every((film) => {
      return film.rating === 0;
    });
    const isAllCommentsNull = this._getFilms().every((film) => {
      return film.comments.length === 0;
    });

    if (!isAllRaitingsNull) {
      this._renderTopRated();
    }

    if (!isAllCommentsNull) {
      this._renderMostCommented();
    }
  }

  _renderAllMovies() {
    this._renderAllMoviesList();
    render(this._movieListComponent, this._allMoviesComponent);
  }

  _renderTopRated() {
    this._renderTopRatedList();
    render(this._movieListComponent, this._topRatedComponent);
  }

  _renderMostCommented() {
    this._renderMostCommentedList();
    render(this._movieListComponent, this._mostCommentedComponent);
  }

  _renderLoading() {
    render(this._movieListComponent, this._loadingComponent);
  }

  _renderNoMovies() {
    render(this._movieListComponent, this._noMoviesComponent);
  }

  _renderAllMoviesList() {
    const films = this._getFilms();
    const filmsCount = films.length;
    const allFilms = films.slice(0, Math.min(filmsCount, this._renderedFilmsCount));

    this._renderFilmCards(this._allMoviesListComponent, allFilms);
    render(this._allMoviesComponent, this._allMoviesListComponent);

    if (filmsCount > this._renderedFilmsCount) {
      this._renderShowButton();
    }
  }

  _renderTopRatedList() {
    const topRatedFilms = this._getTopRatedFilms().slice(0, FILM_EXTRA_COUNT);
    this._renderFilmCards(this._topRatedListComponent, topRatedFilms, RATED);
    render(this._topRatedComponent, this._topRatedListComponent);
  }

  _renderMostCommentedList() {
    const mostCommentedFilms = this._getMostCommentedFilms().slice(0, FILM_EXTRA_COUNT);
    this._renderFilmCards(this._mostCommentedListComponent, mostCommentedFilms, COMMENTED);
    render(this._mostCommentedComponent, this._mostCommentedListComponent);
  }

  _clearMovieList() {
    remove(this._sortComponent);
    remove(this._allMoviesComponent);
    this._allMoviesListComponent.getElement().innerHTML = ``;
    this._renderedFilmsCount = FILM_CARDS_PER_STEP;
  }

  _renderMovieList() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const filmsCount = this._getFilms().length;

    if (filmsCount === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderSort();
    this._renderMovies();
  }
}
