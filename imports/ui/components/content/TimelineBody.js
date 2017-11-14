import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { CustomScrollbars } from '../';
import { AnnotatedAsset } from './';
import { getImageAsset } from '../../../helper/asset';
import { dist } from '../../../config/styles';

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
    return (
      <Container onScroll={this.props.onscroll} className="SCTimelineBody">
        <CustomScrollbars>
          {years}
        </CustomScrollbars>
      </Container>
    );
  }
}
TimelineBody.propTypes = {
  data: PropTypes.object,
  onscroll: PropTypes.func
};

export default TimelineBody;

const Container = styled.div`
  position: relative;
  top: ${dist.medium};
  z-index: 1;
  flex: 1;
  height: 100%;
  height: calc( 100% - ${dist.medium} );
`;