import { START_NEW_GAME, BOWL } from '../actions';
import { initialGameState } from '../index';
import { isGameEnded, calculateFramesRolls, updateNewFrame } from '../utils/scoreHelpers'

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

const getRandomInt = (max) => {
  return Math.floor(Math.random() * (max + 1));
}

const bowl = (state) => {
    const hitPins = getRandomInt(state.remainingPins);
    console.log(hitPins, "pins knocked down!");
    return updateScore(state, hitPins);
}

const updateScore = (state, newScore) => {
  const { frameNum, rollNum, scoreTotal, remainingPins } = state;
  const scoreCard = state.scoreCard.slice(0);

  var newFrame = (rollNum === 0) ? {
                                        total: scoreTotal,
                                        frameTotal: 0,
                                        rolls: []
                                      }
                                    : scoreCard.pop();

  scoreCard.push(updateNewFrame(newFrame, newScore));

  return Object.assign(calculateFramesRolls(rollNum, frameNum, remainingPins, newScore), {
    scoreCard,
    scoreTotal: scoreTotal + newScore,
    isGameEnded: isGameEnded(frameNum, rollNum, scoreCard)
  });
}

const startNewGame = () => {
  return initialGameState;
}

export default scoreKeeper;
