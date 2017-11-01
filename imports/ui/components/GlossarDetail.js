import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { localeStr } from '../../helper/global';
import { GlossarClose, DiyMarkdown } from './';

class GlossarDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var text = localeStr(this.props.entry.text);
    var title = localeStr(this.props.entry.name);
    return (
      <div className="GlossarContent">
        <h1>{title}</h1>
        <GlossarClose />
        <DiyMarkdown>{text}</DiyMarkdown>
      </div>
    );
  }
}

GlossarDetail.propTypes = {
  entry: PropTypes.object
};

export default GlossarDetail;
