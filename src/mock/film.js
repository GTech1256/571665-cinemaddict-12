import {getRandomStrings, getRandomValueFromArray, getArrayOfValueGenerator, getRandomInteger} from "../utils";

const DESCRIPTION_COUNT = 5;
const COMMENTS_COUNT = 5;

const COMMENT_EMOTIONS = [`smile`, `sleeping`, `puke`, `angry`];

const generateComment = () => ({
  author: `Ilya O'Reilly`,
  comment: getRandomStrings(1),
  date: `2019-05-11T16:12:32.554Z`,
  emotion: getRandomValueFromArray(COMMENT_EMOTIONS)
});

export const generateFilm = () => {
  const description = getRandomStrings(DESCRIPTION_COUNT);
  const comments = getArrayOfValueGenerator(generateComment, COMMENTS_COUNT); // getArrayOfValue(generateComment, COMMENTS_COUNT);

  return {
    title: `The Dance Of Life`,
    alternativeTitle: `Life Dance`,
    totalRating: parseFloat(`${getRandomInteger(1, 4)}.${getRandomInteger(1, 9)}`),
    poster: `./images/posters/the-dance-of-life.jpg`,
    ageRating: 0,
    director: `Tom Ford`,
    writers: [
      `Takeshi Kitano`
    ],
    actors: [
      `Morgan Freeman`
    ],
    release: {
      "date": `2019-05-11T00:00:00.000Z`,
      "release_country": `Finland`
    },
    runtime: getRandomInteger(25, 255),
    genre: [
      `Comedy`
    ],
    description,
    comments
  };
};
