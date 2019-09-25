import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import helpTexts from './helpTexts';

class AdminDiyHelpContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let source = "";
    for (let seg of this.props.segments) {
      source += helpTexts[seg]
    }
    return (
      <Container className="AdminDiyHelpContainer">
        {this.props.children}
        <Help>
          {source}
        </Help>
      </Container>
    )
  }
}

AdminDiyHelpContainer.propTypes = {};

export default AdminDiyHelpContainer;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  & > * {
    flex:1;
    &:first-child {
      flex: 1.2;
      @media screen and (min-width: 600px) {
        flex: 2;
      }
    }
  }
`;

const Help = styled.code`
  padding: 20px;
  margin-left: 20px;
  background-color: white;
  border: solid 1px lightgrey;
  border-width: 0 0 0 1px;
  white-space: pre-line;
`;