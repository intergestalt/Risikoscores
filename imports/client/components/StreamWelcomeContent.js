import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import ResizeAware from 'react-resize-aware';
import styled from 'styled-components';

import { getFragment } from '../../helper/fragment';
import { DiyMarkdown } from './';
import { getLanguage } from '../../helper/actions';

class StreamWelcomeContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      largeHeight: 0,
      mediumHeight: 0,
      smallHeight: 0,
      width: 0,
    }
    this.getHeights = this.getHeights.bind(this)
    this.getStateHeight = this.getStateHeight.bind(this)
  }

  componentDidMount() {
    this.getHeights()
  }

  componentDidUpdate() {
    //this.getHeights()
  }

  getHeights(values) {
    if (values && this.state.width != values.width) {
      this.setState({ width: values.width })
    } else if (values) {
      return
    }
    const largeHeight = this.elem.scrollHeight
    const mediumHeight = (this.elem).querySelector('p').scrollHeight + parseInt(getComputedStyle(this.elem).fontSize); // ...fontSize -> add 1em which got lost somewhere in paragraphs...
    const newHeights = {
      largeHeight,
      mediumHeight,
      smallHeight: 0
    }
    this.setState(newHeights)
    this.props.onHeightChange(newHeights)
  }

  getStateHeight(state) { // get the height according to a state
    switch (state) {
      case 0: return this.state.mediumHeight; break;
      case 1: return this.state.largeHeight; break;
      case 2: return this.state.smallHeight; break;
      default: return this.state.largeHeight; break;
    }
  }

  render() {
    var text = getFragment('startInfo', this.props.lang);
    var hidden = this.props.startWelcomeState == 2
    var height = this.getStateHeight(this.props.startWelcomeState)
    return (
      <ResizeAware
        style={{ position: 'relative' }}
        onlyEvent
        onResize={this.getHeights}
      >
        <Container style={{ height: height }} innerRef={el => this.elem = el} className="StreamWelcomeContent">
          <DiyMarkdown>{text}</DiyMarkdown>
        </Container>
      </ResizeAware>
    );
  }
}
export default withTracker(props => {
  return {
    lang: getLanguage()
  };
})(StreamWelcomeContent);

const Container = styled.div`
  overflow: hidden;
  transition: all 0.3s;
`