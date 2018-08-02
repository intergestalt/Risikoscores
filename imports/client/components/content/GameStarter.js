import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { keyframes } from 'styled-components';

import { setGameStarted, setGameConfig } from '../../../helper/actions';
import { Image } from '../';

class GameStarter extends React.Component {
  constructor(props) {
    super(props);
    this.startCallback = this.startCallback.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.state = {
      selected: false,
      animation: false
    };
  }

  startCallback(e) {
    this.setState({ selected: false });
    setGameConfig(this.props.data);
    setGameStarted(true);
  }
  handleMouseOver(e) {
    this.setState({ selected: true, animation: true });
  }
  handleMouseOut(e) {
    this.setState({ selected: false });
  }
  render() {
    const icon = {
      type: 'image',
      name: 'game.png',
      folder: 'game'
    };
    return (
      <center>
        <Img
          animation={this.state.animation}
          selected={this.state.selected}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          onClick={this.startCallback}
        >
          <Image asset={icon} />
        </Img>
      </center>
    );
  }
}
GameStarter.propTypes = {
  data: PropTypes.object
};

export default GameStarter;

const moveOut = keyframes`
                    0% {
                      transform: scale(1.05);
                      opacity:0.9;
                    }
                    100% {
                      transform: scale(1);                      
                      opacity:1;
                    }
                    `;
const moveIn = keyframes`
                    0% {
                      transform: scale(1);
                      opacity:1;
                    }
                    100% {
                      transform: scale(1.05);
                      opacity:0.9;
                    }
                    `;

const Img = styled.div`
  padding-bottom: 1em;
  width: 100%;
  transform: ${props => (props.selected ? 'scale(1.05)' : 'scale(1)')};
  opacity: ${props => (props.selected ? '0.9' : '1')};
  cursor: pointer;
  ${props =>
    props.animation
      ? props.selected
        ? `animation: ${moveIn} 100ms;`
        : `animation: ${moveOut} 100ms;`
      : ''};
`;
