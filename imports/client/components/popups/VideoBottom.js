import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { colors, dist } from '../../../config/styles';
import { getPopupClosing } from '../../../helper/actions';
import { getBottomAnimations } from '../../../helper/popup';
import { exists, localeStr } from '../../../helper/global';
import { Image, ClosePopup } from '../.';
import { Link } from '../../../client/components/content';

class VideoBottom extends React.Component {
  constructor(props) {
    super(props);

    this.videoLoaded = this.videoLoaded.bind(this);
    this.clickCallback = this.clickCallback.bind(this);
    this.resize = this.resize.bind(this);
    this.state = { popupLoaded: false };
    this.timer = null;
  }
  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
    clearTimeout(this.timer);
  }

  clickCallback(e, nodeId) {
    const lang = getLanguage();
    const popup = this.props.popup;
    const path = '/rooms/' + popup.targetRoomId + '?language=' + lang;
    this.props.history.push(path);
  }

  resize() {
    this.setVideoSize();
  }

  videoLoaded() {
    const width = this.iFrameElem.clientWidth;
    const height = this.iFrameElem.clientHeight;
    this.iFrameElem.removeAttribute('width');
    this.iFrameElem.removeAttribute('height');
    this.iFrameElem.setAttribute('data-aspectRatio', height / width);

    this.setVideoSize();
    moveIn = anim.moveIn;
    moveOut = anim.moveOut;
    this.timer = setTimeout(() => {
      this.setState({ popupLoaded: true });
    }, 2000);
  }
  setVideoSize() {
    var newWidth = this.videoContainerElem.clientWidth;
    var f = null;
    if (this.props.big) {
      f = 3;
    } else {
      f = 5;
    }
    var newHeight = newWidth / f;
    this.iFrameElem.setAttribute('width', newWidth);
    this.iFrameElem.setAttribute(
      'height',
      newWidth * this.iFrameElem.getAttribute('data-aspectRatio')
    );
    this.videoContainerElem.style.height = newHeight + 'px';
  }
  render() {
    const popup = this.props.popup;
    var video = null;
    var p = null;
    if (this.props.big) {
      p = {
        pointerEvents: 'none',
        transform: 'translateY(-20%) scale(1.05)'
      };
    } else {
      p = {
        pointerEvents: 'none',
        transform: 'translateY(-30%) scale(1.05)'
      };
    }
    if (exists(popup.image)) {
      const url = localeStr(popup.image);
      const videoUrl =
        'https://www.youtube.com/embed/' +
        url +
        '?autoplay=1&controls=0&fs=0&loop=1&modestbranding=1&rel=0&showinfo=0&color=white&iv_load_policy=3&playlist=' +
        url;
      image = (
        <iframe
          ref={elem => {
            this.iFrameElem = elem;
          }}
          onLoad={this.videoLoaded}
          style={p}
          id="ytplayer"
          type="text/html"
          width="720"
          height="405"
          src={videoUrl}
          frameBorder="0"
          allowFullScreen
        />
      );
    }
    return (
      <PopupDiv
        className="Popup"
        innerRef={elem => {
          this.videoContainerElem = elem;
        }}
        popupLoaded={this.state.popupLoaded}
        popupClosing={this.props.popupClosing}
      >
        {image}
        <ClosePopup />
        <PopupLink>
          <Link text={localeStr(popup.title)} room={popup.targetRoomId} />
        </PopupLink>
      </PopupDiv>
    );
  }
}

VideoBottom.propTypes = {
  popup: PropTypes.object,
  popupClosing: PropTypes.bool
};

export default withRouter(VideoBottom);

const anim = getBottomAnimations();
const moveIn = anim.moveIn;
const moveOut = anim.moveOut;

var PopupLink = styled.span`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: #ffffff;
`;

var PopupDiv = styled.span`
  position: absolute;
  bottom: ${props => (props.popupLoaded ? '0px' : '-2000px')};
  opacity: ${props => (props.popupLoaded ? '1' : '0')};
  width: 100%;
  z-index: 20;
  overflow: hidden;
  ${props =>
    props.popupLoaded
      ? props =>
          props.popupClosing
            ? `animation: ${moveOut} 200ms ease-in-out;`
            : `animation: ${moveIn} 200ms ease-in-out;`
      : ''};
`;
