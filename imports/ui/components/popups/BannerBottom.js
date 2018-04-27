import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { colors, dist } from '../../../config/styles';
import { getPopupClosing, getLanguage } from '../../../helper/actions';
import { getBottomAnimations } from '../../../helper/popup';
import { exists, localeStr } from '../../../helper/global';
import { Image, ClosePopup } from '../.';

class BannerBottom extends React.Component {
  constructor(props) {
    super(props);
    this.clickCallback = this.clickCallback.bind(this);
    this.imageLoaded = this.imageLoaded.bind(this);
    this.state = { popupLoaded: false };
  }
  clickCallback(e, nodeId) {
    const lang = getLanguage();
    const popup = this.props.popup;
    const path = '/rooms/' + popup.targetRoomId + '?language=' + lang;
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
        <div onClick={this.clickCallback} className="BannerImage">
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

export default withRouter(BannerBottom);

const anim = getBottomAnimations();
const moveIn = anim.moveIn;
const moveOut = anim.moveOut;

var PopupDiv = styled.div`
  position: absolute;
  bottom: 0px;
  opacity: ${props => (props.popupLoaded ? '1' : '0')};
  width: 100%;
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
