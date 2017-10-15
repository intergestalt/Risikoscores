import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { GlossarLink } from './content';
import { localeStr } from '../../helper/global';
import { sortGlossar, getRoomGlossar } from '../../helper/glossar';
import { getFragment } from '../../helper/fragments';

class GlossarList extends React.Component {
  constructor(props) {
    super(props);
  }
  getGlossarList(glossar, highlight = true) {
    var entryList = [];
    for (var i = 0; i < glossar.length; i++) {
      const e = glossar[i];
      const entry = (
        <li key={'_' + i}>
          <GlossarLink
            text={localeStr(e.name)}
            entry={e._id}
            highlighted={highlight && this.props.roomGlossar[e._id]}
            callback={this.props.glossarCallback}
          />
        </li>
      );
      entryList.push(entry);
    }
    return entryList;
  }
  render() {
    const glossar = sortGlossar(this.props.glossar);
    var entryList = this.getGlossarList(glossar);
    const roomGlossar = getRoomGlossar(glossar, this.props.roomGlossar);
    var roomEntryList = this.getGlossarList(roomGlossar, false);
    var title = getFragment('glossar');

    return (
      <div className="GlossarContent">
        <h1>{title}</h1>
        <h2>Raum Einträge</h2>
        <ul>{roomEntryList}</ul>
        <h2>Alle Einträge</h2>
        <ul>{entryList}</ul>
      </div>
    );
  }
}

GlossarList.propTypes = {
  glossar: PropTypes.array,
  roomGlossar: PropTypes.object,
  glossarCallback: PropTypes.func
};

export default GlossarList;
