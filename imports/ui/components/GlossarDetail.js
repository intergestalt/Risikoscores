import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { localeStr } from '../../helper/global';
import { diyMarkdown } from '../../helper/diyMarkdown';
import { GlossarClose } from './';

class GlossarDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var text = localeStr(this.props.entry.text);
    var title = localeStr(this.props.entry.name);
    const textBlocks = diyMarkdown(text, false, this.props.glossarCallback);
    return (
      <div className="GlossarContent">
        <h1>{title}</h1>
        <GlossarClose closeGlossarDetail={this.props.closeGlossarDetail} />
        {textBlocks}
      </div>
    );
  }
}

GlossarDetail.propTypes = {
  entry: PropTypes.object,
  glossarCallback: PropTypes.func,
  closeGlossarDetail: PropTypes.func
};

export default GlossarDetail;
