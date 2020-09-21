const NO_USER_RANK = null;

/**
 * 0 — звание не отображается;
 * от 1 до 10 — novice;
 * от 11 до 20 — fan;
 * от 21 и выше — movie buff;
*/
const UserRankData = {
  1: `novice`,
  11: `fan`,
  21: `movie buff`
};

const userRankKeys = Object.keys(UserRankData);
const userRankMaxCountOfRank = userRankKeys[userRankKeys.length - 1];

const getUserRank = (watchedFilmCount) => {
  let currentRank = NO_USER_RANK; // 0 — звание не отображается

  // Если просмотрено фильмов больше, чем у максимального ранга
  if (userRankMaxCountOfRank <= watchedFilmCount) {
    return UserRankData[userRankMaxCountOfRank];
  }

  for (let i = 0; i < userRankMaxCountOfRank; i++) {
    currentRank = UserRankData[i] ? UserRankData[i] : currentRank;

    if (watchedFilmCount === i) {
      break;
    }
  }

  return currentRank;
};

export {
  NO_USER_RANK,
  getUserRank
};
