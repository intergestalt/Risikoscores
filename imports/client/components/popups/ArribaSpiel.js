import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { colors, dist } from '../../../config/styles';
import { getPopupClosing, getLanguage } from '../../../helper/actions';
import { getBottomAnimations, getPopupUrl } from '../../../helper/popup';
import { exists, existsString, localeStr } from '../../../helper/global';
import { Image, ClosePopup } from '../.';
import GameCharacterImage from '../GameCharacterImage';

class ArribaSpiel extends React.Component {
  constructor(props) {
    super(props);
    this.clickCallback = this.clickCallback.bind(this);
    this.imageLoaded1 = this.imageLoaded1.bind(this);
    this.imageLoaded2 = this.imageLoaded2.bind(this);
    this.imageLoaded3 = this.imageLoaded3.bind(this);
    this.state = {
      popupLoaded1: false,
      popupLoaded2: false,
      popupLoaded3: false
    };
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
    const asset1 = {
      image: localeStr(popup.text1),
      name: '',
      family: ''
    };
    const asset2 = {
      image: localeStr(popup.text2),
      name: '',
      family: ''
    };
    const asset3 = {
      image: localeStr(popup.text3),
      name: '',
      family: ''
    };
    console.log(asset3);
    image = (
      <div onClick={this.clickCallback} className="BannerImage">
        <ImagesDiv>
          <ImageDiv1>
            <Character>
              <CharacterImage onLoad={this.imageLoaded1} character={asset1} />
            </Character>
          </ImageDiv1>
          <ImageDiv2>
            <Character>
              <CharacterImage onLoad={this.imageLoaded2} character={asset2} />
            </Character>
          </ImageDiv2>
          <ImageDiv3>
            <Character>
              <CharacterImage onLoad={this.imageLoaded3} character={asset3} />
            </Character>
          </ImageDiv3>
        </ImagesDiv>
        <Title>{localeStr(popup.title)}</Title>
      </div>
    );
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
        {image}

        <ClosePopup />
      </PopupDiv>
    );
  }
}

ArribaSpiel.propTypes = {
  popup: PropTypes.object,
  popupClosing: PropTypes.bool
};

export default withRouter(ArribaSpiel);

const anim = getBottomAnimations();
const moveIn = anim.moveIn;
const moveOut = anim.moveOut;

var PopupDiv = styled.div`
  position: absolute;
  bottom: ${props => (props.popupLoaded ? '0px' : '-2000px')};
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
var ImagesDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
var ImageDiv1 = styled.div`
  display: block;
  position: relative;
  width: 33.33%;
  background-color: ${colors.orange};
`;
var ImageDiv2 = styled.div`
  display: block;
  position: relative;
  width: 33.34%;
  background-color: ${colors.turqoise};
`;
var ImageDiv3 = styled.div`
  display: block;
  position: relative;
  width: 33.33%;
  background-color: ${colors.magenta};
`;
var Title = styled.div`
  display: block;
  position: relative;
  width: 100%;
  background-color: ${colors.verylightgrey};
`;
const CharacterImage = styled(GameCharacterImage)``;

const Character = styled.div`
  display: flex;
`;
/*
          <Image
            imgRef={elem => {
              this.imgElem = elem;
            }}
            asset={asset3}
            onLoad={this.imageLoaded3}
          />
*/
