import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Graph } from './';
import { setSelectGraphNode } from '../../helper/actions';
import { exists } from '../../helper/global';
import { dist, colors } from '../../config/styles';

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
      <Container className="StartGraphArea">
        <Graph
          selectedId={this.props.selectedId}
          width={'100%'}
          height={'100%'}
          backgroundColor={colors.darkgrey}
          graphCallback={this.graphCallback}
          graph={this.props.graph}
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
  width:50%;
  width:calc( 50% - ${dist.named.columnPadding} );
  height:100vh;
  max-height: 75vw;
`;