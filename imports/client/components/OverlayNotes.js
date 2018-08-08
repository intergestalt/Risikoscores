import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import styled from 'styled-components';
import ResizeAware from 'react-resize-aware';
import { detect } from 'detect-browser';

import { getLanguage } from '../../helper/actions';
import { getFragment } from '../../helper/fragment';
import { snippets } from '../../config/styles';

class OverlayNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      small: false,
      ie: false,
      smallDismissed: false,
      ieDismissed: false,
    }
    this.handleResize = this.handleResize.bind(this)
    this.dismiss = this.dismiss.bind(this)
  }

  componentDidMount() {
    const browser = detect();
    console.log(browser);
    if (browser.name === "is") {
      this.setState({ ie: true })
    }
  }

  handleResize({ width, height }) {
    sw = window.screen.width
    sh = window.screen.height
    if (sw <= 375 || sh <= 375) {
      this.setState({ small: true })
    }
  };

  dismiss() {
    if (this.state.small) { this.setState({ smallDismissed: true }) }
    if (this.state.ie) { this.setState({ ieDismissed: true }) }
  }

  render() {

    const smallText = (this.state.small && !this.state.smallDismissed)
      ? <Text>{this.props.fragments.smallScreenWarning}</Text>
      : null

    const ieText = (this.state.ie && !this.state.ieDismissed)
      ? <Text>{this.props.fragments.oldBrowserWarning}</Text>
      : null

    visible = ieText || smallText

    return (
      <ResizeAware
        onlyEvent
        onResize={this.handleResize}
      >
        <Overlay
          visible={visible}
          className="OverlayNotes"
        >
          {ieText}
          {smallText}
          <Button onClick={this.dismiss}>
            {this.props.fragments.dismiss}
          </Button>
        </Overlay>
      </ResizeAware>)
  }
}

export default withTracker(props => {
  return {
    language: getLanguage(),
    fragments: {
      smallScreenWarning: getFragment('smallScreenWarning', getLanguage()),
      oldBrowserWarning: getFragment('oldBrowserWarning', getLanguage()),
      dismiss: getFragment('dismiss', getLanguage())
    }
  };
})(OverlayNotes);

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(255,255,255,0.9);
  backdrop-filter: blur(3px);
  z-index: 100;
  visibility: ${ props => props.visible ? "visible" : "hidden"}
`
const Text = styled.div`
  ${ snippets.overlayNotes}
  padding: 0 1em;
  margin: 0 auto 1em auto;
`

const Button = styled.div`
  ${ snippets.overlayNotes}
  margin: 0 auto;
  padding: 1em;
  border: 1px black solid;
  cursor: default;
  user-select: none;
  &:hover {
    color: white;
    background: black;
  }
`