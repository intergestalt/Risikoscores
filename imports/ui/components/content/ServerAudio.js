import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { getSelectedTabId, getSelectedRoomId } from '../../../helper/actions';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import ReactStateAnimation from 'react-state-animation';

import { dist } from '../../../config/styles';

class ServerAudio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: 0
    }
    this.handlePowerButtonPress = this.handlePowerButtonPress.bind(this);
    this.handleVolumeButtonPress = this.handleVolumeButtonPress.bind(this);
    this._animate = new ReactStateAnimation(this);
    this.maxVol = 0.5;
    this.minVol = 0.02; // must be different from initial value
  }

  componentWillUnmount() {
    //this._animate.linearInOut('volume', 0, 50)
    setTimeout(
      () => { Session.set("powerOn", true) }
      , 1500)
  }

  componentDidMount() {
    if (this.props.serverMute) {
      this.setState({ volume: this.minVol })
    } else {
      this._animate.linearInOut('volume', this.maxVol, 3000)
    }
  }

  handlePowerButtonPress() {
    if (!this.props.powerOn) {
      Session.set("powerWasOff", true)
    }
    Session.set("powerOn", !this.props.powerOn)
  }

  handleVolumeButtonPress() {
    this._animate.stop()
    const loud = this.state.volume > ((this.minVol + this.maxVol) / 2)
    const volume = loud ? this.minVol : this.maxVol;
    this._animate.linearInOut('volume', volume, 200)
    Session.set("serverMute", loud)
  }

  renderAudio() {
    const file = this.props.file
    if (!file) return false;

    return (
      <Audio src={file} autoPlay loop innerRef={(audio) => { this.audio = audio; }}></Audio>
    )
  }

  shouldComponentUpdate(newProps, newState) {
    if (this.state.volume != newState.volume) {
      this.audio.volume = newState.volume;
    }
    return true;
  }

  componentWillUpdate(newProps, newState) {
    if (this.props.powerOn != newProps.powerOn) {
      this._animate.stop()
      this._animate.linearInOut('volume', newProps.powerOn * this.maxVol, 500)
    }
  }

  renderSource() {
    const source = this.props.source
    if (!source) return false;

    return (
      <Source>{source}</Source>
    )
  }

  renderPowerButton() {
    style = {
      fill: this.props.powerOn ? "green" : "red",
      cursor: "hand",
      WebkitCursor: "hand",
    }
    return (
      <Button onClick={this.handlePowerButtonPress} title={this.props.text}>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000">
          <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
          <metadata> Icon made from Icon Fonts is licensed by CC BY 3.0 </metadata>
          <Path powerOn={this.props.powerOn} style={style} d="M500,10C229.4,10,10,229.4,10,500c0,270.6,219.4,490,490,490c270.6,0,490-219.4,490-490C990,229.4,770.6,10,500,10z M450.5,139c0-27.3,22.2-49.5,49.5-49.5c27.3,0,49.5,22.1,49.5,49.5v340.7c0,27.3-22.1,49.5-49.5,49.5c-27.3,0-49.5-22.2-49.5-49.5L450.5,139L450.5,139z M500,861.9c-191.2,0-346.7-155.5-346.7-346.7c0-124,67-239.4,174.9-301.1c23.7-13.5,53.9-5.3,67.5,18.4c13.6,23.7,5.3,53.9-18.4,67.5c-77.1,44.1-125,126.6-125,215.2C252.3,651.8,363.4,763,500,763c136.6,0,247.8-111.1,247.8-247.8c0-88.6-47.9-171.1-125.1-215.2c-23.7-13.6-32-43.8-18.4-67.5c13.6-23.7,43.8-32,67.5-18.4c107.9,61.7,174.9,177,174.9,301.1C846.7,706.4,691.2,861.9,500,861.9z" />
        </svg>
      </Button>
    )
  }

  renderVolumeButton() {
    if (!this.props.powerWasOff) return;
    // https://github.com/encharm/Font-Awesome-SVG-PNG/blob/master/black/svg/volume-off.svg
    const quiet = <SpeakerSvg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1280 352v1088q0 26-19 45t-45 19-45-19l-333-333h-262q-26 0-45-19t-19-45v-384q0-26 19-45t45-19h262l333-333q19-19 45-19t45 19 19 45z" /></SpeakerSvg>
    // https://github.com/encharm/Font-Awesome-SVG-PNG/blob/master/black/svg/volume-up.svg
    const loud = <SpeakerSvg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M832 352v1088q0 26-19 45t-45 19-45-19l-333-333h-262q-26 0-45-19t-19-45v-384q0-26 19-45t45-19h262l333-333q19-19 45-19t45 19 19 45zm384 544q0 76-42.5 141.5t-112.5 93.5q-10 5-25 5-26 0-45-18.5t-19-45.5q0-21 12-35.5t29-25 34-23 29-36 12-56.5-12-56.5-29-36-34-23-29-25-12-35.5q0-27 19-45.5t45-18.5q15 0 25 5 70 27 112.5 93t42.5 142zm256 0q0 153-85 282.5t-225 188.5q-13 5-25 5-27 0-46-19t-19-45q0-39 39-59 56-29 76-44 74-54 115.5-135.5t41.5-173.5-41.5-173.5-115.5-135.5q-20-15-76-44-39-20-39-59 0-26 19-45t45-19q13 0 26 5 140 59 225 188.5t85 282.5zm256 0q0 230-127 422.5t-338 283.5q-13 5-26 5-26 0-45-19t-19-45q0-36 39-59 7-4 22.5-10.5t22.5-10.5q46-25 82-51 123-91 192-227t69-289-69-289-192-227q-36-26-82-51-7-4-22.5-10.5t-22.5-10.5q-39-23-39-59 0-26 19-45t45-19q13 0 26 5 211 91 338 283.5t127 422.5z" /></SpeakerSvg>
    const icon = this.state.volume < 0.1 ? quiet : loud;
    return (
      <span
        onClick={this.handleVolumeButtonPress}
      >{icon}</span>
    )
  }

  render() {
    return (
      <Container className="ServerAudio">
        {this.renderPowerButton()}
        {this.renderVolumeButton()}
        {this.renderAudio()}
        {this.renderSource()}
      </Container>
    );
  }
}

ServerAudio.propTypes = {
  source: PropTypes.string,
  audio: PropTypes.string,
  text: PropTypes.string,
};

export default withTracker(props => {
  let file = false
  if (props.audio) {
    const roomId = getSelectedRoomId();
    const tabId = getSelectedTabId();
    file = "/uploads/" + roomId + "/" + props.audio
  }
  return {
    file,
    powerOn: Session.get("powerOn"),
    powerWasOff: Session.get("powerWasOff"),
    serverMute: Session.get("serverMute")
  };
})(ServerAudio);

const Container = styled.div`
  margin-left: ${ dist.named.columnPadding};
  margin-bottom: 1rem;
`;

const Button = styled.div`
  width: 3rem;
  display:inline-block;
  &:hover {
    filter: drop-shadow(0px 0px 10px white);
  }  
`;

const Source = styled.small`
  display: block;
  margin-top: ${dist.tiny};
  font-size: 80%;
  text-align: left;
`

const blink = keyframes`
  from {
    visibility: visible;
  }
  to {
    visibility: hidden;
  }
`;

const Path = styled.path`
  ${ props => (!props.powerOn ? `animation: ${blink} 1.5s steps(2, start) infinite}` : null)}; 
`

const Audio = styled.audio`
  display: none;
`
const SpeakerSvg = styled.svg`
  width: 3rem;
  margin-left: ${dist.named.columnPadding};
  opacity: 0.9;
  height: auto;
  stroke: black;
  fill: black;
  cursor: pointer;
  &:hover {
    filter: drop-shadow(0px 0px 10px white);
  }
`;