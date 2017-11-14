import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { existsString } from '../../../helper/global';
import { TimelineHeader, TimelineBody } from './';
import { getImageAsset } from '../../../helper/asset';
import { dist } from '../../../config/styles';

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      HeaderScrollPos: 0,
      BodyScrollPos: 0,
      scrollLeader: null
    }
    this.headerTakeLead = this.headerTakeLead.bind(this)
    this.bodyTakeLead = this.bodyTakeLead.bind(this)
    this.handleHeaderScrollFrame = this.handleHeaderScrollFrame.bind(this)
    this.handleBodyScrollFrame = this.handleBodyScrollFrame.bind(this)
  }

  reorganiseData(data) {
    var newData = {};
    newData.context = { ...data.context };
    const rows = data.rows;
    var yearArr = [];
    var yearRows = [];
    var lastYear = '';

    for (var i = 0; i < rows.length; i++) {
      const row = rows[i];
      const year = row.year;
      if (year !== lastYear) {
        if (lastYear !== '') {
          yearArr.push({ year: lastYear, rows: yearRows });
          yearRows = [];
        }
        lastYear = year;
      }
      yearRows.push({ text: row.text, source: row.source, asset: row.asset });
    }
    yearArr.push({ year: lastYear, rows: yearRows });

    newData.rows = yearArr;
    return newData;
  }

  handleHeaderScrollFrame(e) {
    //const headerNode = ReactDOM.findDOMNode(this.refs.TimelineHeader)
    //console.log(headerNode.scrollLeft, headerNode.offsetWidth)
    //console.log(e.left)
    if (this.state.scrollLeader === "Header")
      this.setState({ BodyScrollPos: e.left })
  }

  handleBodyScrollFrame(e) {
    //const bodyNode = ReactDOM.findDOMNode(this.refs.TimelineBody)
    //console.log(bodyNode.scrollTop, bodyNode.offsetHeight)
    //console.log(e.target)
    if (this.state.scrollLeader === "Body") {
      this.setState({ HeaderScrollPos: e.top })
    }
  }

  headerTakeLead(e) {
    //console.log("H")
    this.setState({ scrollLeader: 'Header' })
  }

  bodyTakeLead(e) {
    //console.log("B")
    this.setState({ scrollLeader: 'Body' })
  }

  render() {
    const data = this.reorganiseData(this.props.data);
    //console.log(data);
    return (
      <Container className="SCTimeline">
        <TimelineHeader data={data} isScrollLeader={this.state.scrollLeader === "Header"} scrollPos={this.state.HeaderScrollPos} onScrollFrame={this.handleHeaderScrollFrame} onMouseEnter={this.headerTakeLead} />
        <TimelineBody data={data} isScrollLeader={this.state.scrollLeader === "Body"} scrollPos={this.state.BodyScrollPos} onScrollFrame={this.handleBodyScrollFrame} onMouseEnter={this.bodyTakeLead} />
      </Container>
    );
  }
}
Timeline.propTypes = {
  data: PropTypes.object
};

export default Timeline;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  height: 100%;
`;