import React, { Component } from 'react';

class PlayCTA extends Component {

  render() {
    return (
      <div className="PlayCTA">
        <button disabled={this.props.isGameEnded} onClick={this.props.onClick}>Play!</button>
      </div>
    );
  }
}

export default PlayCTA;
