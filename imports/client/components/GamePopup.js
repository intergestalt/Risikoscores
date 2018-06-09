import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { colors, dist } from '../../config/styles';
import { getPopupClosing, getLanguage } from '../../helper/actions';
import { getLeftAnimations, getRightAnimations } from '../../helper/popup';
import { exists, localeStr } from '../../helper/global';
import { Image, ClosePopup } from '.';

class GamePopup extends React.Component {
  constructor(props) {
    super(props);
    this.imageLoaded = this.imageLoaded.bind(this);
    this.state = { popupLoaded: false };
  }
  imageLoaded() {
    console.log('loaded: ' + this.state.popupLoaded);
    this.setState({ popupLoaded: true });
  }

  render() {
    if (!this.props.visible) return null;
    var image = null;
    const asset = {
      name: this.props.image,
      folder: 'game'
    };

    image = (
      <div>
        <Image asset={asset} onLoad={this.imageLoaded} />
      </div>
    );

    return (
      <PopupDiv
        className="Popup"
        left={this.props.toastLeft}
        popupLoaded={this.state.popupLoaded}
        popupClosing={this.props.hideToast}
      >
        {image}
        <div>{this.props.text}</div>
      </PopupDiv>
    );
  }
}

GamePopup.propTypes = {
  image: PropTypes.string,
  text: PropTypes.string
};

export default GamePopup;

const anim1 = getLeftAnimations();
const moveIn1 = anim1.moveIn;
const moveOut1 = anim1.moveOut;

const anim2 = getRightAnimations();
const moveIn2 = anim2.moveIn;
const moveOut2 = anim2.moveOut;

var PopupDiv = styled.div`
  position: absolute;
  left: ${props =>
    props.left ? props => (props.popupLoaded ? '0px' : '-2000px') : ''};
  right: ${props =>
    !props.left ? props => (props.popupLoaded ? '0px' : '2000px') : ''};
  opacity: ${props => (props.popupLoaded ? '1' : '0')};
  width: 20%;
  z-index: 20;
  bottom: 0;
  cursor: pointer;
  background-color: ${colors.verylightgrey};
  ${props =>
    props.popupLoaded
      ? props =>
          props.left
            ? props =>
                props.popupClosing
                  ? `animation: ${moveOut1} 200ms ease-in-out;`
                  : `animation: ${moveIn1} 200ms ease-in-out;`
            : props =>
                props.popupClosing
                  ? `animation: ${moveOut2} 200ms ease-in-out;`
                  : `animation: ${moveIn2} 200ms ease-in-out;`
      : ''};
`;
