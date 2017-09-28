import { START_NEW_GAME, BOWL } from '../actions';
import { initialGameState } from '../index';
import { calculateFramesRolls, updateNewFrame, getRandomInt, updateScoreCard, sumGameTotal } from '../utils/scoreHelpers'

const scoreKeeper = (state, action) => {
  switch (action.type) {
    case BOWL:
      return bowl(state);
    case START_NEW_GAME:
      return startNewGame();
    default:
      return state;
  }
}

const bowl = (state) => {
    const hitPins = getRandomInt(state.remainingPins);
    console.log(hitPins, "pins knocked down!");
    return updateScore(state, hitPins);
}

const updateScore = (state, newScore) => {
  const { frameNum, rollNum, remainingPins, scoreTotal } = state;
  const scoreCard = state.scoreCard.slice(0);
  var newFrame = (rollNum === 0) ? {
                                        frameTotal: 0,
                                        rolls: [],
                                        isStrike: false,
                                        isSpare: false,
                                        snapshotTotal: scoreTotal
                                      }
                                    : scoreCard.pop();
  newFrame = updateNewFrame(newFrame, newScore, scoreTotal);
  scoreCard.push(newFrame);

  const newScoreCard = updateScoreCard(scoreCard);
  const newScoreTotal = sumGameTotal(newScoreCard);
  return Object.assign(calculateFramesRolls(rollNum, frameNum, remainingPins, newScore, newFrame), {
    scoreCard: newScoreCard,
    scoreTotal: newScoreTotal
  });
}

const startNewGame = () => {
  return initialGameState;
}

export default scoreKeeper;
