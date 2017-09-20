import React, { Component } from 'react';
import pin from '../pin.png';
import ScoreCard from '../ScoreCard/ScoreCard';
import PlayCTA from '../PlayCTA/PlayCTA';
import './Game.css';

class Game extends Component {
  render() {
    return (
      <div className="Game">
        <div className="Game-header">
          <img src={pin} className="Game-logo" alt="logo" />
          <h2>Welcome to Babbowling!</h2>
        </div>
        <ScoreCard />
        <PlayCTA />
      </div>
    );
  }
}

export default Game;
