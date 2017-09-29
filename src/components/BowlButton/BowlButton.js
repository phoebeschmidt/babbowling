import React, { Component } from 'react';

class BowlButton extends Component {

  render() {
    return (
      <div className="BowlButton">
        <button disabled={this.props.isGameEnded} onClick={this.props.onClick}>Bowl!</button>
      </div>
    );
  }
}

export default BowlButton;
