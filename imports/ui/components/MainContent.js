import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { localeStr } from '../../helper/global';
import { diyMarkdown } from '../../helper/diyMarkdown';

class MainContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var text = localeStr(this.props.room.mainText);
    const textBlocks = diyMarkdown(text, false, this.props.glossarCallback);
    const title = localeStr(this.props.room.name);
    return (
      <div className="MainContent">
        <h1>{title}</h1>
        {textBlocks}
      </div>
    );
  }
}

MainContent.propTypes = {
  room: PropTypes.object,
  glossarCallback: PropTypes.func
};

export default MainContent;
