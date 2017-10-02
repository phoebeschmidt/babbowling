export const START_NEW_GAME = 'START_NEW_GAME';
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
