import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { localeStr } from '../../helper/global';
import { GlossarClose, DiyMarkdown } from './';
import { dist } from '../../config/styles';

class GlossarDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var text = localeStr(this.props.entry.text);
    var title = localeStr(this.props.entry.name);
    return (
      <Container className="GlossarContent GlossarDetail">
        <h1>{title}</h1>
        <GlossarClose />
        <DiyMarkdown>{text}</DiyMarkdown>
      </Container>
    );
  }
}

GlossarDetail.propTypes = {
  entry: PropTypes.object
};

export default GlossarDetail;

const Container = styled.div`
  color: white;
  .DiyMarkdown p {
    padding-left: 0;
    padding-right: 0;
  }
`;
