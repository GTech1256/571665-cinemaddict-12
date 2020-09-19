const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const EscapeHTMLMap = {
  '&': `&amp;`,
  '<': `&lt;`,
  '>': `&gt;`,
  '"': `&quot;`,
  "'": `&#39;`,
  '/': `&#x2F;`,
  '`': `&#x60;`,
  '=': `&#x3D;`
};

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

const TEXTS = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.
Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.
Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.
Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus. `.split(`. `);
const TEXTS_MAX_LENGTH = TEXTS.length;

const userRankKeys = Object.keys(UserRankData);
const userRankMaxCountOfRank = userRankKeys[userRankKeys.length - 1];


function getRandomStrings(length = TEXTS_MAX_LENGTH) {
  const result = [];
  let currenIteration = 0;

  for (let i = 0; i < length; i++) {
    const currentPosition = i - currenIteration * TEXTS_MAX_LENGTH;

    if (currentPosition >= TEXTS_MAX_LENGTH - 1) {
      currenIteration++;
    }

    const text = shuffle(TEXTS)[currentPosition];
    result.push(text);
  }

  return result.join(`. `);
}

function shuffle(array) {
  const result = [...array];

  // Рандомно изменяет последовательность в массиве 'на месте'
  result.sort(() => Math.random() - 0.5);

  return result;
}

// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (min = 0, max = 1) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomValueFromArray = (array) => array[getRandomInteger(0, array.length - 1)];

const getArrayOfValueGenerator = (getValue, length) => new Array(length).fill().map(getValue);

const humanizeDate = (timestamp) => {
  return new Date(timestamp).toLocaleString(`en-US`, {day: `numeric`, month: `long`, year: `numeric`});
};

const render = (container, element, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const renderTemplate = (container, template, place = RenderPosition.BEFOREEND) => {
  container.insertAdjacentHTML(place, template);
};

// Принцип работы прост:
// 1. создаём пустой div-блок
// 2. берём HTML в виде строки и вкладываем в этот div-блок, превращая в DOM-элемент
// 3. возвращаем этот DOM-элемент
const createElement = (template) => {
  const newElement = document.createElement(`div`); // 1
  newElement.innerHTML = template; // 2

  return newElement.firstChild; // 3
};

const getEscapedHTML = (string) => String(string)
  .replace(
      /[&<>"'`=\/]/g,
      (s) => EscapeHTMLMap[s]
  );

const getUserRank = (watchedFilmCount) => {
  let currentRank = null; // 0 — звание не отображается

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
  getEscapedHTML,
  createElement,
  renderTemplate,
  render,
  getRandomInteger,
  getRandomValueFromArray,
  getArrayOfValueGenerator,
  humanizeDate,
  getRandomStrings,
  RenderPosition,
  getUserRank
};
