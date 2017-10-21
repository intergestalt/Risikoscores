import React, { Component } from 'react';
import styled from 'styled-components';

import { StartGeneralMenu } from './';
import { dist } from '../../config/styles';

class StartGeneralMenuArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container className="StartGeneralMenuArea">
        <StartGeneralMenu />
      </Container>
    );
  }
}

export default StartGeneralMenuArea;

const Container = styled.div`
  position: fixed;
  right: 0;/*${ dist.small}*/
  top: 0;/*${ dist.small}*/
`;