
const isGameEnded = (frameNum, rollNum, scoreCard) => {
  const rollTotal = scoreCard[scoreCard.length - 1].rolls.reduce((a, b) => a + b, 0);
  if (frameNum === 9) {
    return (rollNum === 2 || (frameNum === 1 && rollTotal < 10))
  } else {
    return false;
  }
}

const updateNewFrame = (frame, newScore) => {
  frame.total += newScore;
  frame.frameTotal += newScore;
  frame.rolls.push(newScore);
  return frame;
}

const calculateFramesRolls = (rollNum, frameNum, remainingPins, newScore) => {
  if (rollNum === 0) {
    if (newScore === 10) { //if strike, go to next frame, keep 10 pins remaining
      frameNum++;
    } else {
      rollNum++;
      remainingPins -= newScore;
    }
  } else {
    if (frameNum < 9) { //if it's not the last frame, this is the final roll of this frame. increase frameNum and reset pins
      frameNum++;
      rollNum = 0;
      remainingPins = 10;
    } else { //if it is the last frame, you can't increase the framenum. TODO check this logic
      rollNum++;
      remainingPins = (remainingPins - newScore === 0) ? 10 : remainingPins - newScore;
    }
  }
  return {
    rollNum,
    frameNum,
    remainingPins
  }
}

export {
  isGameEnded,
  updateNewFrame,
  calculateFramesRolls
}
