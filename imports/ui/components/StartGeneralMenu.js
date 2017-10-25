import React, { Component } from 'react';
import styled from 'styled-components';

import { getFragment } from '../../helper/fragment';
import { toggleLanguage } from '../../helper/actions';
import { dist } from '../../config/styles';

class StartGeneralMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  callbackLanguage(e) {
    e.preventDefault();
    toggleLanguage();
  }
  callbackAbout(e) {
    e.preventDefault();
    console.log('ABOUT');
  }

  render() {
    var language = getFragment('languageLink');
    var about = getFragment('aboutLink');

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

export default StartGeneralMenu;

const Container = styled.nav`
  & > *:not(:first-child) {
    margin-left: 1em;
  }
`;