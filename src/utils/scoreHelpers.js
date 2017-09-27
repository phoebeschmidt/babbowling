
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
  if (rollNum === 0) { //if it's the first roll for the frame
    if (newScore === 10) { //if strike, go to next frame, keep 10 pins remaining
      frameNum++;
    } else {
      rollNum++;
      remainingPins -= newScore;
    }
  } else {
    if (frameNum < 9) { //if it's not the last frame, this is the final roll of this frame. increase frameNum and reset pins, rollNum
      frameNum++;
      rollNum = 0;
      remainingPins = 10;
    } else { //if it is the last frame, you can't increase the framenum
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

//TODO fix spacingon this method
function updateScoreCard(scoreCard) {
  scoreCard.forEach((frame, i, originalArray) => {
      if (sumArray(frame.rolls) === 10 && frame.frameTotal === 10) { //check if extra points havent been added. note: this will be evaluate to TRUE if player gets no additional points for their strike/spare (there were 0s on subsequent rolls)
          if (frame.rolls.length === 1) {
              //it was a strike. try to add two more rolls
              if (i+1 < scoreCard.length) {
                  const nextFrame = scoreCard[i+1];
                  if (nextFrame.rolls.length == 2) {
                    frame.frameTotal += sumArray(nextFrame.rolls); //TODO THIS IS SO NAIVE it doesnt count if the next frame is a strike or anything
                  }
              }
          } else {
            //it was a spare, try to add one more roll
              if (i+1 < scoreCard.length) {
                  const nextFrame = scoreCard[i+1];
                  frame.frameTotal += nextFrame.rolls[0];
              }
          }
      }
  })
  return scoreCard;
}

function sumArray(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

export {
  updateNewFrame,
  calculateFramesRolls,
  getRandomInt,
  updateScoreCard
}
