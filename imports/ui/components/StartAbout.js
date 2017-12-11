import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';

import { getFragment } from '../../helper/fragment';
import { DiyMarkdown, Close } from './';
import { getLanguage } from '../../helper/actions';
import { dist, colors } from '../../config/styles';

class StartAbout extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClose() {
    Session.set('showAbout', false)
  }

  render() {
    var text = getFragment('aboutText', this.props.lang);
    return (
      <Container className="StartAbout" show={this.props.show}>
        <Close onClick={this.handleClose} />
        <DiyMarkdown>{text}</DiyMarkdown>
      </Container>
    );
  }
}

export default withTracker(props => {
  return {
    lang: getLanguage()
  };
})(StartAbout);

const Container = styled.div`
  background-color: ${colors.shade};
  z-index: 100;
  width:100%;
  height:100%;
  position:absolute;
  top:0;
  right:0;
  color: white;
  transition: all 0.5s;
  transform: translateX(${props => props.show ? "0" : "-100%"});
  box-sizing: border-box;
  padding-top: calc( ${ dist.small} - ${dist.lineTopDiff} );
  padding-bottom: calc( ${ dist.small} - ${dist.lineBottomDiff} );
`