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
      scrollPosElem: 0,
      scrollPosElemOffset: 0,
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
    this.setState({
      scrollPosElem: timelineScrollPos[0],
      scrollPosElemOffset: timelineScrollPos[1]
    });
  }

  handleYearClick(index) {
    // console.log("scroll to index", index)
    if (this.state.scrollPosElem == index) return;
    this.setState({
      scrollLeader: "Parent",
      scrollPosElemOffset: 0,
      scrollPosElem: this.state.scrollPosElem + this.state.scrollPosElemOffset
    }, () => {
      this._animate.cubicInOut('scrollPosElem', index, 1000).then(() => {
        this.setState({
          scrollLeader: "Body",
        })
      })
    })
  }

  headerTakeLead(e) {
    //console.log("H")
    /* disabled */
    // this.setState({ scrollLeader: 'Header' })
  }

  bodyTakeLead(e) {
    //console.log("B")
    if (this.state.scrollLeader != "Parent") {
      this.setState({ scrollLeader: 'Body' });
    }
  }

  render() {
    const data = this.reorganiseData(this.props.data);
    return (
      <Container className="SCTimeline">
        <TimelineHeader
          data={data}
          isScrollLeader={this.state.scrollLeader === "Header"}
          scrollPosElem={this.state.scrollPosElem}
          scrollPosElemOffset={this.state.scrollPosElemOffset}
          onScroll={this.handleScroll}
          onMouseEnter={this.headerTakeLead}
          onYearClick={this.handleYearClick}
        />
        <TimelineBody
          data={data}
          isScrollLeader={this.state.scrollLeader === "Body"}
          scrollPosElem={this.state.scrollPosElem}
          scrollPosElemOffset={this.state.scrollPosElemOffset}
          onScroll={this.handleScroll}
          onMouseEnter={this.bodyTakeLead}
          ref={instance => { this.body = instance }}
        />
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
