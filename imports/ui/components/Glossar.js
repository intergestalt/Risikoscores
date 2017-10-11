import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Glossar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="Glossar" />;
  }
}

Glossar.propTypes = {
  room: PropTypes.object
};

export default Glossar;
