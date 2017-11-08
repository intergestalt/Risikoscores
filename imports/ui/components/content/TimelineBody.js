import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AnnotatedAsset } from './';
import {
  getImageAsset,
  getSliderAssetIndex,
  annotateAsset
} from '../../../helper/asset';
import { setTabDetail } from '../../../helper/actions';

class TimelineBody extends React.Component {
  constructor(props) {
    super(props);
    this.detailClick = this.detailClick.bind(this);
  }

  detailClick(e, asset) {
    e.preventDefault();
    var index = getSliderAssetIndex(asset);
    setTabDetail(true, index);
  }

  renderYear(yearRow) {
    var all = [];
    for (var i = 0; i < yearRow.rows.length; i++) {
      const row = yearRow.rows[i];
      var myAsset = getImageAsset(
        row.asset,
        this.props.data.context.room,
        this.props.data.context.tab
      );
      const newRow = (
        <AnnotatedAsset
          key={'_' + i}
          asset={myAsset}
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
