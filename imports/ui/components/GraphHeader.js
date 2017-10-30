import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getFragment } from '../../helper/fragment';

class GraphHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var title = getFragment('graphTitle');

    return (
      <Container className="GraphHeader">
        <h3>{title}</h3>
      </Container>
    );
  }
}

export default GraphHeader;

const Container = styled.div`
  position: absolute;
`;