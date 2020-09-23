const FILTER = {
  ALL: `ALL`,
  WATCHLIST: `watchlist`,
  ALREADY_WATCHED: `alreadyWatched`,
  FAVORITES: `favorites`
};

const EMOJIS = [`smile`, `sleeping`, `puke`, `angry`];

const Mode = {
  DEFAULT: `DEFAULT`,
  POPUP: `POPUP`
};

const UserAction = {
  ADD: `ADD_COMMENT`,
  DELETE: `DELETE_COMMENT`
};

const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

const NavigationMode = {
  MOVIES: `MOVIES`,
  STATISTICS: `STATISTICS`
};

const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};

const FilmsType = {
  ALL: `all`,
  RATED: `top rated`,
  COMMENTED: `most commented`
};

export {
  FILTER,
  EMOJIS,
  Mode,
  UserAction,
  UpdateType,
  NavigationMode,
  SortType,
  FilmsType
};
