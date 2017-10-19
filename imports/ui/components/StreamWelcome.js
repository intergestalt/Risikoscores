import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { StreamWelcomeHeader, StreamWelcomeContent, Expander } from './';
import {
  toggleStartWelcome,
  isStartWelcomeExpanded
} from '../../helper/actions';

class StreamWelcome extends React.Component {
  constructor(props) {
    super(props);
    this.callback = this.callback.bind(this);
  }

  callback(e) {
    toggleStartWelcome(e);
  }
  render() {
    var content = null;
    if (this.props.welcomeExpanded) {
      content = <StreamWelcomeContent />;
    }
    return (
      <li key="_welcome" className="StreamWelcome">
        <StreamWelcomeHeader />
        {content}
        <Expander
          callback={this.callback}
          expanded={this.props.welcomeExpanded}
          directionDown={true}
        />
      </li>
    );
  }
}

export default withTracker(props => {
  return {
    welcomeExpanded: isStartWelcomeExpanded()
  };
})(StreamWelcome);
