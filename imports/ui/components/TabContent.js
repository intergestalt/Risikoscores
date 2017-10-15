import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { localeStr } from '../../helper/global';
import { diyMarkdown } from '../../helper/diyMarkdown';

class TabContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var text = localeStr(this.props.tab.text);
    const textBlocks = diyMarkdown(text, false, this.props.glossarCallback);
    return (
      <div className="TabContent">
        <h1>{localeStr(this.props.tab.title)}</h1>
        {textBlocks}
      </div>
    );
  }
}

TabContent.propTypes = {
  roomFolder: PropTypes.string,
  tab: PropTypes.object,
  glossarCallback: PropTypes.func
};

export default TabContent;
