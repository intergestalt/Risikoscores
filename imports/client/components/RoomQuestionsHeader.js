import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getFragment } from '../../helper/fragment';
import { dist, snippets } from '../../config/styles';

class RoomQuestionsHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var title = getFragment('roomQuestionsTitle');

    return (
      <Header className="RoomQuestionsHeader">
        {title}
      </Header>
    );
  }
}

export default RoomQuestionsHeader;

const Header = styled.h3`
  padding: 0 ${dist.named.columnPadding};
  ${ snippets.headlineText}
`;
