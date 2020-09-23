import {shuffle} from "./common";

const sortByRating = (films) => {
  if (films.length === 1) {
    return shuffle(films);
  }

  return films.sort((a, b) => {
    return b.filmInfo.totalRating - a.filmInfo.totalRating;
  });
};

const sortByCommentsCount = (films) => {
  const allComments = new Set();
  films.forEach((film) => allComments.add(film.comments.length));

  if (allComments.size === 1) {
    return shuffle(films);
  }

  return films.sort((a, b) => {
    return b.comments.length - a.comments.length;
  });
};

const sortByDate = (films) => {
  return films.sort((a, b) => {
    return new Date(b.filmInfo.release.date).getTime() - new Date(a.filmInfo.release.date).getTime();
  });
};

export {
  sortByRating,
  sortByCommentsCount,
  sortByDate
};
