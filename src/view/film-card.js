const getHumanizeDuration = (duration) => {
  const hours = Math.round(duration / 60);
  const minutes = duration % 60;

  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};

const createFilmCardTemplate = (film) => {
  const {
    title,
    genre,
    poster,
    release,
    runtime,
    comments,
    description,
    totalRating,
  } = film;

  const descriptionSliced = description.length > 140 ? `${description.slice(0, 140)}…` : description;

  const releaseYear = new Date(release.date).getFullYear();

  const duration = getHumanizeDuration(runtime);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseYear}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${descriptionSliced}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

export {
  createFilmCardTemplate
};
