import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StartRight extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="StartRight" />;
  }
}

StartRight.propTypes = {
  rooms: PropTypes.array
};

export default StartRight;
