import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import styled, { keyframes } from 'styled-components';
import { colors, dist } from '../../config/styles';

import {
  getPopupActive,
  getPopupClosing,
  setPopupActive,
  getPopupRoom,
  getSelectedRoomId,
  getGameStarted
} from '../../helper/actions';
import { getPopup } from '../../helper/popup';
import { exists, localeStr } from '../../helper/global';
import { Image, ClosePopup } from './';
import {
  BannerBottom,
  BannerTopRight,
  VideoBottom,
  ArribaSpiel,
  PictoComic
} from './popups';

class Popup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.gameStarted) return null;
    if (this.props.popupActive) {
      const popup = this.props.popup;
      console.log(popup.type);
      if (popup.type == 'bannerBottom') {
        return (
          <BannerBottom popup={popup} popupClosing={this.props.popupClosing} />
        );
      } else if (popup.type == 'videoBottom') {
        console.log('Small');
        return (
          <VideoBottom
            big={false}
            popup={popup}
            popupClosing={this.props.popupClosing}
          />
        );
      } else if (popup.type == 'videoBottomBig') {
        console.log('Big');
        return (
          <VideoBottom
            big={true}
            popup={popup}
            popupClosing={this.props.popupClosing}
          />
        );
      } else if (popup.type == 'bannerTopRight') {
        return (
          <BannerTopRight
            popup={popup}
            popupClosing={this.props.popupClosing}
          />
        );
      } else if (popup.type == 'PictoComic') {
        return (
          <PictoComic popup={popup} popupClosing={this.props.popupClosing} />
        );
      } else if (popup.type == 'ArribaSpiel') {
        return (
          <ArribaSpiel popup={popup} popupClosing={this.props.popupClosing} />
        );
      }
    }
    return null;
  }
}

Popup.propTypes = {};

export default withTracker(props => {
  var active = getPopupActive();
  var closing = getPopupClosing();
  var popup = null;
  if (active) {
    if (getPopupRoom() != getSelectedRoomId()) {
      setPopupActive(false);
      active = false;
    } else {
      popup = getPopup();
      if (!exists(popup)) {
        setPopupActive(false);
        active = false;
      }
    }
  }
  return {
    popup: popup,
    popupActive: active,
    popupClosing: closing,
    gameStarted: getGameStarted()
  };
})(Popup);
