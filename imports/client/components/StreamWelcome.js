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
    this.callback = this.callback.bind(this);
  }

  callback(e) {
    e.preventDefault();
    toggleStartWelcome();
  }
  render() {
    var content = null;
    content = <StreamWelcomeContent startWelcomeState={this.props.startWelcomeState} />;
    return (
      <LiWelcome key="_welcome" className="StreamWelcome">
        <StreamWelcomeHeader />
        {content}
        <Expander
          callback={this.callback}
          expanded={this.props.welcomeExpanded}
          directionDown={true}
        />
      </LiWelcome>
    );
  }
}

export default withTracker(props => {
  const startWelcomeState = Session.get('startWelcomeState')
  console.log(startWelcomeState)
  return {
    startWelcomeState,
    welcomeExpanded: startWelcomeState == 1 || startWelcomeState == 3
  };
})(StreamWelcome);

const LiWelcome = styled.li`
  background: linear-gradient(to bottom, white 0%, ${colors.lightgrey} 100%);
  padding-top: calc(${dist.small} - ${dist.lineTopDiff});
  padding-bottom: ${dist.small};
  position: relative;
  & .Expander {
    position: absolute;
    right:0.5em;
    bottom:0.5em;
  }    
`;
