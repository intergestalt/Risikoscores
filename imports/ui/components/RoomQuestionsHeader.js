import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getFragment } from '../../helper/fragment';

class RoomQuestionsHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var title = getFragment('roomQuestionsTitle');

    return (
      <div className="RoomQuestionsHeader">
        <h1>{title}</h1>
      </div>
    );
  }
}

export default RoomQuestionsHeader;
