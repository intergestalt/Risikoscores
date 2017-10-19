import React, { Component } from 'react';

import { getFragment } from '../../helper/fragment';
import { diyMarkdown } from '../../helper/diyMarkdown';

class StreamWelcomeContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var text = getFragment('startInfo');
    const textBlocks = diyMarkdown(text, false, false);
    return <div className="StreamWelcomeContent">{textBlocks}</div>;
  }
}

export default StreamWelcomeContent;
