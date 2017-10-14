import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Glossar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a className="Glossar" href="#">
        {this.props.text} : {this.props.entry}
      </a>
    );
  }
}
Glossar.propTypes = {
  text: PropTypes.string,
  entry: PropTypes.string
};

export default Glossar;
