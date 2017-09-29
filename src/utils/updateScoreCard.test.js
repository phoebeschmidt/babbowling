import { isStrike, isSpare, updateScoreCard, sumArray } from '../utils/scoreHelpers';

/* isStrike isSpare tests */
const spareFrame = {
  frameTotal: 10,
  rolls: [2, 8],
  isSpare: true,
  isStrike: false
}

const strikeFrame = {
  frameTotal: 10,
  rolls: [10],
  isStrike: true,
  isSpare: false
}

const nonSpareStrikeFrame = {
  frameTotal: 8,
  rolls: [5, 3],
  isStrike: false,
  isSpare: false
}

const invalidStrikeFrame = {
  frameTotal: 100,
  rolls: [3, 2],
  isStrike: false,
  isSpare: false
}

const invalidFrameRolls = {
  frameTotal: 1,
  rolls: [3, 4, 5],
  isStrike: false,
  isSpare: false
}

it("correctly identifies strike and does not falsely identify non strikes", () => {
  expect(isStrike(strikeFrame)).toEqual(true);
  expect(isStrike(spareFrame)).toEqual(false);
  expect(isStrike(nonSpareStrikeFrame)).toEqual(false);
  expect(isStrike(invalidStrikeFrame)).toEqual(false);
  expect(isStrike(invalidFrameRolls)).toEqual(false);
})

it("correctly identifies spare and does not falsely identify non spares", () => {
  expect(isSpare(strikeFrame)).toEqual(false);
  expect(isSpare(spareFrame)).toEqual(true);
  expect(isSpare(nonSpareStrikeFrame)).toEqual(false);
  expect(isSpare(invalidStrikeFrame)).toEqual(true);
  expect(isSpare(invalidFrameRolls)).toEqual(false);
})

/* updateScoreCard Tests */
let strikeScoreCard = [
  Object.assign({}, nonSpareStrikeFrame),
  Object.assign({}, strikeFrame),
  Object.assign({}, nonSpareStrikeFrame)
]

let doubleStrikeScoreCard = [
  Object.assign({}, nonSpareStrikeFrame),
  Object.assign({}, strikeFrame),
  Object.assign({}, strikeFrame),
  Object.assign({}, nonSpareStrikeFrame)
]

let shortSpareScoreCard = [
  Object.assign({}, nonSpareStrikeFrame),
  Object.assign({}, spareFrame)
]

let spareScoreCard = [
  Object.assign({}, nonSpareStrikeFrame),
  Object.assign({}, spareFrame),
  Object.assign({}, nonSpareStrikeFrame)
]

it("correctly updates a scoreCard when there are >=2 rolls after a strike", () => {
  const oldScoreCard = strikeScoreCard.map((frame) => {
      return Object.assign({}, frame)
  });
  const newScoreCard = updateScoreCard(strikeScoreCard);
  const updatedStrikeFrame = newScoreCard[1];
  const oldStrikeFrame = oldScoreCard[1];
  expect(updatedStrikeFrame.frameTotal).toEqual(oldStrikeFrame.frameTotal + sumArray(nonSpareStrikeFrame.rolls));
})

it("correctly updates a scoreCard when there are >=2 rolls over 2 frames after a strike", () => {
  const oldScoreCard = doubleStrikeScoreCard.map((frame) => {
      return Object.assign({}, frame)
  });
  const newScoreCard = updateScoreCard(doubleStrikeScoreCard);
  const updatedStrikeFrame = newScoreCard[1];
  const oldStrikeFrame = oldScoreCard[1];
  expect(updatedStrikeFrame.frameTotal).toEqual(oldStrikeFrame.frameTotal + oldScoreCard[2].rolls[0] + oldScoreCard[3].rolls[0]);
})

it("correctly updates a scoreCard when there are >=1 rolls after a spare", () => {
  const oldScoreCard = spareScoreCard.map((frame) => {
      return Object.assign({}, frame)
  });
  const newScoreCard = updateScoreCard(spareScoreCard);
  const updatedSpareFrame = newScoreCard[1];
  const oldSpareFrame = oldScoreCard[1];
  expect(updatedSpareFrame.frameTotal).toEqual(oldSpareFrame.frameTotal + nonSpareStrikeFrame.rolls[0]);
})

it("does not update a spare frame when there are no rolls after", () => {
  const oldScoreCard = shortSpareScoreCard.map((frame) => {
      return Object.assign({}, frame)
  });
  const newScoreCard = updateScoreCard(shortSpareScoreCard);
  const updatedSpareFrame = newScoreCard[1];
  const oldSpareFrame = oldScoreCard[1];
  expect(updatedSpareFrame.frameTotal).toEqual(oldSpareFrame.frameTotal);
})
