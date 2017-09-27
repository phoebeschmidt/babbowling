import React, { Component } from 'react';

class NewGameCTA extends Component {

  render() {
    return (
      <div className="NewGameCTA">
        <button onClick={this.props.onClick}>Start New Game</button>
      </div>
    );
  }
}

export default NewGameCTA;
