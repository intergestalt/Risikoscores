import React, { Component } from 'react';
import styled from 'styled-components';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';

import { getFragment } from '../../helper/fragment';
import { toggleLanguage, getLanguage } from '../../helper/actions';
import { dist } from '../../config/styles';

class StartGeneralMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  callbackLanguage(e) {
    e.preventDefault();
    toggleLanguage();
    const lang = getLanguage();
    const path = '/?language=' + lang;
    this.props.history.push(path);
  }
  callbackAbout(e) {
    e.preventDefault();
    const showAbout = Session.equals('showAbout', true)
    Session.set('showAbout', !showAbout)
  }

  render() {
    var language = getFragment('languageLink', this.props.lang);
    var about = getFragment('aboutLink', this.props.lang);
    return (
      <Container className="StartRoomMenuArea">
        <a
          href="#"
          onClick={e => {
            this.callbackLanguage(e);
          }}
        >
          {language}
        </a>
        <a
          href="#"
          onClick={e => {
            this.callbackAbout(e);
          }}
        >
          {about}
        </a>
      </Container>
    );
  }
}

export default withTracker(props => {
  return {
    lang: getLanguage()
  };
})(withRouter(StartGeneralMenu));

const Container = styled.nav`
  & > *:not(:first-child) {
    margin-left: 1em;
  }
`;
