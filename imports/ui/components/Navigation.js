import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var expanded = null;
    if (this.props.navigationExpanded) {
      expanded = <div>NAVIGATION EXPANDED</div>;
    }
    return <div className="Navigation">{expanded}</div>;
  }
}

Navigation.propTypes = {
  room: PropTypes.object,
  toggleExpandGlossar: PropTypes.func,
  navigationExpanded: PropTypes.bool
};

export default Navigation;
