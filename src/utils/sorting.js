import {shuffle} from "./common";

const sortByRating = (films) => {
  const allRatings = new Set();
  films.forEach((film) => allRatings.add(film.rating));

  if (allRatings.size === 1) {
    return shuffle(films);
  }

  return films.sort((a, b) => {
    return b.rating - a.rating;
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
    return b.date.getTime() - a.date.getTime();
  });
};

export {
  sortByRating,
  sortByCommentsCount,
  sortByDate
};
