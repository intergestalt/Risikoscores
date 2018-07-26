import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import styled from 'styled-components';

import { StreamWelcomeHeader, StreamWelcomeContent, Expander } from './';
import {
  toggleStartWelcome,
  isStartWelcomeExpanded
} from '../../helper/actions';
import { colors, dist } from '../../config/styles';

class StreamWelcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHeights: {},
    }
    this.callback = this.callback.bind(this);
    this.handleHeaderHeightChange = this.handleHeaderHeightChange.bind(this)
    this.handleContentHeightChange = this.handleContentHeightChange.bind(this)
    this.sendHeights = this.sendHeights.bind(this)
  }

  handleHeaderHeightChange(headerHeight) {
    this.setState({ headerHeight }, this.sendHeights)
  }

  handleContentHeightChange(contentHeights) {
    this.setState({ contentHeights }, this.sendHeights)
  }

  sendHeights() {
    const padding = parseInt(getComputedStyle(this.elem).getPropertyValue('padding-bottom')) + parseInt(getComputedStyle(this.elem).getPropertyValue('padding-top'))
    this.props.onHeightChange({
      smallHeight: (this.state.headerHeight || 0) + padding,
      mediumHeight: (this.state.headerHeight || 0) + (this.state.contentHeights.mediumHeight || 0) + padding,
    })
  }

  callback(e) {
    e.preventDefault();
    toggleStartWelcome();
  }

  render() {
    return (
      <Welcome key="_welcome" className="StreamWelcome" innerRef={el => this.elem = el}>
        <StreamWelcomeHeader
          onHeightChange={this.handleHeaderHeightChange}
        />
        <StreamWelcomeContent
          onHeightChange={this.handleContentHeightChange}
          startWelcomeState={this.props.startWelcomeState}
        />
        <Expander
          callback={this.callback}
          expanded={this.props.welcomeExpanded}
          directionDown={true}
        />
      </Welcome>
    );
  }
}

export default withTracker(props => {
  const startWelcomeState = Session.get('startWelcomeState')
  return {
    startWelcomeState,
    welcomeExpanded: startWelcomeState == 1 || startWelcomeState == 3
  };
})(StreamWelcome);

const Welcome = styled.div`
  background: linear-gradient(to bottom, white 0%, ${colors.lightgrey} 100%);
  padding-top: calc(${dist.small} - ${dist.lineTopDiff});
  padding-bottom: ${dist.small};
  position: fixed;
  z-index: 10;
  width: calc(50% - ${dist.small});
  top:0;
  & .Expander {
    position: absolute;
    right:${ dist.tiny};
    bottom:1em;
  }    
`;
