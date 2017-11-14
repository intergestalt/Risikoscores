import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { existsString } from '../../../helper/global';
import { getImageAsset } from '../../../helper/asset';
import { AnnotatedAsset } from './';

class AssetList extends React.Component {
  constructor(props) {
    super(props);
    this.detailClick = this.detailClick.bind(this);
  }
  detailClick(e) {
    e.preventDefault();
    console.log('Detail Click Image');
    console.log(this.props.asset);
  }
  renderRows(rows, context) {
    var result = [];
    for (var i = 0; i < rows.length; i++) {
      const row = rows[i];
      const myAsset = getImageAsset(row.asset.name, context.room, context.tab);
      const newRow = (
        <tr key={'_' + i}>
          <td>
            <AnnotatedAsset
              asset={myAsset}
              text={row.text}
              source={row.source}
              clickCallback={this.detailClick}
            />
          </td>
        </tr>
      );
      result.push(newRow);
    }
    return result;
  }
  render() {
    const rows = this.renderRows(this.props.data.rows, this.props.data.context);
    return (
      <div className="SCTimeline">
        <Table>
          <tbody>{rows}</tbody>
        </Table>
      </div>
    );
  }
}
AssetList.propTypes = {
  data: PropTypes.object
};

export default AssetList;

const Table = styled.table`
  width: 100%;
`;