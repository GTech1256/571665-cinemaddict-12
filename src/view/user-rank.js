import {createElement} from "../utils.js";


const createUserRankTemplate = (
    {
      avatar,
    },
    userRank
) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userRank}</p>
      <img class="profile__avatar" src="${avatar}" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserRankView {
  constructor(user, userRank) {
    this._user = user;
    this._userRank = userRank;
    this._element = null;
  }

  getTemplate() {
    return createUserRankTemplate(this._user, this._userRank);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
