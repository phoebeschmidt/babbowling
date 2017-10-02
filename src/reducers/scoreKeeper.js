import { START_NEW_GAME, BOWL } from '../actions';
import { initialGameState } from '../index';
import { updateScore, getRandomInt} from '../utils/scoreHelpers'

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

const startNewGame = () => {
  return initialGameState;
}

export default scoreKeeper;
