import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="Navigation" />;
  }
}

Navigation.propTypes = {
  room: PropTypes.object
};

export default Navigation;
