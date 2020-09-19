import {generateComment} from "./comment";
import {FILTER} from "../const";
import {
  getArrayOfValueGenerator,
  getRandomStrings,
  getRandomInteger
} from "../utils";

const DESCRIPTION_COUNT = 5;
const COMMENTS_COUNT = 5;

const generateUserDetails = () => ({
  [FILTER.WATCHLIST]: Boolean(getRandomInteger(0, 1)),
  [FILTER.ALREADY_WATCHED]: Boolean(getRandomInteger(0, 1)),
  watchingDate: `2019-04-12T16:12:32.554Z`,
  [FILTER.FAVORITES]: Boolean(getRandomInteger(0, 1))
});

const generateFilm = () => {
  const description = getRandomStrings(DESCRIPTION_COUNT);
  const comments = getArrayOfValueGenerator(generateComment, COMMENTS_COUNT); // getArrayOfValue(generateComment, COMMENTS_COUNT);

  return {
    comments,
    filmInfo: {
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
      description
    },
    userDetails: generateUserDetails()
  };
};

export {
  generateFilm
};
