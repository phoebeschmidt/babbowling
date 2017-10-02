import React, { Component } from 'react';
import pin from '../../pin.png';
import ScoreCard from '../ScoreCard/ScoreCard';
import BowlButton from '../BowlButton/BowlButton';
import NewGameButton from '../NewGameButton/NewGameButton';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../utils/reduxHelper';
import './Game.css';

class Game extends Component {
  render() {
    const congratulationsNote = (this.props.game.isGameEnded) ? `Congratulations! Game ended, you scored ${this.props.game.scoreTotal} points!` : "";
    return (
      <div className="Game">
        <div className="Game-header">
          <img src={pin} className="Game-logo" alt="logo" />
          <h2>Welcome to Babbowling!</h2>
        </div>
        <ScoreCard score={this.props.game.scoreCard} />
        <BowlButton onClick={this.props.actions.bowl} isGameEnded={this.props.game.isGameEnded} />
        <NewGameButton onClick={this.props.actions.startNewGame} />
        {congratulationsNote}
        <div className="Total Score">
          Score: {this.props.game.scoreTotal}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
