import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactStateAnimation from 'react-state-animation'

import { existsString } from '../../../helper/global';
import { TimelineHeader, TimelineBody } from './';
import { getImageAsset } from '../../../helper/asset';
import { dist } from '../../../config/styles';

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollPos: [0, 0],
      scrollLeader: "Body"
    }
    this.headerTakeLead = this.headerTakeLead.bind(this)
    this.bodyTakeLead = this.bodyTakeLead.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.handleYearClick = this.handleYearClick.bind(this)
    this._animate = new ReactStateAnimation(this)
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

  handleScroll(timelineScrollPos) {
    //console.log(timelineScrollPos)
    this.setState({ scrollPos: timelineScrollPos });
  }

  handleYearClick(index) {
    this.setState({ scrollLeader: 'Anim' })
    this._animate.linearInOut('scrollPos', [index, 0], 1000)
  }

  headerTakeLead(e) {
    //console.log("H")
    /* disabled */
    // this.setState({ scrollLeader: 'Header' })
  }

  bodyTakeLead(e) {
    //console.log("B")
    this.setState({ scrollLeader: 'Body' });
  }

  render() {
    const data = this.reorganiseData(this.props.data);
    //console.log(data);
    return (
      <Container className="SCTimeline">
        <TimelineHeader data={data} isScrollLeader={this.state.scrollLeader === "Header"} scrollPos={this.state.scrollPos} onScroll={this.handleScroll} onMouseEnter={this.headerTakeLead} onYearClick={this.handleYearClick} />
        <TimelineBody data={data} isScrollLeader={this.state.scrollLeader === "Body"} scrollPos={this.state.scrollPos} onScroll={this.handleScroll} onMouseEnter={this.bodyTakeLead} ref={instance => { this.body = instance }} />
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
