import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './components/Game/Game';

import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import scoreKeeper from './reducers/scoreKeeper';

export const initialGameState = {
  frameNum: 0,
  rollNum: 0,
  scoreCard: [],
  scoreTotal: 0,
  remainingPins: 10
}
// const logger = createLogger();
const store = createStore(scoreKeeper, initialGameState);
ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
