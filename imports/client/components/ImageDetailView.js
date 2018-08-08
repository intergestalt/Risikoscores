import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';
import { contain } from 'intrinsic-scale';
import ResizeAware from 'react-resize-aware';

import { Image, Close } from './';
import {
  isTabDetail,
  getTabSlider,
  getTabDetailIndex,
  setTabDetail,
  setTabDetailIndex
} from '../../helper/actions';
import { Loading } from './';
import { Annotation } from './content/';
import { dist, snippets, colors } from '../../config/styles';

class ImageDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      positioned: false,
    }
    this.clickCallback = this.clickCallback.bind(this);
    this.adjustCaptionWidth = this.adjustCaptionWidth.bind(this);
    this.handleImgLoad = this.adjustCaptionWidth;
    this.handleResize = this.adjustCaptionWidth;
    this.prev = this.prev.bind(this)
    this.next = this.next.bind(this)
  }
  clickCallback(e) {
    e.preventDefault();
    setTabDetail(false, -1);
  }

  adjustCaptionWidth(event, repeat = 0, prevWidth = null) {
    const img = this.imgElem;
    const dim = contain(img.width, img.height, img.naturalWidth, img.naturalHeight);
    this.setState({ captionWidth: dim.width + 'px' }, () => {
      if (dim.width != prevWidth && repeat < 10) {
        this.adjustCaptionWidth(null, repeat + 1, dim.width)
      } else {
        this.adjustCaptionPosition(img.height - dim.height);
      }
    })
  }

  adjustCaptionPosition(topOffset) {
    this.setState({ captionTopOffset: (-topOffset / 2) + 'px', positioned: true })
  }

  prev() {
    this.setState({ positioned: false });
    const n = getTabSlider().list.length;
    const i = getTabDetailIndex();
    const new_i = i > 1 ? i - 1 : n - 1;
    setTabDetailIndex(new_i)
  }

  next() {
    this.setState({ positioned: false });
    const n = getTabSlider().list.length;
    const i = getTabDetailIndex();
    const new_i = i < n - 1 ? i + 1 : 0;
    setTabDetailIndex(new_i)
  }

  renderLoading() {
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    )
  }

  render() {
    if (!this.props.visible) {
      return null;
    }
    const slider = getTabSlider();
    //this is a list of all annotated assets;
    const startIndex = getTabDetailIndex();
    //this is the start index.
    const asset = slider.list[startIndex];
    return (
      <Container className="ImageDetailView">
        <Close onClick={e => {
          this.clickCallback(e);
        }}
        />
        {!this.state.positioned && this.renderLoading()}
        {slider.list.length > 1 && <Prev onClick={this.prev}>&lt;</Prev>}
        <FigureContainer visible={this.state.positioned}>
          <Figure>
            <ImgContainer
              onlyEvent
              onResize={this.handleResize}
              className="ImgContainer"
            >
              <Image
                imgStyles={imgStyles}
                size="fullscreen"
                asset={asset}
                imgRef={(elem) => { this.imgElem = elem; }}
                onLoad={(this.handleImgLoad)}
              />
            </ImgContainer>
            <Figcaption width={this.state.captionWidth} top={this.state.captionTopOffset}>
              <Annotation
                clickCallback={this.props.clickCallback}
                asset={asset}
              />
            </Figcaption>
          </Figure>
        </FigureContainer>
        {slider.list.length > 1 && <Next onClick={this.next} >&gt;</Next>}
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
const FigureContainer = styled.div`
  display: flex;
  height:100%; 
  visibility: ${ (props) => (props.visible ? 'visible' : 'hidden')};
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  height: 100%;
`;

const Figure = styled.figure`
  width:70%; 
  max-height:100%;
  margin:auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ImgContainer = styled(ResizeAware)`
  display: flex;
  overflow: hidden;
`

const imgStyles = `
  width: 100%;
  object-fit: contain;
`;

const Figcaption = styled.figcaption`
  display: block;
  color: white;
  margin: auto;
  margin-top: 0;
  max-height: 50vh;
  position: relative;
  width: ${ (props) => props.width || 'auto'};
  top: ${ (props) => props.top || '0'};
  margin-bottom: calc( -1em + ${ dist.lineBottomDiff});
  p {
    padding-left: 0 !important;
    padding-right 0 !important;
  }
`

const Nav = styled.div`
  position: absolute;
  width:15%;
  color:white;
  top:50%;
  transform: translateY(-50%);
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
