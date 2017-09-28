import React, { Component } from 'react';
import './ScoreFrame.css';

class ScoreFrame extends Component {
  constructor(props) {
    super(props);
    this.isObjectEmpty = this.isObjectEmpty.bind(this);
  }

  isObjectEmpty(obj) {
    return Object.keys(obj).length === 0
  }

  render() {
    var total;
    if (!this.isObjectEmpty(this.props.score)) {
      if (this.props.score.isStrike) {
        total = "X"
      } else if (this.props.score.isSpare) {
        total = "/"
      } else {
        total = this.props.score.snapshotTotal;
      }
    } else {
      total = "--"
    }
    return (
      <div className="ScoreFrame">
        <div className="topRow">
          { this.props.score.rolls ? this.props.score.rolls.join(" ") : ["-", "-"].join(" ") }
        </div>
        <div className="totalScore">
          { total }
        </div>
      </div>
    )
  }
}

export default ScoreFrame;
