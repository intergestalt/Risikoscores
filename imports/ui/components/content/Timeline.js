import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { existsString } from '../../../helper/global';
import DiyMarkdown from '../DiyMarkdown';
import { getImageSrc } from '../../../helper/asset.js';

class Timeline extends React.Component {
  constructor(props) {
    super(props);
  }

  renderRows(rows, context) {
    var result = [];
    for (var i = 0; i < rows.length; i++) {
      const row = rows[i];

      const newRow1 = (
        <tr key={'_1_' + i}>
          <td>
            <h1>{row.year}</h1>
          </td>
        </tr>
      );
      result.push(newRow1);
      var imageRow = null;
      if (existsString(row.image)) {
        //        const imgSrc = getImageSrc(this.props.asset);
        const imgSrc =
          '/uploads/' + context.room + '/' + context.tab + '/' + row.image;
        imageRow = (
          <tr key={'_2_' + i}>
            <td>
              <img src={imgSrc} width="300" />
            </td>
          </tr>
        );
        result.push(imageRow);
      }

      var text = row.text;
      const newRow3 = (
        <tr key={'_3_' + i}>
          <td>
            <DiyMarkdown>{text}</DiyMarkdown>
          </td>
        </tr>
      );
      result.push(newRow3);

      var source = row.source;
      const newRow4 = (
        <tr key={'_4_' + i}>
          <td>
            <DiyMarkdown>{source}</DiyMarkdown>
          </td>
        </tr>
      );
      result.push(newRow4);
    }
    return result;
  }
  render() {
    const rows = this.renderRows(this.props.data.rows, this.props.data.context);
    return (
      <div className="SCTimeline">
        <table>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}
Timeline.propTypes = {
  data: PropTypes.object
};

export default Timeline;
