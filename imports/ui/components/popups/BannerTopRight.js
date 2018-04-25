import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import styled, { keyframes } from 'styled-components';
import { colors, dist } from '../../../config/styles';

import { getPopupClosing } from '../../../helper/actions';
import { getTopRightAnimations } from '../../../helper/popup';
import { exists, localeStr } from '../../../helper/global';
import { Image, ClosePopup } from '../.';

class BannerTopRight extends React.Component {
  constructor(props) {
    super(props);
    this.imageLoaded = this.imageLoaded.bind(this);
    this.state = { popupLoaded: false };
  }
  imageLoaded() {
    const height = this.imgElem.clientHeight;
    const width = this.imgElem.clientWidth;
    const anim = getTopRightAnimations(width, height);
    moveIn = anim.moveIn;
    moveOut = anim.moveOut;
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
        <div className="StreamPostImage">
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

export default BannerTopRight;

var PopupDiv = styled.div`
  position: absolute;
  opacity: ${props => (props.popupLoaded ? '1' : '0')};
  right: 0px;
  top: 0px;
  width: 200px;
  z-index: 20;
  ${props =>
    props.popupLoaded
      ? props =>
          props.popupClosing
            ? `animation: ${moveOut} 1s ease-in-out;`
            : `animation: ${moveIn} 1s ease-in-out;`
      : ''};
`;
