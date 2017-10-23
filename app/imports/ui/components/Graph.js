import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Graph extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="Graph" />;
  }
}

Graph.propTypes = {
  graph: PropTypes.array
};

export default Graph;
