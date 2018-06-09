import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import styled, { keyframes } from 'styled-components';
import { colors, dist } from '../../../config/styles';
import { withRouter } from 'react-router-dom';

import { getPopupClosing, getLanguage } from '../../../helper/actions';
import { getTopRightAnimations } from '../../../helper/popup';
import { exists, localeStr } from '../../../helper/global';
import { Image, ClosePopup } from '../.';

class BannerTopRight extends React.Component {
  constructor(props) {
    super(props);
    this.imageLoaded = this.imageLoaded.bind(this);
    this.clickCallback = this.clickCallback.bind(this);
    this.state = { popupLoaded: false };
  }

  clickCallback(e, nodeId) {
    const lang = getLanguage();
    const popup = this.props.popup;
    const path = '/rooms/' + popup.targetRoomId + '?language=' + lang;
    console.log('path ' + path);
    this.props.history.push(path);
  }

  imageLoaded() {
    this.setState({ popupLoaded: true });
  }

  render() {
    const popup = this.props.popup;
    var image = null;
    if (exists(popup.image)) {
      const asset = {
        name: localeStr(popup.image),
        folder: 'popups'
      };
      image = (
        <div onClick={this.clickCallback}>
          <Image
            imgRef={elem => {
              this.imgElem = elem;
            }}
            asset={asset}
            onLoad={this.imageLoaded}
          />
        </div>
      );
    }

    return (
      <PopupDiv
        className="Popup"
        popupLoaded={this.state.popupLoaded}
        popupClosing={this.props.popupClosing}
      >
        <ClosePopup />
        {image}
      </PopupDiv>
    );
  }
}

BannerTopRight.propTypes = {
  popup: PropTypes.object,
  popupClosing: PropTypes.bool
};
export default withRouter(BannerTopRight);

const anim = getTopRightAnimations();
const moveIn = anim.moveIn;
const moveOut = anim.moveOut;

var PopupDiv = styled.div`
  position: absolute;
  opacity: ${props => (props.popupLoaded ? '1' : '0')};
  right: 0px;
  top: 0px;
  width: 200px;
  z-index: 20;
  cursor: pointer;

  ${props =>
    props.popupLoaded
      ? props =>
          props.popupClosing
            ? `animation: ${moveOut} 200ms ease-in-out;`
            : `animation: ${moveIn} 200ms ease-in-out;`
      : ''};
`;
