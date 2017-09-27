import React, { Component } from 'react';
import ScoreFrame from '../ScoreFrame/ScoreFrame';
import './ScoreCard.css';

class ScoreCard extends Component {
  render() {
    var frames = []
    for (var i = 0; i < 10; i++) {
      const score = (i < this.props.score.length) ? this.props.score[i] : {};
      frames.push(<ScoreFrame key={i} score={score} />)
    }
    return (
      <div className="ScoreCard">
      SCORE
        <div className="frames">
          {frames}
        </div>
      </div>
    );
  }
}

export default ScoreCard;
