/* Mother of all update score methods. called by reducer. calls other methods in this file
   Returns new state
*/
function updateScore(state, newScore) {
  const { frameNum, rollNum, remainingPins, scoreTotal } = state;
  //updated scoreCard with new frame and the frameTotal of any past spares/strikes
  const newScoreCard = updateScoreCard(state.scoreCard.slice(0), rollNum, scoreTotal, newScore);

  //get new game total, and save it as snapshotTotal on most recent frame
  const newScoreTotal = sumGameTotal(newScoreCard);
  newScoreCard[newScoreCard.length - 1].snapshotTotal = newScoreTotal;

  const newestFrame = newScoreCard[newScoreCard.length - 1]
  return Object.assign(calculateFramesRolls(rollNum, frameNum, remainingPins, newScore, newestFrame.isStrike, newestFrame.frameTotal), {
    scoreCard: newScoreCard,
    scoreTotal: newScoreTotal
  });
}

/* Create or update current frame, update score for strikes/spares
   return updated scoreCard
*/
function updateScoreCard(scoreCard, rollNum, scoreTotal, newScore) {
  //initialize a new frame if it's the first roll of the frame, otherwise get current frame
  let newFrame = (rollNum === 0) ? {
                                        frameTotal: 0,
                                        rolls: [],
                                        isStrike: false,
                                        isSpare: false,
                                        snapshotTotal: scoreTotal
                                      }
                                    : scoreCard.pop();
  scoreCard.push(updateFrame(newFrame, newScore));
  return updateStrikeSpareScores(scoreCard);
}

/* Update Frame with new total, new rolls, isSpare, isStrike
*/
function updateFrame(frame, newScore) {
  frame.frameTotal += newScore;
  frame.rolls.push(newScore);
  frame.isSpare = isSpare(frame);
  frame.isStrike = isStrike(frame);
  return frame;
}

/* Updates scorecard with additional points for frames that were strikes/spares
   Returns an updated scoreCard
*/
// FIXME: this recalculates the frameTotal for strike/spare frames every turn
// I accepted this compromise because it's such a small array (max 10 items)
function updateStrikeSpareScores(scoreCard) {
  scoreCard.forEach((frame, i, originalArray) => {
      if (frame.isStrike) {
        let newFrameTotal = sumArray(frame.rolls);
        let j = 1; //counter for how many rolls have been added to this frames score
        while (j < 3) {
          if (i + j < scoreCard.length) {
            let nextFrameRolls = originalArray[i+j].rolls;
            if (j === 1 && nextFrameRolls.length === 2) { //if we still need 2 rolls added, and the next frame has two rolls, add them both to frameTotal
              newFrameTotal += sumArray(nextFrameRolls);
              j += nextFrameRolls.length;
            } else { // otherwise just add the first roll of the next frame
              newFrameTotal += nextFrameRolls[0];
              j++;
            }
          } else { // if the scoreCard isn't long enough, ie, not enough rolls into the future have happened
            j = 100;
            break;
          }
        }
        frame.frameTotal = newFrameTotal;
      } else if (frame.isSpare) { //if spare, only add one more roll if scorecard is long enough
        if (i+1 < scoreCard.length) {
            frame.frameTotal = sumArray(frame.rolls) + originalArray[i+1].rolls[0];
        }
      }
  })
  return scoreCard;
}

/* Determines how to update rollNum, frameNum, and remainingPins after the most recent roll
    Returns partial state object
*/
function calculateFramesRolls(rollNum, frameNum, remainingPins, newScore, isStrike, frameTotal) {
  if (rollNum === 0) { //if it's the first roll for the frame
    if (isStrike) {
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

function isGameEnded(frameNum, rollNum, frameTotal) {
  if (frameNum === 9) {
    return (rollNum > 2 || (rollNum === 2 && frameTotal < 10))
  } else {
    return false;
  }
}

/* Small helper methods called from methods above */

function isStrike(frame) {
  return (frame.frameTotal >= 10 && frame.rolls.length === 1)
}

function isSpare(frame) {
  return (frame.frameTotal >= 10 && frame.rolls.length === 2)
}

function sumArray(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

function sumGameTotal(scoreCard) {
  return scoreCard.map((frame) => frame.frameTotal).reduce((a, b) => a + b);
}

function getRandomInt(max) {
  if (max < 6) { //TODO remove this if clause that makes it easier for testing
    return max;
  } else {
    return Math.floor(Math.random() * (max + 1));
  }
}


export {
  //used in scoreKeeper.js
  updateScore,
  getRandomInt,

  //used in scoreHelpers.test.js
  isGameEnded,
  updateFrame,
  updateStrikeSpareScores,
  isStrike,
  isSpare,
  sumArray,
}
