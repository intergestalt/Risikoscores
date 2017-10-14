import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Link extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a className="Link" href="#">
        {this.props.text} : {this.props.room} : {this.props.tab}
      </a>
    );
  }
}
Link.propTypes = {
  text: PropTypes.string,
  room: PropTypes.string,
  tab: PropTypes.string
};

export default Link;
