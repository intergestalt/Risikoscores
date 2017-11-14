import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

import { CustomScrollbars } from '../';
import { AnnotatedAsset } from './';
import { getImageAsset } from '../../../helper/asset';
import { dist } from '../../../config/styles';

class TimelineBody extends React.Component {
  constructor(props) {
    super(props);
    this.detailClick = this.detailClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    //console.log(this.props, nextProps)
    //const s = nextProps.scrollState
    if (nextProps.scrollPos) {
      //console.log(s, this.props)
      if (!this.props.isScrollLeader && nextProps.scrollPos) {
        this.scrollTo(nextProps.scrollPos)
      }
      return false
    }
    return true;
  }

  scrollTo(y = 0) {
    const scrollbars = this.scrollbars;
    //console.log(y, scrollbars.getScrollHeight()); //return;
    scrollbars.scrollTop(y * (scrollbars.getScrollHeight() - scrollbars.getClientHeight()));
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
      <Container className="SCTimelineBody" onMouseEnter={this.props.onMouseEnter}>
        <CustomScrollbars scrollbarsRef={el => this.scrollbars = el} onScrollFrame={this.props.onScrollFrame}>
          {years}
        </CustomScrollbars>
      </Container>
    );
  }
}
TimelineBody.propTypes = {
  data: PropTypes.object,
  onscroll: PropTypes.func,
  scrollPos: PropTypes.number
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