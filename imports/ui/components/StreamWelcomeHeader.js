import React, { Component } from 'react';
import { getFragment } from '../../helper/fragment';

class StreamWelcomeHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var title = getFragment('startTitle');

    return (
      <div className="StreamWelcomeHeader">
        <h1>{title}</h1>
      </div>
    );
  }
}

export default StreamWelcomeHeader;
