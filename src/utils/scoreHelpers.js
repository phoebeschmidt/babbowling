
function getRandomInt(max) {
  if (max < 6) { //TODO remove this if clause that makes it easier for testing
    return max;
  } else {
    return Math.floor(Math.random() * (max + 1));
  }
}

function isGameEnded(frameNum, rollNum, frameTotal) {
  if (frameNum === 9) {
    return (rollNum > 2 || (rollNum === 2 && frameTotal < 10))
  } else {
    return false;
  }
}

function updateNewFrame(frame, newScore) {
  frame.frameTotal += newScore;
  frame.rolls.push(newScore);
  frame.isSpare = isSpare(frame);
  frame.isStrike = isStrike(frame);
  return frame;
}

function calculateFramesRolls(rollNum, frameNum, remainingPins, newScore, frame) {
  if (rollNum === 0) { //if it's the first roll for the frame
    if (frame.isStrike) {
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
    isGameEnded: isGameEnded(frameNum, rollNum, frame.frameTotal)
  }
}

function sumGameTotal(scoreCard) {
  return scoreCard.map((frame) => frame.frameTotal).reduce((a, b) => a + b);
}

/* Updates scorecard with additional points for frames that were strikes/spares */
// FIXME: this recalculates the frameTotal for strike/spare frames every turn
// I accepted this compromise because it's such a small array (max 10 items)
// TODO: clean up this method it's super confusing
function updateScoreCard(scoreCard) {
  scoreCard.forEach((frame, i, originalArray) => {
      if (frame.isStrike) {
        var newFrameTotal = sumArray(frame.rolls);
        var j = 1;
        while (j < 3) { //try to add two more rolls
          if (i + j < scoreCard.length) {
            var nextFrameRolls = originalArray[i+j].rolls;
            if (j === 1 && nextFrameRolls.length === 2) {
              newFrameTotal += sumArray(nextFrameRolls);
              j += nextFrameRolls.length;
            } else {
              newFrameTotal += nextFrameRolls[0];
              j++;
            }
          } else {
            j = 100;
            break;
          }
        }
        frame.frameTotal = newFrameTotal;
      } else if (frame.isSpare) { //add one more roll
        if (i+1 < scoreCard.length) {
            frame.frameTotal = sumArray(frame.rolls) + originalArray[i+1].rolls[0];
        }
      }
  })
  return scoreCard;
}

/* Small helper method called within methods above */

function isStrike(frame) {
  return (frame.frameTotal >= 10 && frame.rolls.length === 1)
}

function isSpare(frame) {
  return (frame.frameTotal >= 10 && frame.rolls.length === 2)
}

function sumArray(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

export {
  updateNewFrame,
  calculateFramesRolls,
  getRandomInt,
  updateScoreCard,
  sumGameTotal,
  isGameEnded,
  isStrike,
  isSpare,
  sumArray
}
