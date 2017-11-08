import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { existsString } from '../../../helper/global';
import { TimelineHeader, TimelineBody } from './';

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
    return (
      <div className="SCTimeline">
        <TimelineHeader data={data} />
        <TimelineBody data={data} />
      </div>
    );
  }
}
Timeline.propTypes = {
  data: PropTypes.object
};

export default Timeline;
