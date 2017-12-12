import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';

import { Image, Close } from './';
import {
  isTabDetail,
  getTabSlider,
  getTabDetailIndex,
  setTabDetail,
  setTabDetailIndex
} from '../../helper/actions';
import { colors, dist } from '../../config/styles';

class ImageDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.clickCallback = this.clickCallback.bind(this);
  }
  clickCallback(e) {
    e.preventDefault();
    setTabDetail(false, -1);
  }

  prev() {
    const n = getTabSlider().list.length;
    const i = getTabDetailIndex();
    const new_i = i > 1 ? i - 1 : n - 1;
    setTabDetailIndex(new_i)
  }

  next() {
    const n = getTabSlider().list.length;
    const i = getTabDetailIndex();
    const new_i = i < n - 1 ? i + 1 : 0;
    setTabDetailIndex(new_i)
  }

  render() {
    if (!this.props.visible) {
      return null;
    }
    const slider = getTabSlider();
    //this is a list of all annotated assets;
    console.log(slider);
    const startIndex = getTabDetailIndex();
    //this is the start index.
    const asset = slider.list[startIndex];
    return (
      <Container className="ImageDetailView">
        <Close onClick={e => {
          this.clickCallback(e);
        }}
        />
        <Prev onClick={this.prev}>&lt;</Prev>
        <Image imgStyles={imgStyles} asset={asset} />
        <Next onClick={this.next} >&gt;</Next>
      </Container>
    );
  }
}

export default withTracker(props => {
  return {
    visible: isTabDetail()
  };
})(ImageDetailView);

const Container = styled.div`
  position: fixed;
  top:0;
  left:0;
  height:100% !important;
  width: 100% !important;
  background-color: ${colors.shade};
  z-index: 11;
`

const imgStyles = `
height:100%; 
width:70%; 
margin:auto;
object-fit: contain;
`;

const Nav = styled.div`
  position: absolute;
  width:15%;
  color:white;
  top:50%;
  font-size: 5vh;  
  text-align: center;
  cursor: pointer;
  user-select: none;
`

const Prev = Nav.extend`
  left:0;
`

const Next = Nav.extend`
  right:0;
`
