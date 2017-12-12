import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { GlossarLink } from './content';
import { localeStr } from '../../helper/global';
import { sortGlossar, getRoomGlossar } from '../../helper/glossar';
import { getFragment } from '../../helper/fragment';
import { snippets, colors } from '../../config/styles';
import { getId } from '../../helper/admin';

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
            entry={getId(e._id)}
            highlighted={highlight && this.props.roomGlossar[e._id]}
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
      <Content className="GlossarContent">
        <Title>{title}</Title>
        <h2>Raum Einträge</h2>
        <ul>{roomEntryList}</ul>
        <h2>Alle Einträge</h2>
        <ul>{entryList}</ul>
      </Content>
    );
  }
}

GlossarList.propTypes = {
  glossar: PropTypes.array,
  roomGlossar: PropTypes.object
};

export default GlossarList;

const Content = styled.div`
  ${snippets.glossarText};
  color: white;
  h2 {
    margin: 1em 0;
    ${snippets.headlineText};
  }
`;

const Title = styled.h3`
  ${snippets.headlineText};
  color: ${colors.named.glossar};
`;