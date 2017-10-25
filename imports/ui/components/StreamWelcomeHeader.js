import React, { Component } from 'react';
import styled from 'styled-components';

import { getFragment } from '../../helper/fragment';
import { colors } from '../../config/styles';

class StreamWelcomeHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var title = getFragment('startTitle');

    return (
      <div className="StreamWelcomeHeader">
        <Title>{title}</Title>
      </div>
    );
  }
}

export default StreamWelcomeHeader;

const Title = styled.h1`
  color: ${ colors.blue}
`;