import { sumArray, calculateFramesRolls, updateNewFrame, getRandomInt, sumGameTotal, isGameEnded } from '../utils/scoreHelpers'

/* IsGameEnded tests */
it("game lasts for 10 frames", () => {
  const rollNum = '0';
  const frameTotal = '0';
  for (var frameNum = 0; frameNum < 10; frameNum++) {
    expect(isGameEnded(frameNum, rollNum, frameTotal)).toEqual(false);
  }
})

it("last frame has max 3 rolls", () => {
  const frameNum = 9;
  const rollNum = '3';
  const frameTotal = '0';
  expect(isGameEnded(frameNum, rollNum, frameTotal)).toEqual(true);
})

it("ends game after 2 rolls in last frame if no strike or spare", () => {
  const frameNum = 9;
  const rollNum = 2;
  const frameTotal = 9;
  expect(isGameEnded(frameNum, rollNum, frameTotal)).toEqual(true);
  expect(isGameEnded(frameNum, rollNum, frameTotal + 5)).toEqual(false);
})

/* UpdateNewFrame tests */
it("returns an updated Frame object", () => {
  const rolls = [];
  const frameTotal = 1;
  const frame = {
    rolls: rolls.slice(0), //copy array
    frameTotal
  };
  const newScore = 8;
  const scoreTotal = 100;
  const updatedFrame = updateNewFrame(frame, newScore, scoreTotal);
  expect(updatedFrame.frameTotal).toEqual(frameTotal + newScore);
  expect(updatedFrame.rolls.length).toEqual(rolls.length + 1);
})
