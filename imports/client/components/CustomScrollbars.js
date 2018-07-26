import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import styled from 'styled-components';
import color from 'color';

import { dist, colors } from '../../config/styles';

class CustomScrollbars extends React.Component {
  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = {
      scrollTop: 0,
      scrollHeight: 0,
      clientHeight: 0,
      shadowTopOpacity: 0,
      shadowBottomOpacity: 0,
      shadowLeftOpacity: 0,
      shadowRightOpacity: 0,
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(values) {
    const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth } = values;
    // vertical
    const shadowTopOpacity = 1 / 20 * Math.min(scrollTop, 20);
    const bottomScrollTop = scrollHeight - clientHeight;
    const shadowBottomOpacity = 1 / 20 * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));
    // horizontal
    const shadowLeftOpacity = 1 / 20 * Math.min(scrollLeft, 20);
    const rightScrollLeft = scrollWidth - clientWidth;
    const shadowRightOpacity = 1 / 20 * (rightScrollLeft - Math.max(scrollLeft, rightScrollLeft - 20));
    // set state
    this.setState({ shadowTopOpacity, shadowBottomOpacity, shadowLeftOpacity, shadowRightOpacity });
  }

  renderThumb({ style, ...props }) {
    const thumbStyle = {
      backgroundColor: `rgba(0,0,255,0.25)`,
    };
    return (
      <div
        style={{ ...style, ...thumbStyle }}
        {...props} />
    );
  }

  renderTrackHorizontal({ style, ...props }) {
    const finalStyle = {
      ...style,
      right: 1,
      bottom: 0,
      left: 1,
      borderRadius: 0,
      zIndex: 2,
      backgroundColor: "transparent",
    };
    return <div style={finalStyle} {...props} />;
  }

  renderTrackVertical({ style, ...props }) {
    const finalStyle = {
      ...style,
      right: 0,
      bottom: 1,
      top: 1,
      borderRadius: 0,
      width: dist.tiny,
      zIndex: 2,
      backgroundColor: "transparent",
    };
    return <div style={finalStyle} {...props} />;
  }

  renderBlind() {
    return <div></div>;
  }


  render() {
    const { shadeColor, scrollbarsRef, blind, ...rest } = this.props;
    const scrollbars = <Scrollbars
      autoHide
      renderThumbHorizontal={blind ? this.renderBlind : this.renderThumb}
      renderThumbVertical={blind ? this.renderBlind : this.renderThumb}
      renderTrackHorizontal={blind ? this.renderBlind : this.renderTrackHorizontal}
      renderTrackVertical={blind ? this.renderBlind : this.renderTrackVertical}
      onUpdate={this.handleUpdate}
      ref={this.props.scrollbarsRef}
      {...rest}
    >
      {this.props.children}
    </Scrollbars>

    if (this.props.shadeColor) {
      return (
        <Container>
          {scrollbars}
          <TopShader style={{ opacity: this.state.shadowTopOpacity }} shadeColor={this.props.shadeColor} />
          <BottomShader style={{ opacity: this.state.shadowBottomOpacity }} shadeColor={this.props.shadeColor} />
          <LeftShader style={{ opacity: this.state.shadowLeftOpacity }} shadeColor={this.props.shadeColor} />
          <RightShader style={{ opacity: this.state.shadowRightOpacity }} shadeColor={this.props.shadeColor} />
        </Container>)
    } else {
      return scrollbars
    }

  }
}

CustomScrollbars.propTypes = {
  blind: PropTypes.bool,
  shadeColor: PropTypes.string,
  scrollbarsRef: PropTypes.func
};

export default CustomScrollbars;

const Container = styled.div`
  position:relative;
  height:100%;
  width: 100%;
`;

const TopShader = styled.div`
  z-index:1;
  position: absolute;
  height: 3em;
  width: 100%;
  content: '';  
  pointer-events: none;

  top: 0;
  background: linear-gradient(
    to bottom,
    ${props => color(props.shadeColor).opaquer(0.8).string()} 0%,
    ${props => color(props.shadeColor).fade(1).string()} 80%
  );
`;

const BottomShader = styled.div`
  z-index:1;
  position: absolute;
  height: 3em;
  width: 100%;
  content: '';  
  pointer-events: none;

  bottom: 0;
  background: linear-gradient(
    to top,
    ${props => color(props.shadeColor).opaquer(0.8).string()} 0%,
    ${props => color(props.shadeColor).fade(1).string()} 80%
  );
  `;

const LeftShader = styled.div`
  z-index:1;
  position: absolute;
  height: 100%;
  width: 3em;
  content: '';  
  pointer-events: none;

  left: 0;
  top:0;

  background: linear-gradient(
    to right,
    ${props => color(props.shadeColor).opaquer(0.8).string()} 0%,
    ${props => color(props.shadeColor).fade(1).string()} 80%
  );
  `;

const RightShader = styled.div`
  z-index:1;
  position: absolute;
  height: 100%;
  width: 3em;
  content: '';  
  pointer-events: none;

  right: 0;
  top:0;

  background: linear-gradient(
    to left,
    ${props => color(props.shadeColor).opaquer(0.8).string()} 0%,
    ${props => color(props.shadeColor).fade(1).string()} 80%
  );
  `;