import {FILTER} from "../const";

const filmToFilterMap = {
  [FILTER.WATCHLIST]: (films) => films
    .filter(({userDetails}) => !userDetails[FILTER.WATCHLIST]).length,
  [FILTER.ALREADY_WATCHED]: (films) => films
    .filter(({userDetails}) => !userDetails[FILTER.ALREADY_WATCHED]).length,
  [FILTER.FAVORITES]: (films) => films
    .filter(({userDetails}) => !userDetails[FILTER.FAVORITES]).length,
};

export const generateFilter = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(films),
    };
  });
};
