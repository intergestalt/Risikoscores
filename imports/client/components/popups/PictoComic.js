import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { colors, snippets } from '../../../config/styles';
import {
  getPopupClosing,
  getLanguage,
  setPlayAudio,
  setPlayAudioFile
} from '../../../helper/actions';
import { getBottomAnimations, getPopupUrl } from '../../../helper/popup';
import { exists, existsString, localeStr } from '../../../helper/global';
import { Image, ClosePopup } from '../.';
import { getImageAsset } from '../../../helper/asset.js';

class PictoComic extends React.Component {
  constructor(props) {
    super(props);
    this.clickCallback = this.clickCallback.bind(this);
    this.imageLoaded1 = this.imageLoaded1.bind(this);
    this.imageLoaded2 = this.imageLoaded2.bind(this);
    this.imageLoaded3 = this.imageLoaded3.bind(this);
    this.timeout = null;

    this.state = {
      imageNum: 0,
      popupLoaded1: false,
      popupLoaded2: false,
      popupLoaded3: false,
      normalVisible: true,
      patientVisible: false,
      doctorVisible: false
    };
  }
  componentDidMount() {
    this.startComic();
  }
  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }
  startComic() {
    this.timeout = setTimeout(() => {
      this.nextComic();
    }, 2000);
  }
  nextComic() {
    var num = this.state.imageNum;
    num++;
    if (num > 2) num = 0;
    console.log(num);
    if (num == 0) {
      this.setState({
        imageNum: num,
        normalVisible: true,
        patientVisible: false,
        doctorVisible: false
      });
    } else if (num == 1) {
      this.setState({
        imageNum: num,
        normalVisible: false,
        patientVisible: false,
        doctorVisible: true
      });
      setPlayAudioFile('comic2.mp3');
      setPlayAudio(true);
    } else if (num == 2) {
      this.setState({
        imageNum: num,
        normalVisible: false,
        patientVisible: true,
        doctorVisible: false
      });
      setPlayAudioFile('comic1.mp3');
      setPlayAudio(true);
    }

    this.timeout = setTimeout(() => {
      this.nextComic();
    }, 5000);
  }

  clickCallback(e, nodeId) {
    const lang = getLanguage();
    const popup = this.props.popup;
    const target = getPopupUrl(popup.targetRoomId);
    var path = null;
    if (existsString(target.tabId)) {
      path =
        '/rooms/' +
        target.roomId +
        '?tabId=' +
        target.tabId +
        '&language=' +
        lang;
    } else {
      path = '/rooms/' + target.roomId + '?language=' + lang;
    }
    this.props.history.push(path);
  }
  imageLoaded1() {
    this.setState({ popupLoaded1: true });
  }
  imageLoaded2() {
    this.setState({ popupLoaded2: true });
  }
  imageLoaded3() {
    this.setState({ popupLoaded3: true });
  }

  render() {
    const popup = this.props.popup;
    var image = null;

    const normal = getImageAsset({ name: '1A_1.png' }, 'arztpraxis', 'tab1');
    const doctor = getImageAsset({ name: '1A_2.png' }, 'arztpraxis', 'tab1');
    const patient = getImageAsset({ name: '1A_3.png' }, 'arztpraxis', 'tab1');

    image = (
      <div onClick={this.clickCallback} className="PictoComic">
        <PiktoDiv>
          <ImageSpan2 visible={this.state.normalVisible}>
            <Image asset={normal} onLoad={this.imageLoaded1} />
          </ImageSpan2>
          <ImageSpan visible={this.state.patientVisible}>
            <Image asset={doctor} onLoad={this.imageLoaded2} />
          </ImageSpan>
          <ImageSpan visible={this.state.doctorVisible}>
            <Image asset={patient} onLoad={this.imageLoaded3} />
          </ImageSpan>
        </PiktoDiv>
      </div>
    );
    var text = (
      <div onClick={this.clickCallback} className="PictoComic">
        <Text>&nbsp; </Text>
      </div>
    );
    if (this.state.imageNum == 1) {
      text = (
        <div onClick={this.clickCallback} className="PictoComic">
          <Text>{localeStr(popup.text3)}</Text>
        </div>
      );
    } else if (this.state.imageNum == 2) {
      text = (
        <div onClick={this.clickCallback} className="PictoComic">
          <Text>{localeStr(popup.text2)}</Text>
        </div>
      );
    }
    console.log(
      'LOADED ' +
      (this.state.popupLoaded1 &&
        this.state.popupLoaded2 &&
        this.state.popupLoaded3)
    );
    return (
      <PopupDiv
        className="Popup"
        popupLoaded={
          this.state.popupLoaded1 &&
          this.state.popupLoaded2 &&
          this.state.popupLoaded3
        }
        popupClosing={this.props.popupClosing}
      >
        <Left>
          {image}
          {text}
        </Left>
        <Right onClick={this.clickCallback}>
          <RightText>
            {localeStr(popup.title)}
          </RightText>
        </Right>

        <ClosePopup />
      </PopupDiv>
    );
  }
}

PictoComic.propTypes = {
  popup: PropTypes.object,
  popupClosing: PropTypes.bool
};

export default withRouter(PictoComic);

const anim = getBottomAnimations();
const moveIn = anim.moveIn;
const moveOut = anim.moveOut;

var PopupDiv = styled.div`
  position: absolute;
  bottom: ${props => (props.popupLoaded ? '0px' : '-2000px')};
  opacity: ${props => (props.popupLoaded ? '1' : '0')};
  width: 100%;
  height: 33.333vh;
  z-index: 20;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  ${props =>
    props.popupLoaded
      ? props =>
        props.popupClosing
          ? `animation: ${moveOut} 200ms ease-in-out;`
          : `animation: ${moveIn} 200ms ease-in-out;`
      : ''};
`;

var Right = styled.div`
  width: 50%;
  text-align: center;
  background-color: ${colors.turqoise};
  display: flex;
`;

var RightText = styled.div`
  ${ snippets.popupHuge};
  margin: auto;
  &:after {
    content: "\\A>>>";
    white-space: pre;
    font-size: 500%;    
    position: relative;
    display: block;
    padding-top: 0.1ex;
  }
`;

var Left = styled.div`
  position: relative;
  width: 50%;
  background-color: ${colors.orange};
`;
var PiktoDiv = styled.div`
  position: relative;
`;

var ImageSpan2 = styled.span`
  position: relative;
  width: 100%;
  display: block;
  opacity: ${props => (props.visible ? '1' : '0')};
`;
var ImageSpan = styled.span`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  opacity: ${props => (props.visible ? '1' : '0')};
`;

var Text = styled.div`
  ${ snippets.standardTextPaddings};
`

/*
          <Image
            imgRef={elem => {
              this.imgElem = elem;
            }}
            asset={asset3}
            onLoad={this.imageLoaded3}
          />
*/
