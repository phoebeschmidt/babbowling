import React, { Component } from 'react';

class NewGameButton extends Component {

  render() {
    return (
      <div className="NewGameCTA">
        <button onClick={this.props.onClick}>Start New Game</button>
      </div>
    );
  }
}

export default NewGameButton;
