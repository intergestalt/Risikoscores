import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';

import { localeStr } from '../../helper/global';
import { diyMarkdown, createDangerHtml } from '../../helper/diyMarkdown';

class MainContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var text = localeStr(this.props.room.mainText);
    textBlocks = diyMarkdown(text);
    return (
      <div className="MainContent">
        <h1>{localeStr(this.props.room.name)}</h1>
        {textBlocks}
      </div>
    );
  }
}

MainContent.propTypes = {
  room: PropTypes.object
};

export default MainContent;
