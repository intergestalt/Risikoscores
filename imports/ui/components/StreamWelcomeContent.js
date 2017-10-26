import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';

import { getFragment } from '../../helper/fragment';
import { diyMarkdown } from '../../helper/diyMarkdown';
import { getLanguage } from '../../helper/actions';

class StreamWelcomeContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var text = getFragment('startInfo', this.props.lang);
    const textBlocks = diyMarkdown(text, false);
    return <div className="StreamWelcomeContent">{textBlocks}</div>;
  }
}
export default withTracker(props => {
  return {
    lang: getLanguage()
  };
})(StreamWelcomeContent);
