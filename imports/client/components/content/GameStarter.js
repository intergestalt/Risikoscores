import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  setGameStarted,
  getGameStarted,
  setGameConfig
} from '../../../helper/actions';

class GameStarter extends React.Component {
  constructor(props) {
    super(props);
    this.startCallback = this.startCallback.bind(this);
  }

  startCallback(e) {
    setGameConfig(this.props.data);
    setGameStarted(true);
  }

  render() {
    return <div onClick={this.startCallback}>Start Game</div>;
  }
}
GameStarter.propTypes = {
  data: PropTypes.object
};

export default GameStarter;
