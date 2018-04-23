import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import styled, { keyframes } from 'styled-components';
import { colors, dist } from '../../../config/styles';

import { getPopupClosing } from '../../../helper/actions';
import { exists, localeStr } from '../../../helper/global';
import { Image, ClosePopup } from '../.';

class BannerBottom extends React.Component {
  constructor(props) {
    super(props);
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
          <Image asset={asset} />
        </div>
      );
    }

    return (
      <PopupDiv className="Popup" popupClosing={this.props.popupClosing}>
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

const moveIn = keyframes`
0% {
  bottom:-100%;
}
100% {
  bottom:0%;
}
`;

const moveOut = keyframes`
0% {
  bottom:0%;
}
100% {
  bottom:-100%;
}
`;
var PopupDiv = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  z-index: 20;
  ${props =>
    props.popupClosing
      ? `animation: ${moveOut} 1s ease-in-out;`
      : `animation: ${moveIn} 1s ease-in-out;`};
`;
