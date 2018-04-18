import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getFragment } from '../../helper/fragment';
import { dist } from '../../config/styles';

class RoomInterHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var title = getFragment('roomInterTitle');

    return <Header className="RoomQuestionsHeader">{title}</Header>;
  }
}

export default RoomInterHeader;

const Header = styled.h3`
  padding: 0 ${dist.named.columnPadding};
`;
