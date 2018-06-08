import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LazyLoad from 'react-lazyload';

import { existsString } from '../../../helper/global';
import {
  getImageAsset,
  getSliderAssetIndex,
  annotateAsset
} from '../../../helper/asset';
import { AnnotatedAsset } from './';
import { setTabDetail } from '../../../helper/actions';

class AssetList extends React.Component {
  constructor(props) {
    super(props);
    this.detailClick = this.detailClick.bind(this);
  }
  detailClick(e, asset) {
    e.preventDefault();
    var index = getSliderAssetIndex(asset);
    setTabDetail(true, index);
  }
  renderRows(rows, context) {
    var result = [];
    for (var i = 0; i < rows.length; i++) {
      const row = rows[i];
      var myAsset = getImageAsset(row.asset, context.room, context.tab);
      const newRow = (
        <li key={'_' + i + '_' + row.name}>
          <LazyLoad height={200} offset={200} once overflow>
            <AnnotatedAsset
              asset={myAsset}
              text={row.asset.text}
              source={row.asset.source}
              clickCallback={this.detailClick}
            />
          </LazyLoad>
        </li>
      );
      result.push(newRow);
    }
    return result;
  }
  render() {
    const rows = this.renderRows(this.props.data.rows, this.props.data.context);
    return (
      <div className="SCTimeline">
        <ol>
          {rows}
        </ol>
      </div>
    );
  }
}
AssetList.propTypes = {
  data: PropTypes.object
};

export default AssetList;

const Table = styled.table`width: 100%;`;
