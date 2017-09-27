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
    const rolls = ('rolls' in this.props.score) ? this.props.score.rolls : ["-","-"];
    const total = ('total' in this.props.score) ? this.props.score.total : "-";
    return (
      <div className="ScoreFrame">
        <div className="topRow">
          {rolls.join(" ")}
        </div>
        <div className="totalScore">
          {total}
        </div>
      </div>
    );
  }
}

export default ScoreFrame;
