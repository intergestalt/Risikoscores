import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Graph } from './';

class StartGraphArea extends React.Component {
  constructor(props) {
    super(props);
  }
  renderLoading() {
    return <div className="StartGraphArea">Loading...</div>;
  }
  render() {
    if (!this.props.ready) {
      return this.renderLoading();
    }
    return (
      <div className="StartGraphArea">
        <Graph
          selectedId={this.props.selectedId}
          width={'300'}
          height={'400'}
          graphCallback={this.props.graphCallback}
          graph={this.props.graph}
        />
      </div>
    );
  }
}

StartGraphArea.propTypes = {
  selectedId: PropTypes.string,
  graph: PropTypes.array,
  ready: PropTypes.bool,
  graphCallback: PropTypes.func
};

export default StartGraphArea;
