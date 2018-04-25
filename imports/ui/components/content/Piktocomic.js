import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { exists, percentFromValue, pointInRect } from '../../../helper/global';
import { isImage, getImageAsset } from '../../../helper/asset.js';

import { Image } from '../';

class Piktocomic extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
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
      this.setState({
        normalVisible: false,
        patientVisible: true,
        doctorVisible: false
      });
    } else if (pointInRect({ x: px, y: py }, doctorRect)) {
      this.setState({
        normalVisible: false,
        patientVisible: false,
        doctorVisible: true
      });
    } else {
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
    return (
      <PiktoDiv
        onMouseMove={this.handleMouseMove}
        onMouseOver={this.handleMouseOver}
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
