import {FILTER} from "../const";

const FilmFilterRule = {
  [FILTER.ALL]: (films) => films,
  [FILTER.WATCHLIST]: ({userDetails}) => !userDetails[FILTER.WATCHLIST],
  [FILTER.ALREADY_WATCHED]: ({userDetails}) => !userDetails[FILTER.ALREADY_WATCHED],
  [FILTER.FAVORITES]: ({userDetails}) => !userDetails[FILTER.FAVORITES]
};

const getFilteredFilms = (films, filter) => films.filter(FilmFilterRule[filter]);

// const filmToFilterMap = {
//   [FILTER.ALL]: (films) => films.length,
//   [FILTER.WATCHLIST]: (films) => films.filter(FilmFilterRule[FILTER.WATCHLIST]).length,
//   [FILTER.ALREADY_WATCHED]: (films) => films
//     .filter(({userDetails}) => !userDetails[FILTER.ALREADY_WATCHED]).length,
//   [FILTER.FAVORITES]: (films) => films
//     .filter(({userDetails}) => !userDetails[FILTER.FAVORITES]).length,
// };

const generateFilter = (films) => {
  return Object.values(FILTER).map((filterName) => ({
    name: filterName,
    count: getFilteredFilms(films, filterName).length,
  }
  ));
};

export {
  FilmFilterRule,
  getFilteredFilms,
  generateFilter
};
