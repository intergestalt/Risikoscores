import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Graph, Loading } from './';
import { setSelectGraphNode, setGraphNodeSelected } from '../../helper/actions';
import { exists } from '../../helper/global';
import { dist, colors } from '../../config/styles';

class StartGraphArea extends React.Component {
  constructor(props) {
    super(props);
    this.graphCallback = this.graphCallback.bind(this);
  }
  graphCallback(roomId) {
    if (exists(roomId)) {
      setGraphNodeSelected(1);
      setSelectGraphNode(roomId);
    } else {
      setGraphNodeSelected(0);
      setSelectGraphNode(null);
    }
  }

  renderLoading() {
    return (
      <div className="StartGraphArea">
        <Loading />
      </div>
    );
  }
  render() {
    if (!this.props.ready) {
      return this.renderLoading();
    }
    return (
      <Container className="StartGraphArea">
        <Graph
          selectedId={this.props.selectedId}
          width={'100%'}
          height={'100%'}
          backgroundColor={colors.darkgrey}
          graphCallback={this.graphCallback}
          graph={this.props.graph}
          start={true}
        />
      </Container>
    );
  }
}

StartGraphArea.propTypes = {
  selectedId: PropTypes.string,
  graph: PropTypes.array,
  ready: PropTypes.bool
};

export default StartGraphArea;

const Container = styled.div`
  position: absolute;
  padding: ${dist.named.columnPadding} 0;
  box-sizing: border-box;
  bottom: 0;
  width: 100%;
  width: calc(100% - ${dist.named.columnPadding});
  height: 100vh;
  max-height: 75vw;
`;
