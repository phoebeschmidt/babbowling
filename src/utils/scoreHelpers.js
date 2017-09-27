
function isGameEnded(frameNum, rollNum, frameTotal) {
  if (frameNum === 9) {
    return (rollNum > 2 || (rollNum === 2 && frameTotal < 10))
  } else {
    return false;
  }
}

function updateNewFrame(frame, newScore) {
  frame.total += newScore;
  frame.frameTotal += newScore;
  frame.rolls.push(newScore);
  return frame;
}

function calculateFramesRolls(rollNum, frameNum, remainingPins, newScore, frameTotal) {
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
    remainingPins,
    isGameEnded: isGameEnded(frameNum, rollNum, frameTotal)
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

export {
  isGameEnded,
  updateNewFrame,
  calculateFramesRolls,
  getRandomInt
}
