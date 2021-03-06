import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import color from 'color';
import { colors, dist } from '../../config/styles';

class StreamLoading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Container className="StreamLoading">
      <Dot>●</Dot><Dot>●</Dot><Dot>●</Dot>
    </Container>
      ;
  }
}
StreamLoading.propTypes = {
};

export default StreamLoading;

const dotsAnim = keyframes`
  /**
   * At the start of the animation the dot
   * has an opacity of .2
   */
  0% {
    opacity: .2;
  }
  /**
   * At 20% the dot is fully visible and
   * then fades out slowly
   */
  20% {
    opacity: 1;
  }
  /**
   * Until it reaches an opacity of .2 and
   * the animation can start again
   */
  100% {
    opacity: .2;
  }
`;

const Container = styled.div`
  display: inline-block;
  background-color: ${color(colors.lightgrey).fade(0.5).string()};
  padding: ${ dist.tiny};
  border-radius: ${dist.small};
  opacity: 0.7;
`;

const Dot = styled.span`
  /*font-size: 2em;*/
  color: ${ colors.darkgrey};
  &:not(:first-child) {
    /*padding-left:0.5ex;*/
  }
  animation-name: ${dotsAnim};
  animation-duration: 1.4s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  &:nth-child(2) {
    animation-delay: .2s;
  }
  &:nth-child(3) {
    animation-delay: .4s;
  }
`;

// Credits: https://martinwolf.org/blog/2015/01/pure-css-savingloading-dots-animation