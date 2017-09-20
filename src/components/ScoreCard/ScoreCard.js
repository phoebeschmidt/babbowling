import React, { Component } from 'react';
import ScoreFrame from '../ScoreFrame/ScoreFrame';
import './ScoreCard.css';

class ScoreCard extends Component {
  render() {
    var frames = []
    for (var i = 0; i < 10; i++) {
      frames.push(<ScoreFrame />)
    }
    return (
      <div className="ScoreCard">
      "I'm the scorecard!"
        <div className="frames">
          {frames}
        </div>
      </div>
    );
  }
}

export default ScoreCard;
