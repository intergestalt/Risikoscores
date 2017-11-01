import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TimelineHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var years = [];
    for (var i = 0; i < this.props.data.rows.length; i++) {
      const row = this.props.data.rows[i];
      const newYear = <div key={row.year}>{row.year}</div>;
      years.push(newYear);
    }
    return <div className="SCTimelineHeader">{years}</div>;
  }
}
TimelineHeader.propTypes = {
  data: PropTypes.object
};

export default TimelineHeader;
