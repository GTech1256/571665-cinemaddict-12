const TEXTS = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.
Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.
Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.
Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus. `.split(`. `);

const TEXTS_MAX_LENGTH = TEXTS.length;

export function getRandomStrings(length = TEXTS_MAX_LENGTH) {
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
export const getRandomInteger = (min = 0, max = 1) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomValueFromArray = (array) => array[getRandomInteger(0, array.length - 1)];

export const getArrayOfValueGenerator = (getValue, length) => new Array(length).fill().map(getValue);

export const humanizeDate = (timestamp) => {
  console.log(timestamp);
  return new Date(timestamp).toLocaleString(`en-US`, {day: `numeric`, month: `long`, year: `numeric`});
};
