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
        <h3>{title}</h3>
      </div>
    );
  }
}

export default RoomQuestionsHeader;
