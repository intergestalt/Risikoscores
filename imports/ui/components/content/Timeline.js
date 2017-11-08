import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { existsString } from '../../../helper/global';
import { TimelineHeader, TimelineBody } from './';
import { getImageAsset } from '../../../helper/asset';

class Timeline extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    const data = this.reorganiseData(this.props.data);
    console.log(data);
    return (
      <Container className="SCTimeline">
        <TimelineHeader data={data} />
        <TimelineBody data={data} />
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