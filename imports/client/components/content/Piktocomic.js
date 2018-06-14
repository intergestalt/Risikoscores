import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  exists,
  localeStr,
  percentFromValue,
  pointInRect
} from '../../../helper/global';
import { isImage, getImageAsset } from '../../../helper/asset.js';
import { setPlayAudio, setPlayAudioFile } from '../../../helper/actions';
import { Image } from '../';

class Piktocomic extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.normalLoaded = this.normalLoaded.bind(this);
    this.patientLoaded = this.patientLoaded.bind(this);
    this.doctorLoaded = this.doctorLoaded.bind(this);
    this.state = {
      patientLoaded: false,
      doctorLoaded: false,
      normalLoaded: false,
      normalVisible: true,
      patientVisible: false,
      doctorVisible: false
    };
  }
  handleMouseOver(e) {
    const height = this.imgElem.clientHeight;
    const width = this.imgElem.clientWidth;
    this.setState({ height, width });
  }
  handleMouseOut(e) {
    this.setState({
      normalVisible: true,
      patientVisible: false,
      doctorVisible: false
    });
    setPlayAudio(false);
  }
  handleMouseMove(e) {
    if (!this.state.patientLoaded) return;
    if (!this.state.doctorLoaded) return;
    if (!this.state.normalLoaded) return;
    var x = e.nativeEvent.offsetX;
    var y = e.nativeEvent.offsetY;
    const width = this.state.width;
    const height = this.state.height;
    var px = percentFromValue(x, width);
    var py = percentFromValue(y, height);
    var patientRect = this.props.data.patientRect;
    var doctorRect = this.props.data.doctorRect;
    if (pointInRect({ x: px, y: py }, patientRect)) {
      if (!this.state.patientVisible) {
        this.setState({
          normalVisible: false,
          patientVisible: true,
          doctorVisible: false
        });
        setPlayAudio(false);
        setTimeout(() => {
          setPlayAudioFile('comic1.mp3');
          setPlayAudio(true);
        }, 1);
      }
    } else if (pointInRect({ x: px, y: py }, doctorRect)) {
      if (!this.state.doctorVisible) {
        this.setState({
          normalVisible: false,
          patientVisible: false,
          doctorVisible: true
        });
        setPlayAudio(false);
        setTimeout(() => {
          setPlayAudioFile('comic2.mp3');
          setPlayAudio(true);
        }, 1);
      }
    } else {
      setPlayAudio(false);
      this.setState({
        normalVisible: true,
        patientVisible: false,
        doctorVisible: false
      });
    }
  }
  normalLoaded() {
    const height = this.imgElem.clientHeight;
    const width = this.imgElem.clientWidth;
    this.setState({ height, width, normalLoaded: true });
  }
  patientLoaded() {
    this.setState({ patientLoaded: true });
  }
  doctorLoaded() {
    this.setState({ doctorLoaded: true });
  }
  render() {
    const normal = getImageAsset(
      this.props.data.normal,
      this.props.data.context.room,
      this.props.data.context.tab
    );
    const doctor = getImageAsset(
      this.props.data.doctor,
      this.props.data.context.room,
      this.props.data.context.tab
    );
    const patient = getImageAsset(
      this.props.data.patient,
      this.props.data.context.room,
      this.props.data.context.tab
    );
    var text = null;
    if (this.state.doctorVisible) {
      var speaker = localeStr(doctor.speaker);
      var text = localeStr(doctor.text);

      text = text = (
        <Caption>
          <Text bold={true}>{speaker}: </Text>
          <Text bold={false}>{text}</Text>
        </Caption>
      );
    } else if (this.state.patientVisible) {
      var speaker = localeStr(patient.speaker);
      var text = localeStr(patient.text);
      text = text = (
        <Caption>
          <Text bold={true}>{speaker}: </Text>
          <Text bold={false}>{text}</Text>
        </Caption>
      );
    } else {
      text = text = (
        <Caption>
          <Text bold={true}>&nbsp;</Text>
          <Text bold={false}>&nbsp;</Text>
        </Caption>
      );
    }
    return (
      <span>
        <PiktoDiv
          onMouseMove={this.handleMouseMove}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
        >
          <ImageSpan2 visible={this.state.normalVisible}>
            <Image
              asset={normal}
              imgRef={elem => {
                this.imgElem = elem;
              }}
              onLoad={this.normalLoaded}
            />
          </ImageSpan2>
          <ImageSpan visible={this.state.doctorVisible}>
            <Image asset={doctor} onLoad={this.doctorLoaded} />
          </ImageSpan>
          <ImageSpan visible={this.state.patientVisible}>
            <Image asset={patient} onLoad={this.patientLoaded} />
          </ImageSpan>
        </PiktoDiv>
        {text}
      </span>
    );
  }
}
Piktocomic.propTypes = {};

export default Piktocomic;

var PiktoDiv = styled.div`
  position: relative;
  width: 100%;
  heigth: 100%;
`;
var Text = styled.span`
  font-weight: ${props => (props.bold ? '900' : 'normal')};
  ${props => (props.bold ? 'color: #000000' : '')};
  position: relative;
`;
var Caption = styled.div`
  padding-top: 1em;
  margin-right: 1em;
  margin-left: 1em;
  height: 4em;
  text-align: center;
  position: relative;
`;
var ImageSpan2 = styled.span`
  position: relative;
  width: 100%;
  opacity: ${props => (props.visible ? '1' : '0')};
`;
var ImageSpan = styled.span`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  opacity: ${props => (props.visible ? '1' : '0')};
`;
