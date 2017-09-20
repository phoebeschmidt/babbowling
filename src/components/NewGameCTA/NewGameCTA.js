import React, { Component } from 'react';

class NewGameCTA extends Component {

  startNewGame() {

  }

  render() {
    return (
      <div className="NewGameCTA">
        <button onClick={startNewGame}>Start New Game</button>
      </div>
    );
  }
}

export default NewGameCTA;
