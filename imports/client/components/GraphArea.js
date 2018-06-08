import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';
//import Sound from 'react-sound';

import GraphDB from '../../collections/graph';
import { GraphHeader, Graph, Expander, Loading } from './';
import {
  toggleGraph,
  isGraphExpanded,
  setSelectGraphNode,
  getSelectedRoomId,
  setPlayAudio,
  setPlayAudioFile,
  getPlayAudioAll
} from '../../helper/actions';
import { colors, dist } from '../../config/styles';
import { exists, percentFromValue } from '../../helper/global';
import { getUrlPrefix } from '../../helper/uploads';

class GraphArea extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.soundFinished = this.soundFinished.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.callback = this.callback.bind(this);
    this.graphCallback = this.graphCallback.bind(this);
    this.audioElem = null;

    this.state = {
      selectedRoomId: undefined,
      angelY: 0,
      angelX: 0,
      height: 0,
      width: 0,
      animation: false
    };
    this.timer = null;
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  onMouseLeave(e) {
    this.setState({ animation: true, angelY: 0, angelX: 0 });
  }
  handleMouseMove(e) {
    var x = e.nativeEvent.pageX;
    var y = e.nativeEvent.pageY;
    const width = window.innerWidth / 3;
    const height = window.innerHeight / 3;
    x -= 2 * width;
    y -= height;
    var px = percentFromValue(x, width);
    var py = percentFromValue(y, height);
    px = px - 50;
    py = py - 50;
    var angelX = 20 * py / 100;
    var angelY = 20 * px / 100;
    angelY *= -1;
    this.setState({ angelY, angelX, animation: false });
  }
  callback(e) {
    e.preventDefault();
    toggleGraph(e);
  }
  soundFinished() {}
  graphCallback(roomId) {
    if (exists(roomId)) {
      setSelectGraphNode(roomId);
      setPlayAudioFile('tos-computer-01.mp3');
      setPlayAudio(true);
    } else {
      setPlayAudio(false);
      setSelectGraphNode(getSelectedRoomId());
    }
    this.setState({ selectedRoomId: roomId });
  }

  renderLoading() {
    return (
      <div className="GraphArea">
        <Loading />
      </div>
    );
  }
  render() {
    if (!this.props.ready) {
      return this.renderLoading();
    }
    //graphExpanded == true => height:33%
    //graphExpanded == false => height:7%
    var height = 7;
    if (this.props.graphExpanded) {
      height = 33.3333;
    }

    const file = getUrlPrefix() + '/live/sounds/beep.mp3'; // + getPlayAudioFile();

    return (
      <Area
        className="GraphArea"
        relativeHeight={height}
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.onMouseLeave}
      >
        <GraphHeader roomId={this.state.selectedRoomId} />
        <Graph
          width={`calc( ( 100vw / 3 ) - ( 2 * ${dist.named.columnPadding} ) )`}
          height={`calc( ( 100vh / 3 ) - ${dist.named.columnPadding} )`}
          backgroundColor={colors.mediumgrey}
          graphCallback={this.graphCallback}
          graph={this.props.graph}
          restrictNavigation={true}
          angelY={this.state.angelY}
          angelX={this.state.angelX}
          animation={this.state.animation}
          start={false}
        />
        <Expander
          callback={this.callback}
          expanded={isGraphExpanded()}
          directionDown={false}
        />
      </Area>
    );
  }
}
GraphArea.propTypes = {
  graph: PropTypes.array,
  graphNodeId: PropTypes.string,
  room: PropTypes.object
};

export default withTracker(props => {
  const sub = Meteor.subscribe('graph.list');

  return {
    graph: GraphDB.find().fetch(),
    ready: sub.ready(),
    graphExpanded: isGraphExpanded()
  };
})(GraphArea);

const Area = styled.div`
  height: ${props => props.relativeHeight}%;
  //flex:  ${props => props.relativeHeight};
  background-color: ${colors.mediumgrey};
  box-sizing:border-box;
  padding: ${dist.named.columnPadding};
  padding-top: calc( ${dist.named.columnPadding} - ${dist.lineTopDiff});  
  position: relative;
  & .Expander {
    position: absolute;
    right:0.5em;
    top:0.5em;
  }  
}`;
