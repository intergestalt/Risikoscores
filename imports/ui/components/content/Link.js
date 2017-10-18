import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

class Link extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavLink to={'/rooms/' + this.props.room + '?tabId=' + this.props.tab}>
        {this.props.text}
      </NavLink>
    );
  }
}
Link.propTypes = {
  text: PropTypes.string,
  room: PropTypes.string,
  tab: PropTypes.string
};

export default Link;
