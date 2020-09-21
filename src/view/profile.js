import Abstract from "./abstract.js";

const createUserRankTemplate = (rank) => {
  return (
    `<section class="header__profile profile">
    ${rank !== `none` ? `<p class="profile__rating">${rank}</p>` : ``}
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserRankView extends Abstract {
  constructor(rank) {
    super();
    this._rank = rank;
  }

  getTemplate() {
    return createUserRankTemplate(this._rank);
  }
}
