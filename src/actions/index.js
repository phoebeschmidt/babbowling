export const UPDATE_SCORE = 'UPDATE_SCORE';
export const START_NEW_GAME = 'START_NEW_GAME';
export const END_GAME = 'END_GAME';
export const BOWL = 'BOWL';

export const bowl = () => {
  return {
    type: BOWL
  }
}

export const startNewGame = () => {
  return {
    type: START_NEW_GAME
  }
}

export const updateScore = (newRollScore) => {
  return {
    type: UPDATE_SCORE,
    newScore: newRollScore
  }
}
