import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Graph } from './';
import { setSelectGraphNode } from '../../helper/actions';
import { exists } from '../../helper/global';

class StartGraphArea extends React.Component {
  constructor(props) {
    super(props);
    this.graphCallback = this.graphCallback.bind(this);
  }
  graphCallback(roomId) {
    if (exists(roomId)) {
      setSelectGraphNode(roomId);
    } else {
      setSelectGraphNode(null);
    }
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
          graphCallback={this.graphCallback}
          graph={this.props.graph}
        />
      </div>
    );
  }
}

StartGraphArea.propTypes = {
  selectedId: PropTypes.string,
  graph: PropTypes.array,
  ready: PropTypes.bool
};

export default StartGraphArea;
