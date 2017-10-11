import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';

import { localeStr } from '../../helper/global';
import { diyMarkdown } from '../../helper/content';

class MainContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var text = localeStr(this.props.room.mainText);
    //text = diyMarkdown(text);
    return (
      <div className="MainContent">
        <h1>{localeStr(this.props.room.name)}</h1>
        <Markdown source={text} />
      </div>
    );
  }
}

MainContent.propTypes = {
  room: PropTypes.object
};

export default MainContent;
