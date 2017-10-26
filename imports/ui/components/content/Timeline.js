import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { existsString } from '../../../helper/global';
import { diyMarkdown } from '../../../helper/diyMarkdown';

class Timeline extends React.Component {
  constructor(props) {
    super(props);
  }

  renderRows(rows, context) {
    var result = [];
    for (var i = 0; i < rows.length; i++) {
      const row = rows[i];
      var text = row.text;
      const textBlocks = diyMarkdown(text);
      var imageRow = null;
      if (existsString(row.image)) {
        const imgSrc =
          '../../assets/' + context.room + '/' + context.tab + '/' + row.image;
        imageRow = (
          <td>
            <img src={imgSrc} width="300" />
          </td>
        );
      }
      const newRow = (
        <tr key={'_' + i}>
          {imageRow}
          <td>
            <h1>{row.year}</h1>
            {textBlocks}
          </td>
        </tr>
      );
      result.push(newRow);
    }
    return result;
  }
  render() {
    console.log('RENDER TIMELINE');
    const rows = this.renderRows(this.props.data.rows, this.props.data.context);
    const title = this.props.data.title;
    return (
      <div className="SCTimeline">
        <table>
          <thead>
            <tr>
              <td>{title}</td>
            </tr>
          </thead>
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
