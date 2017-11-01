import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
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
    if (this.props.welcomeExpanded) {
      content = <StreamWelcomeContent />;
    }
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
  return {
    welcomeExpanded: isStartWelcomeExpanded()
  };
})(StreamWelcome);

const LiWelcome = styled.li`
  background: linear-gradient(to bottom, white 0%, ${colors.lightgrey} 100%);
  padding: ${dist.small};
  padding-top: calc(${dist.small} - ${dist.lineTopDiff});
  padding-bottom: calc(${dist.small} - ${dist.lineBottomDiff});
`;
