import {
  getRandomStrings,
  getRandomValueFromArray,
} from "../utils";

const COMMENT_EMOTIONS = [`smile`, `sleeping`, `puke`, `angry`];

const generateComment = () => ({
  author: `Ilya O'Reilly`,
  comment: getRandomStrings(1),
  date: `2019-05-11T16:12:32.554Z`,
  emotion: getRandomValueFromArray(COMMENT_EMOTIONS)
});

export {
  generateComment
};
