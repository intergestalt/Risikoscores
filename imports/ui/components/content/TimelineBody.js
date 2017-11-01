import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AnnotatedAsset } from './';
import { getImageAsset } from '../../../helper/asset';

class TimelineBody extends React.Component {
  constructor(props) {
    super(props);
    this.detailClick = this.detailClick.bind(this);
  }

  detailClick(e, asset) {
    e.preventDefault();
    console.log('Detail Click Timeline');
    console.log(asset);
  }

  renderYear(yearRow) {
    var all = [];
    for (var i = 0; i < yearRow.rows.length; i++) {
      const row = yearRow.rows[i];
      const myAsset = getImageAsset(
        row.asset.name,
        this.props.data.context.room,
        this.props.data.context.tab
      );
      const newRow = (
        <AnnotatedAsset
          key={'_' + i}
          asset={myAsset}
          text={row.text}
          source={row.source}
          clickCallback={this.detailClick}
        />
      );
      all.push(newRow);
    }
    return (
      <div id={yearRow.year} key={yearRow.year}>
        {all}
      </div>
    );
  }

  render() {
    var years = [];

    for (var i = 0; i < this.props.data.rows.length; i++) {
      const row = this.props.data.rows[i];
      const newYear = this.renderYear(row);
      years.push(newYear);
    }
    return <div className="SCTimelineBody">{years}</div>;
  }
}
TimelineBody.propTypes = {
  data: PropTypes.object
};

export default TimelineBody;
