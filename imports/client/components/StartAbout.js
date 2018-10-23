import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';

import { getFragment } from '../../helper/fragment';
import { DiyMarkdown, Close, CustomScrollbars } from '.';
import { getLanguage } from '../../helper/actions';
import { dist, colors } from '../../config/styles';

class StartAbout extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClose() {
    Session.set('showAbout', false)
    Session.set('showImprint', false)
  }

  render() {
    var text = getFragment(this.props.textKey, this.props.lang)
    return (
      <Container className="StartAbout" show={this.props.show}>
        <Close style={{ zIndex: 1 }} onClick={this.handleClose} />
        <CustomScrollbars thumbColor="rgba(255,255,255,0.5)">
          <Content>
            <DiyMarkdown>{text}</DiyMarkdown>
          </Content>
        </CustomScrollbars>
      </Container>
    );
  }
}

export default withTracker(props => {
  const textKey = Session.equals('showImprint', true) ? "imprintText" : "aboutText"
  return {
    textKey,
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
  // padding-top: calc( ${ dist.small} - ${dist.lineTopDiff} );
  // padding-bottom: calc( ${ dist.small} - ${dist.lineBottomDiff} );
`

const Content = styled.div`
  // padding-top: calc(${dist.named.columnPadding} - ${dist.lineTopDiff});
  padding-bottom: calc(4em - ${dist.lineBottomDiff}); // not sure why 4em, sorry
`;