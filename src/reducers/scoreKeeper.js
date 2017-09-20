import { UPDATE_SCORE, START_NEW_GAME, END_GAME } from '../actions';
import { initialGameState } from '../index';

const scoreKeeper = (state, action) => {
  switch (action.type) {
    case START_NEW_GAME:
      return initialGameState;
    case UPDATE_SCORE:
      return updateScore(state, action.newScore);
    case END_GAME:
      return endGame(state);
    default:
      return state;
  }
}

const updateScore = (state, newScore) => {
  const { frameNum, rollNum, scoreTotal, scoreCard, remainingPins } = state;
  //if rollNum == 0, construct new score to append to scoreCard. then adjust other numbers accordingly
  //if rollNum > 0, get the score obj from scoreCard array and update it. then adjust other numbers accordingly
  if (rollNum === 0) {
    var frameScore = {
      total: scoreTotal + newScore,
      rolls: [newScore]
    }
    scoreCard.push(frameScore);
    //adjust other numbers
    return {
      frameNum,
      rollNum: rollNum + 1,
      scoreCard,
      scoreTotal: scoreTotal + newScore, //this isnt quite right, depending on if it's a spare or a strike
      remainingPins: 10 - newScore
    }
  } else {
    var frameScore = scoreCard.pop();
    frameScore.rolls.push(newScore);
    frameScore.total += newScore;
    return {
      frameNum: frameNum + 1, //this isnt quite right
      rollNum: 0, //this also isnt quite right. both depend on frame number and roll number
      scoreCard: scoreCard.push(frameScore),
      scoreTotal: scoreTotal + newScore,
      remainingPins: 10 //same comment as above
    }
  }
}

const endGame = (state) => {

}

export default scoreKeeper;
