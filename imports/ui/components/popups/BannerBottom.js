import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';
import { colors, dist } from '../../../config/styles';

import { getPopupClosing } from '../../../helper/actions';
import { getBottomAnimations } from '../../../helper/popup';
import { exists, localeStr } from '../../../helper/global';
import { Image, ClosePopup } from '../.';

class BannerBottom extends React.Component {
  constructor(props) {
    super(props);

    this.imageLoaded = this.imageLoaded.bind(this);
    this.state = { popupLoaded: false };
  }

  imageLoaded() {
    const height = this.imgElem.clientHeight;
    const anim = getBottomAnimations(height);
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
        <div className="BannerImage">
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

BannerBottom.propTypes = {
  popup: PropTypes.object,
  popupClosing: PropTypes.bool
};

export default BannerBottom;

var PopupDiv = styled.div`
  position: absolute;
  bottom: 0px;
  opacity: ${props => (props.popupLoaded ? '1' : '0')};
  width: 100%;
  z-index: 20;
  ${props =>
    props.popupLoaded
      ? props =>
          props.popupClosing
            ? `animation: ${moveOut} 1s ease-in-out;`
            : `animation: ${moveIn} 1s ease-in-out;`
      : ''};
`;
